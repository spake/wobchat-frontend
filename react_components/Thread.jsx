var React = require('react'),
    mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    RaisedButton = mui.RaisedButton,
    AppBar       = mui.AppBar,
    Avatar       = mui.Avatar,
    Paper        = mui.Paper,
    Message      = require('./Message.jsx'),
    ChatBox      = require('./ChatBox.jsx'),
    Config       = require('./Config.jsx'),
    PurpleTheme  = require('./PurpleTheme.jsx');

ThemeManager.setPalette(PurpleTheme);
module.exports = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    getChildContext: function() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },
    getInitialState: function() {
        return {
            messages: []
        };
    },
    getDefaultProps: function() {
        return {
            user: {
                id: 1,
                name: "John Wiseheart",
                picture: "http://www.gravatar.com/avatar/c526aa6b7282b04f21dc45663c816129"
            }
        }
    },
    pullMessages: function() {
        var self = this;
        $.ajax({
            method: 'GET',
            beforeSend: function (request) {
                request.setRequestHeader("X-Session-Token", localStorage.token);
            },
            url: Config.apiBaseUrl + '/friends/' + self.props.user.id + '/messages',
        }).done(function(result) {
            if (!result.error) {
                var messages = result.messages;
                messages.forEach(function(entry) {
                    if (entry.senderId != self.props.user.id) {
                        entry.direction = "from";
                        entry.user = JSON.parse(localStorage.user);
                    } else {
                        entry.direction = "to";
                        entry.user = self.props.user;
                    }
                });
                self.setState({messages: messages})
            }
        }).fail(function (jqXHR, textStatus) {
            console.log(jqXHR);
            console.log(textStatus);
        });
    },
    componentDidMount: function() {
        var self = this;
        setInterval(this.pullMessages, 1000);
    },
    componentWillUpdate: function() {
        var node = React.findDOMNode(this.refs.thread);
        this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
    },
    componentDidUpdate: function() {
        if (this.shouldScrollBottom) {
            var node = React.findDOMNode(this.refs.thread);
            node.scrollTop = node.scrollHeight
        }
    },
    addMessage: function(message, id) {
        var newMessages = this.state.messages
        newMessages.push({
            id: id,
            content: message,
            direction: "from",
            user: JSON.parse(localStorage.user)
        })
        // This creates a warning, and I can't figure out why
        this.setState({messages: newMessages})
    },
    sendMessage: function(message) {
        var self = this;
        $.ajax({
            method: 'POST',
            beforeSend: function (request) {
                request.setRequestHeader("X-Session-Token", localStorage.token);
                request.setRequestHeader("Content-Type", 'application/json');
            },
            url: Config.apiBaseUrl + '/friends/' + self.props.user.id + '/messages',
            data: JSON.stringify({content: message, contentType: 1})
        }).done(function(result) {
            if (result.success) {
                self.addMessage(message, result.id)
            }
        }).fail(function (jqXHR, textStatus) {
            console.log(jqXHR);
            console.log(textStatus);
        });
    },
    render: function() {
        var self = this;

        let listStyles = {
            padding: '0',
            listStyleType: 'none',
            margin: 0,
            flex: 1,
            alignItems: 'stretch',
            overflow: 'auto'
        }

        let contentStyles = {
            flex:1,
            flexFlow: 'column',
            display: 'flex',
        }
        var messages = this.state.messages.map(function(message) {
            return <Message key={message.id} message={message} />
        });

        return (
            <Paper style={contentStyles}>
                <ul ref="thread" style={listStyles}>
                    {messages}
                </ul>
                <ChatBox sendMessage={this.sendMessage} />
            </Paper>
        );
    }
});
