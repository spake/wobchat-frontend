var React = require('react'),
    mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    RaisedButton = mui.RaisedButton,
    TextField = mui.TextField,
    PurpleTheme = require('./PurpleTheme.jsx');

ThemeManager.setPalette(PurpleTheme)
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
        return (
            <div>
                <RaisedButton label="Sign In"/>
                <TextField floatingLabelText="Username"/>
                <TextField floatingLabelText="Password" type="password"/>
            </div>
        );
    }
});
