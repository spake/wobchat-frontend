import AltContainer from 'alt/AltContainer';
import React from 'react';
import Friends from './Friends.jsx';
import FriendActions from '../actions/FriendActions';
import FriendStore from '../stores/FriendStore';
import FriendsListAddBox from './FriendsListAddBox.jsx';
import Messages from './Messages.jsx';
import MessageActions from '../actions/MessageActions';
import MessageStore from '../stores/MessageStore';
import ChatBox from './ChatBox.jsx';
import mui from 'material-ui';
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
            currentChatUser: -1
        };

        this.openFriend = this.openFriend.bind(this);
    }
    render() {
        let sidebarStyles = {
          flex: 'initial',
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

        let self = this;
        return (
            <div style={mainStyles}>
                <div style={sidebarStyles}>
                    <FriendsListAddBox />
                    <AltContainer
                        stores={[FriendStore]}
                        inject={ {
                            items: () => FriendStore.getState().friends
                        } }>
                        <Friends onClick={this.openFriend} />
                    </AltContainer>
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
}

ChatPage.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = ChatPage;
