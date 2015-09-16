var React = require('react'),
    mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    RaisedButton = mui.RaisedButton,
    AppBar       = mui.AppBar,
    Avatar       = mui.Avatar,
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
    render: function() {
        var self = this;
        var style = {
            padding: '0',
            listStyleType: "none",
            margin: 0
        }


        var messages = this.state.messages.map(function(message) {
            return <Message key={message.id} user={self.props.user} message={message} />
        });

        return (
            <ul style={style}>
                {messages}
            </ul>
        );
    }
});
