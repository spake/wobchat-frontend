var React = require('react');

module.exports = React.createClass({
    componentDidMount: function() { 
        window.addEventListener('gapi-loaded', this.renderGoogleLoginButton);
    },
    renderGoogleLoginButton: function() {
        console.log('rendering g button');
        gapi.signin2.render('g-signin2', {
            'scope': 'https://www.googleapis.com/auth/plus.login',
            'width': 200,
            'height': 50,
            'onsuccess': this.onSignIn,
            'onfailure': this.onFailure
        });
    },
    onSignIn: function(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log("Hi");
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
    },
    onFailure: function(error) {
        console.log(error);
    },
    render: function() {
        return (
            <div id="g-signin2"></div>
        );
    }
});
