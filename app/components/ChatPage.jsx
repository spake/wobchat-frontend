import AltContainer from 'alt/AltContainer';
import React from 'react';
import Friends from './Friends.jsx';
import FriendActions from '../actions/FriendActions';
import FriendStore from '../stores/FriendStore';
import Messages from './Messages.jsx';
import MessageActions from '../actions/MessageActions';
import MessageStore from '../stores/MessageStore';
import ChatBox from './ChatBox.jsx';
import UserSearch from './UserSearch.jsx';
import mui from 'material-ui';
let {TextField} = mui;
let ThemeManager = new mui.Styles.ThemeManager();


class ChatPage extends React.Component {
    getChildContext() { 
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    }
    constructor(props) {
        super(props);

        this.state = {
            currentChatUser: -1,
            search: ""
        };

        document.addEventListener('DOMContentLoaded', function () {
          if (Notification.permission !== "granted")
            Notification.requestPermission();
        });
        this.openFriend = this.openFriend.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }
    render() {
        let sidebarStyles = {
          flex: 'initial',
          overflow: 'auto',
          overflowX: 'hidden',
          width: '300px',
          minWidth: '100px'
        }

        let listStyles = {
            padding: '0',
            listStyleType: 'none',
            margin: 0,
            flex: 1,
            alignItems: 'stretch',
            overflow: 'auto'
        }

        let mainStyles = {
          display: 'flex',
          flex: 1,
          height: '100%'
        }

        let messagesStyles= {
          flex: 1,
          flexFlow: 'column',
          display: 'flex',
        }

        let addBoxStyle = {
          padding: '0 0 0 15px',
          margin: 0
        }

        let self = this;
        return (
            <div style={mainStyles}>
                <div style={sidebarStyles}>
                    <TextField hintText="Search users..." style={addBoxStyle} value={this.state.search}
                       onChange={this.handleTextChange}  />
                    {this.state.search.length > 0 ?
                    <UserSearch search={this.state.search} />
                    : 
                    <AltContainer
                        stores={[FriendStore]}
                        inject={ {
                            items: () => FriendStore.getState().friends,
                            requests: () => FriendStore.getState().friendRequests
                        } }>
                        <Friends onClick={this.openFriend} />
                    </AltContainer>
                    }
                </div>
                {self.state.currentChatUser != -1 ? <div style={messagesStyles}>    
                  <AltContainer
                    stores={[MessageStore]}
                    inject={ { 
                        items: () => MessageStore.getState().messages[self.state.currentChatUser]
                    } }>
                    <Messages userId={self.state.currentChatUser}/>
                  </AltContainer>
                  <ChatBox userId={self.state.currentChatUser} sendMessage={this.sendMessage} />
                </div> : null }
            </div>
        )
    }
    openFriend(id) {
        MessageActions.load(id)
        this.setState({currentChatUser: id});
    }

    handleTextChange(ev) {
        this.setState({search: ev.target.value});
    }

}

ChatPage.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = ChatPage;
