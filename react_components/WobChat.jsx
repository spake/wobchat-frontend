var React = require('react'),
    mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    RaisedButton = mui.RaisedButton,
    AppBar       = mui.AppBar,
    FriendsList  = require('./FriendsList.jsx'),
    PurpleTheme  = require('./PurpleTheme.jsx'),
    SignInOut       = require('./SignInOut.jsx'),
    CircularProgress = mui.CircularProgress,
    googleApiLoader = require('./GAPI.jsx');

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
        var _this = this;

        googleApiLoader.authLoaded(function () {
            _this.setState({authLoaded: true});

            googleApiLoader.getAuth2().currentUser.listen(function (user) {
                _this.setState({finishedLoading: true});
            });
        });
    },
    openChat: function(element, event) {
        console.log("We should probably open a chat here to " + element.props.user.name)
    },
    render: function() {
        if (this.state.finishedLoading) {
            return (
                <div>
                    <AppBar
                        title="WobChat"
                        showMenuIconButton={false}
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                        style={{zIndex: 20}}/>
                    <SignInOut />
                    <FriendsList openChat={this.openChat}/>
                </div>
            );
        } else {
            return <CircularProgress mode="indeterminate" size={2} />
        }
    }
});
