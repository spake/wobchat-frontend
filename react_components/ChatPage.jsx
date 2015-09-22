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
    ChatBox = require('./ChatBox.jsx'),
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
    getInitialState: function() {
        return {
            currentChatUser: null
        }
    },
    openChat: function(element, event) {
        this.setState({currentChatUser: element.props.user})
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

        return (
        <div style={mainStyles}>
            <div style={sidebarStyles}>
                <FriendsList  openChat={this.openChat}/>
            </div>
            {this.state.currentChatUser != null ? <Thread ref='currentThread' user={this.state.currentChatUser}/> : null}
        </div>)
    }
});
