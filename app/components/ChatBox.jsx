import React from 'react';
import MessageActions from '../actions/MessageActions';
import MessageStore from '../stores/MessageStore';
import FriendStore from '../stores/FriendStore';
import mui from 'material-ui';
let {Paper, TextField} = mui;
let ThemeManager = new mui.Styles.ThemeManager();

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
        this.refs.sendMessageBox.clearValue()
        let message = {
            senderId: FriendStore.getState().me.id,
            content: content,
            recipientId: this.props.userId
        }
        MessageActions.send(message);
    }
    render() {
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

}

ChatBox.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = ChatBox;
