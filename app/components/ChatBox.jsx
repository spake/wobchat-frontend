import React from 'react';
import MessageActions from '../actions/MessageActions';
import MessageStore from '../stores/MessageStore';
import FriendStore from '../stores/FriendStore';
import PurpleTheme from './PurpleTheme.jsx';
import mui from 'material-ui';
let {Paper, TextField, FlatButton} = mui;
let ThemeManager = new mui.Styles.ThemeManager();
let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();

ThemeManager.setPalette(PurpleTheme);

class ChatBox extends React.Component {
    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    }
    constructor(props) {
        super(props);

        this.sendMessage = this.sendMessage.bind(this);
    }
    sendMessage(event) {
        var content = event.target.value
        if (content == "") {
            return;
        }
        this.refs.sendMessageBox.clearValue()
        let message = {
            senderId: FriendStore.getState().me.id,
            content: content,
            contentType: 1,
            recipientId: this.props.userId
        }
        MessageActions.send(message);
    }
    sendVideo(video, event) {
      let message = {
        senderId: FriendStore.getState().me.id,
        content: video,
        contentType: 2,
        direction: "from",
        recipientId: this.props.userId
      }
      MessageActions.send(message);
      console.log("Sent: " + video)
    }
    sendShake() {
    let message = {
        senderId: FriendStore.getState().me.id,
        content: "",
        contentType: 3,
        direction: "from",
        recipientId: this.props.userId
      }
      MessageActions.send(message);
      console.log("Sent shake")

    }
    render() {
         var style = {
            padding: '0 15px 0 15px',
            margin: 0
        };

        return (
          <Paper style={style}>
            <FlatButton label="Skeletal" onClick={this.sendVideo.bind(this, "skeletal")}/>
            <FlatButton label="Wow" onClick={this.sendVideo.bind(this, "wow")} />
            <FlatButton label="Shia" onClick={this.sendVideo.bind(this, "shia")}/>
            <FlatButton label="That's It" onClick={this.sendVideo.bind(this, "thatsit")}/>
            <FlatButton label="QuickScope" onClick={this.sendVideo.bind(this, "quickscope")}/>
            <FlatButton label="Shake" onClick={this.sendShake.bind(this)}/>
            <TextField ref='sendMessageBox' fullWidth onEnterKeyDown={this.sendMessage}/>
          </Paper>
        )
    }

}

ChatBox.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = ChatBox;
