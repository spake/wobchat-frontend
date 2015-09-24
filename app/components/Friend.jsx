import React from 'react';
import {ListItem, Avatar} from 'material-ui';

class Friend extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let user = this.props.user;
    return (
        <ListItem
            key={user.uid}
            leftAvatar={<Avatar src={user.picture} />}
            primaryText={user.name}
            onClick={this.props.onClick}/>
    );
  }
}

Friend.defaultProps = {
    user: {
        name: "John Wiseheart",
        id: 1,
        picture: ''
    },
    onClick: function() {}
}

module.exports = Friend;
