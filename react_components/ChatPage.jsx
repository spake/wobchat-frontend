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
        //TODO: Remove console logs.
        console.log("Should send message.\n Contents: " + message)
        this.refs.sendMessageBox.clearValue()

        this.refs.currentThread.addMessage(message, "from")
    },
    componentDidMount: function() {
        googleApiLoader.authLoaded(function () {
            if (!googleApiLoader.getAuth2().isSignedIn.get()) {
                navigate('/');
            }
        });
    },
    render: function() {

        let sidebarStyles = {
          flex: 'initial',
          width: '300px',
          minWidth: '100px'
        }

        let mainStyles = {
          display: 'flex',
          flex: 1,
          height: '100%'
        }

        let flexRowStyles = {
          flex: 1,
          overflow: 'auto'
        }

        let contentStyles = {
          flex:1,
          flexDirection: 'column',
          display: 'flex'
        }

        return (
        <div style={mainStyles}>
            <div style={sidebarStyles}>
                <FriendsList  openChat={this.openChat}/>
            </div>
            <div style={contentStyles}>
              <Paper style={flexRowStyles}>
                <Thread ref='currentThread'/>
              </Paper>
              <Paper>
                <TextField ref='sendMessageBox' fullWidth={true} onEnterKeyDown={this.sendMessage}/>
              </Paper>
            </div>
        </div>)
    }
});
