var React = require('react'),
    SignInOut = require('./SignInOut.jsx'),
    CenterOnPage = require('./CenterOnPage.jsx');

module.exports = React.createClass({
    render: function() {
        return (
                <CenterOnPage>
                <SignInOut />
                </CenterOnPage>
        );
    }
})
