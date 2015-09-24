import React from 'react';
import Friend from './Friend.jsx';
import {List, Paper} from 'material-ui';

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.renderFriend = this.renderFriend.bind(this);
  }
  render() {
    const friends = this.props.items;

    return (
      <List subheader="Friends">
        <Paper zDepth={0} >
            {friends.map(this.renderFriend)}
        </Paper>
      </List>
    );
  }
  renderFriend(friend) {
    return (
        <Friend
          key={friend.id}
          user={friend}
          onClick={this.props.onClick.bind(null, friend.id)}
        />
    );
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