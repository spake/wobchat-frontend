import React from 'react';
import {ListItem, Avatar} from 'material-ui';
import {IconMenu, MenuItem, IconButton} from 'material-ui';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import FriendActions from '../actions/FriendActions';
import FriendStore from '../stores/FriendStore';
let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();


class User extends React.Component {
    constructor(props) {
        super(props);

        this.handleMenuItemClicked = this.handleMenuItemClicked.bind(this)
    }

    handleMenuItemClicked(ev, item) {
        // Handle all menu item clicks for IconMenu here
        // item.props.children == text in menu item
        if (item.props.children == "Send Friend Request") {
            FriendActions.requestFriend(this.props.user.id)
        }
    }

    render() {
        let user = this.props.user;

        // Make IconMenu for adding friends, and perhaps other features
        let iconButton = 
            <IconButton>
                <MoreVertIcon />
            </IconButton>;
        let rightIconButton = 
            <IconMenu iconButtonElement={iconButton} onItemTouchTap={this.handleMenuItemClicked}>
                <MenuItem index={0}>Add</MenuItem>
            </IconMenu>;

        return (
            <ListItem
                key={user.uid}
                leftAvatar={<Avatar src={user.picture} />}
                primaryText={user.name}
                rightIconButton={rightIconButton}
            />
    );
  }
}

User.defaultProps = {
    user: {
        name: "John Wiseheart",
        id: 1,
        picture: ''
    },
    onClick: function() {}
}

module.exports = User;
