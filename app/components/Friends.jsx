import React from 'react';
import User from './User.jsx';
import Config from '../libs/Config';
import FriendStore from '../stores/FriendStore';
import FriendActions from '../actions/FriendActions';
import DeleteFriendModal from './DeleteFriendModal.jsx';
import {List, Paper} from 'material-ui';

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        friendRequests: []
    };
    this.renderFriend = this.renderFriend.bind(this);
    this.renderRequest = this.renderRequest.bind(this);
    this.getFriendRequests = this.getFriendRequests.bind(this);
    this.showModal = this.showModal.bind(this);
  }
  render() {
    const friends = this.props.items;
    return (
      <div>
          <DeleteFriendModal ref="modal" />
          {this.state.friendRequests.length > 0 ?
            <List subheader="Pending Friend Requests">
              <Paper zDepth={0} >
                {this.state.friendRequests.map(this.renderRequest)}  
              </Paper>
            </List>
          : null
          }
          <List subheader="Friends">
            <Paper zDepth={0} >
                {friends.map(this.renderFriend)}
            </Paper>
          </List>
      </div>
    );
  }

  renderRequest(user) {
    let actions = [
        {
            name: 'Accept',
            doAction: FriendActions.acceptRequest.bind(null, user.id)
            
        },
        {
            name: 'Decline',
            doAction: FriendActions.declineRequest.bind(null, user.id)
        }
    ]
    return (
        <User
            key={user.id}
            user={user}
            actions={actions}
        />
    );
  }

  renderFriend(friend) {
    let actions = [
        {
            name: 'Remove',
            doAction: this.refs.modal.show.bind(null, friend)
        }
    ]
    return (
        <div>
            <User
              key={friend.id}
              user={friend}
              onClick={this.props.onClick.bind(null, friend.id)}
              actions={actions}
            />
        </div>
    );
  }

  showModal(user) {
    this.refs.modal.show()
  }

  componentDidMount() {
    this.getFriendRequests();
  }

  getFriendRequests() {
    $.ajax({
      method: 'GET',
      beforeSend: function (request) {
        request.setRequestHeader("X-Session-Token", FriendStore.getState().me.token);
      },
      url: Config.apiBaseUrl + '/friendrequests'
    }).done(function(result) {
      if (result.success) {
        self.setState({friendRequests: result.requestors});
      }
    });
  }

}


Friends.defaultProps = {
    items: [
        {
            name: "John Wiseheart",
            id: 1,
            picture: ''
        }
    ],
    onClick: function() {}
 };

module.exports = Friends;
