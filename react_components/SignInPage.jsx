var React = require('react'),
    Logo = require('./Logo.jsx'),
    SignIn = require('./SignIn.jsx'),
    CenterOnPage = require('./CenterOnPage.jsx');

module.exports = React.createClass({
    render: function() {
        return (
                <CenterOnPage>
                    <Logo />
                    <CenterOnPage>
                        <SignIn />
                    </CenterOnPage>
                </CenterOnPage>
        );
    }
})
