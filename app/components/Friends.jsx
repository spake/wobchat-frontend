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
    this.renderRequest = this.renderRequest.bind(this);
    this.renderFriend = this.renderFriend.bind(this);
    this.showModal = this.showModal.bind(this);
  }
  render() {
    const friends = this.props.items;
    const requests = this.props.requests;
    return (
      <div>
          <DeleteFriendModal ref="modal" />
          {requests != null && requests.length > 0 ?
            <List subheader="Pending Friend Requests">
              <Paper zDepth={0} >
                {requests.map(this.renderRequest)}
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
            doAction: this.showModal.bind(null, friend)
        }
    ]
    let isCurrUser = false;
    if (typeof this.props.currentChatUser !== undefined) {
      isCurrUser = (this.props.currentChatUser == friend.id)
    }
    return (
            <User
              key={friend.id}
              user={friend}
              onClick={this.props.onClick.bind(null, friend.id)}
              actions={actions}
              isCurrUser={isCurrUser}
            />
    );
  }

  showModal(user) {
    this.refs.modal.show(user)
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
