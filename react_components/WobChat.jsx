var React = require('react'),
    mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    RaisedButton = mui.RaisedButton,
    AppBar       = mui.AppBar,
    Thread       = require('./Thread.jsx'),
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
    getInitialState: function() {
        return {
        };
    },
    componentDidMount: function() {
        var self = this;
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
            <div>
            <AppBar
                style={appBarStyle}
                title="WobChat"
                showMenuIconButton={false}
                iconClassNameRight="muidocs-icon-navigation-expand-more" />
            <Thread style={threadStyle}/>
            </div>
        );
    }
});
