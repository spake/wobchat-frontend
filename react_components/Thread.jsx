var React = require('react'),
    mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    RaisedButton = mui.RaisedButton,
    AppBar       = mui.AppBar,
    Avatar       = mui.Avatar,
    Paper        = mui.Paper,
    Message      = require('./Message.jsx'),
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
            messages: [
                {
                    id: 1,
                    message: "Hello, this is a text message",
                    direction: "to"
                },
                {
                    id: 2,
                    message: "Nice message!",
                    direction: "from"
                },
                {
                    id: 3,
                    message: "Hello, this is a text message",
                    direction: "to"
                },
                {
                    id: 4,
                    message: "Nice message!",
                    direction: "from"
                },
                {
                    id: 5,
                    message: "Hello, this is a text message",
                    direction: "to"
                },
                {
                    id: 6,
                    message: "Nice message!",
                    direction: "from"
                },
            ]
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
    componentDidMount: function() {
        var self = this;
    },
    componentWillUpdate: function() {
        var node = this.getDOMNode();
        this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
    },
    componentDidUpdate: function() {
        if (this.shouldScrollBottom) {
            var node = this.getDOMNode();
            node.scrollTop = node.scrollHeight
        }
    },
    addMessage: function(message, direction) {
        //TODO: Remove console logs.
        console.log("Message: " + message + "\nDirection: " + direction)
        // Get current messages.
        var newMessages = this.state.messages
        // Add new message.
        newMessages.push({
            id: (newMessages.length + 1),
            message: message,
            direction: direction
        })
        // Set new state.
        this.setState({messages: newMessages})
    },
    render: function() {
        var self = this;
        let listStyles = {
            padding: '0',
            listStyleType: "none",
            margin: 0
        }

        let flexRowStyles = {
          flex: 1,
          overflow: 'auto'
        }

        var messages = this.state.messages.map(function(message) {
            return <Message key={message.id} user={self.props.user} message={message} />
        });

        return (
            <Paper style={flexRowStyles}>
                <ul style={listStyles}>
                    {messages}
                </ul>
            </Paper>
        );
    }
});
