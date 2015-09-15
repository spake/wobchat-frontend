var React = require('react'),
    mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    RaisedButton = mui.RaisedButton,
    PurpleTheme = require('./PurpleTheme.jsx'),
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
        return {};
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
            if (googleApiLoader.getAuth2().isSignedIn.get()) {
                _this.setState({loggedStatusLabel: 'Sign Out'});
                console.log('still logged in');
            } else {
                _this.setState({loggedStatusLabel: 'Sign In'});
            }
        });

        
    },
    toggleLoggedStatus: function() {
        if (googleApiLoader.getAuth2().isSignedIn.get()) {
            googleApiLoader.signOut();
            this.setState({loggedStatusLabel: 'Sign In'});
            console.log('logged out');
        } else {
            googleApiLoader.signIn();
            this.setState({loggedStatusLabel: 'Sign Out'});
            console.log('logged in');
        }
    },
    getLabelText: function() {      
        if (googleApiLoader.getAuth2().isSignedIn.get()) {
            return "Sign Out";
        } else {
            return "Sign In";
        }
    },
    onFailure: function(error) {
        console.log(error);
    },
    render: function() {
        return (
            <RaisedButton label={this.state.loggedStatusLabel} onClick={this.toggleLoggedStatus} />
        );
    }
});
