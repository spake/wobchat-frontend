var React = require('react'),
    Logo = require('./Logo.jsx'),
    CenterOnPage = require('./CenterOnPage.jsx');

module.exports = React.createClass({
    render: function() {
        return (
                <CenterOnPage>
                    <Logo />
                </CenterOnPage>
        );
    }
})
