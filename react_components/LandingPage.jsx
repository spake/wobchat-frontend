var React = require('react'),
    Logo = require('./Logo.jsx'),
    googleApiLoader = require('./GAPI.jsx'),
    CenterOnPage = require('./CenterOnPage.jsx'),
    navigate = require('react-mini-router').navigate;

module.exports = React.createClass({
    componentDidMount: function() {
        googleApiLoader.authLoaded(function () {
            if (googleApiLoader.getAuth2().isSignedIn.get()) {
                navigate('/chat');
            }
        });
    },
    render: function() {
        return (
                <CenterOnPage>
                    <Logo />
                </CenterOnPage>
        );
    }
})
