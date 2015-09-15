var React = require('react'),
    mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    RaisedButton = mui.RaisedButton,
    AppBar       = mui.AppBar,
    FriendsList  = require('./FriendsList.jsx'),
    PurpleTheme  = require('./PurpleTheme.jsx');
var googleApiLoader = require('./GAPI.jsx');
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
                if (user.getBasicProfile()) {
                    var profile = user.getBasicProfile();
                    var profileProxy = {};
                    profileProxy.id = profile.getId();
                    profileProxy.name = profile.getName();
                    profileProxy.thumb = profile.getImageUrl();
                    profileProxy.email = profile.getEmail();
                    _this.setState({loggedInUser: profileProxy});
                }
                _this.setState({isLoggedIn: user.getBasicProfile() ? true : false});
            });
        });

        googleApiLoader.clientsLoaded(function () {
            _this.setState({clientsLoaded: true});
        });
    },
    toggleSignIn: function () {
        if (!googleApiLoader.getAuth2().isSignedIn.get()) {
            googleApiLoader.signIn();
        } else {
            googleApiLoader.signOut();
        }
    },
    openChat: function(element, event) {
        console.log("We should probably open a chat here to " + element.props.user.name)
    },
    render: function() {
        var loggedInUserThumb = null;

        if (this.state.loggedInUser)
            loggedInUserThumb = <img src={this.state.loggedInUser.thumb} />

        var toggleLoginButton = <button onClick={this.toggleSignIn}>Login to Google</button>

        if (this.state.finishedLoading) {

            if (this.state.isLoggedIn) {

                return <div>
                {loggedInUserThumb}
                {this.state.loggedInUser.name}
                {toggleLoginButton}
                    <hr />
                    You're now free to use the Google APIs!
                </div>
            }
            else
                return toggleLoginButton;
        }
        else {
            return <div>Loading...</div>
        }
    }
});
