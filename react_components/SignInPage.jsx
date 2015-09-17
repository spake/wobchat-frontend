var React = require('react'),
    SignInOut = require('./SignInOut.jsx'),
    Logo = require('./Logo.jsx'),
    CenterOnPage = require('./CenterOnPage.jsx');

module.exports = React.createClass({
    render: function() {
        return (
                <CenterOnPage>
                    <Logo />
                    <CenterOnPage>
                        <SignInOut />
                    </CenterOnPage>
                </CenterOnPage>
        );
    }
})
