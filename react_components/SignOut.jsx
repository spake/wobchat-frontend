var React = require('react'),
    mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    RaisedButton = mui.RaisedButton;


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
            enabled: false
        };
    },
    componentDidMount: function() { 
        window.addEventListener('gapi-loaded', this.enableSignOutButton);
    },
    enableSignOutButton: function() {
        this.setState({enabled: true})
    },
    signOut: function(auth2) {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    },
    onFailure: function(error) {
        console.log(error);
    },
    render: function() {
        
        var auth2;
        if (this.state.enabled) {
            gapi.load('auth2', function() {
                gapi.auth2.init();
            });
            auth2 = gapi.auth2.getAuthInstance();
            if (auth2.GoogleAuth.isSignedIn.get()) {
                return (
                    <RaisedButton label="Sign Out" onClick={this.signOut} />
                ); 
            } else {
                console.log('User is not signed in / logged out');
                return <div id='Ihateapples'></div>
            }
        } else {
            return <div>Not signed in</div>;
        }
    }
});
