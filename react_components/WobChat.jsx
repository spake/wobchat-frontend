var React = require('react'),
    mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    RaisedButton = mui.RaisedButton,
    AppBar       = mui.AppBar,
<<<<<<< HEAD
    FriendsList  = require('./FriendsList.jsx'),

=======
    SignIn       = require('./SignIn.jsx'),
>>>>>>> Added simple sign in UI
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
        };
    },
    componentDidMount: function() {
        var self = this;
    },
    openChat: function(element, event) {
        console.log("We should probably open a chat here to " + element.props.user.name)
    },
    render: function() {
        return (
            /*<div>
            <AppBar
                title="WobChat"
                showMenuIconButton={false}
                iconClassNameRight="muidocs-icon-navigation-expand-more"
                style={{zIndex: 20}}/>*/
            <SignIn />
            <FriendsList openChat={this.openChat}/>
            </div>
            //</div>
        );
    }
});
