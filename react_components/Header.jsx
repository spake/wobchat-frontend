var React = require('react'),
    mui = require('material-ui'),
    AppBar = mui.AppBar,
    SignInOut = require('./SignInOut.jsx'),
    ThemeManager = new mui.Styles.ThemeManager(),
    PurpleTheme  = require('./PurpleTheme.jsx');

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
    render: function() {
        var appBarStyle = {
            position: "fixed",
            top: 0,
            zIndex: 20
        }

        var threadStyle = {
            paddingTop: "20px"
        }
        var signStyle = {
            paddingTop: "6px",
            paddingRight: "4px"
        }
        return (
            <AppBar
                    title="WobChat"
                    showMenuIconButton={false}
                    style={{zIndex: 20}}
                    iconElementRight={<div style={signStyle}><SignInOut/></div>}/>
        );
    }
})
