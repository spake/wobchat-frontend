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

    let friendsStyles = {
        // Viewport height - Header height - TextField height - 'Friends' text height
        // - some magic number that makes the browser scroll not overflow
        height: 'calc(100vh - 64px - 48px - 48px - 8px)',
        overflow: 'auto',
        overflowX: 'hidden',
    }

    return (
      <List subheader="Friends">
        <Paper style={friendsStyles} zDepth={0} >
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
