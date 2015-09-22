var React = require('react'),
    mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    RaisedButton = mui.RaisedButton,
    AppBar       = mui.AppBar,
    Paper        = mui.Paper,
    TextField    = mui.TextField,
    FriendsList  = require('./FriendsList.jsx'),
    Thread       = require('./Thread.jsx'),
    googleApiLoader = require('./GAPI.jsx'),
    PurpleTheme  = require('./PurpleTheme.jsx'),
    navigate = require('react-mini-router').navigate;

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
    openChat: function(element, event) {
        console.log("We should probably open a chat here to " + element.props.user.name)
    },
    sendMessage: function(event) {
        var message = event.target.value
        this.refs.sendMessageBox.clearValue()
        this.props.sendMessage(message)
    },
    render: function() {
         var style = {
            padding: '0 15px 0 15px',
            margin: 0
        };

        return (
          <Paper style={style}>
            <TextField ref='sendMessageBox' fullWidth onEnterKeyDown={this.sendMessage}/>
          </Paper>
        )
    }
});
