var React = require('react'),
    SignIn = require('./SignIn.jsx'),
    CenterOnPage = require('./CenterOnPage.jsx');

module.exports = React.createClass({
    render: function() {
        return (
                <CenterOnPage>
                <SignIn />
                </CenterOnPage>
        );
    }
})
