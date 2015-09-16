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
            });
            // Duplicated code below to ensure correct label is shown
            // on page refresh as well as button click
            if (googleApiLoader.getAuth2().isSignedIn.get()) {
                _this.setState({loggedStatusLabel: 'Sign Out'});
            } else {
                _this.setState({loggedStatusLabel: 'Sign In'});
            }
        });

        
    },
    toggleLoggedStatus: function() {
        if (googleApiLoader.getAuth2().isSignedIn.get()) {
            googleApiLoader.signOut();
            this.setState({loggedStatusLabel: 'Sign In'});
        } else {
            googleApiLoader.signIn();
            this.setState({loggedStatusLabel: 'Sign Out'});
        }
    },
    getLabelText: function() {      
        if (googleApiLoader.getAuth2().isSignedIn.get()) {
            return "Sign Out";
        } else {
            return "Sign In";
        }
    },
    render: function() {
        return (
            <RaisedButton label={this.state.loggedStatusLabel} onClick={this.toggleLoggedStatus} />
        );
    }
});
