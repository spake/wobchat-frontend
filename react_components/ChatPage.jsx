var React = require('react'),
    mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    RaisedButton = mui.RaisedButton,
    AppBar       = mui.AppBar,
    Paper        = mui.Paper,
    FriendsList  = require('./FriendsList.jsx'),
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
    openChat: function(element, event) {
        console.log("We should probably open a chat here to " + element.props.user.name)
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
                <Thread/>
              </Paper>
              <Paper>
                Bottom
              </Paper>
            </div>
        </div>)
    }
});
