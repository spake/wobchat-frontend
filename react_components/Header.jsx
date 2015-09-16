var React = require('react'),
    mui = require('material-ui'),
    AppBar = mui.AppBar,
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
        return (
            <AppBar
                    title="WobChat"
                    showMenuIconButton={false}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    style={{zIndex: 20}}/>
        );
    }
})
