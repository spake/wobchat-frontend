var React = require('react'),
    mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    RaisedButton = mui.RaisedButton,
    PurpleTheme = require('./PurpleTheme.jsx'),
    googleApiLoader = require('./GAPI.jsx'),
    navigate = require('react-mini-router').navigate;

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
            loggedStatusLabel: "Loading..."
        };
    },
    componentDidMount: function() {
        var self = this;
        var _this = this;
        googleApiLoader.authLoaded(function () {
            _this.setState({authLoaded: true});

            googleApiLoader.getAuth2().currentUser.listen(function (user) {
                _this.setState({finishedLoading: true});
                if (googleApiLoader.getAuth2().isSignedIn.get()) {
                    _this.setState({loggedStatusLabel: 'Sign Out'});
                    localStorage.token = googleApiLoader.getAuth2().currentUser.get().getAuthResponse().id_token;
                    localStorage.user = JSON.stringify(googleApiLoader.getAuth2().currentUser.get().getBasicProfile())
                } else {
                    _this.setState({loggedStatusLabel: 'Sign In'});
                    localStorage.removeItem('token');
                }
            });

        });


    },
    toggleLoggedStatus: function() {
        if (googleApiLoader.getAuth2().isSignedIn.get()) {
            googleApiLoader.signOut();
            navigate('/');
        } else {
            googleApiLoader.signIn();
            googleApiLoader.getAuth2().isSignedIn.listen(function (bool) {
                if (bool) {
                    navigate('/chat');
                }
            });
        }

    },
    render: function() {
            return <RaisedButton label={this.state.loggedStatusLabel} onClick={this.toggleLoggedStatus} />
    }
});
