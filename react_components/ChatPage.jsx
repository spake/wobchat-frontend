var React = require('react'),
    mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    RaisedButton = mui.RaisedButton,
    AppBar       = mui.AppBar,
    FriendsList  = require('./FriendsList.jsx'),
    Thread       = require('./Thread.jsx'),
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
    openChat: function(element, event) {
        console.log("We should probably open a chat here to " + element.props.user.name)
    },
    render: function() {
        var threadStyle = {
            paddingTop: "20px"
        }
        return (
            <div>
                <FriendsList openChat={this.openChat}/>
                <Thread style={threadStyle}/>
            </div>
        );
    }
});
