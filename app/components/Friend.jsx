import React from 'react';
import {ListItem, Avatar} from 'material-ui';
import {IconMenu, MenuItem, IconButton} from 'material-ui';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import DeleteFriendModal from './DeleteFriendModal.jsx'
let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();


class Friend extends React.Component {
  constructor(props) {
    super(props);

    this.launchModal = this.launchModal.bind(this)
    this.deleteFriend = this.deleteFriend.bind(this)
    this.cancelDelete = this.cancelDelete.bind(this)
  }

  launchModal(ev, item) {
    console.log(ev);
    console.log(item);
    console.log("EY");
    this.refs.modal.show();
  }

  deleteFriend() {
    console.log('delete friend');
  }

  cancelDelete() {
    console.log('cancel delete friend'); 
  }

  render() {
    let user = this.props.user;

    // Make IconMenu for removing friends, and perhaps other features
    let iconButton = 
        <IconButton>
            <MoreVertIcon />
        </IconButton>;
    let rightIconButton = 
        <IconMenu iconButtonElement={iconButton}>
            <MenuItem index={0} onClick={this.launchModal}>Remove</MenuItem>
            <DeleteFriendModal ref='modal' user={user} deleteFriend={this.deleteFriend} cancelDelete={this.cancelDelete} />
        </IconMenu>;

    return (
        <ListItem
            key={user.uid}
            leftAvatar={<Avatar src={user.picture} />}
            primaryText={user.name}
            onClick={this.props.onClick}
            rightIconButton={rightIconButton}
        />
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
