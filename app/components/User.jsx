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
        for (let i = 0; i < this.props.actions.length; i++) {
            if (item.props.children == this.props.actions[i].name) {
                this.props.actions[i].doAction();
                break;
            }
        }
    }

    render() {
        let user = this.props.user;
        // Make IconMenu for adding friends, and perhaps other features
        let iconButton = 
            <IconButton>
                <MoreVertIcon />
            </IconButton>;
        let buttonActions = []
        for (let i = 0; i < this.props.actions.length; i++) {
            buttonActions.push(<MenuItem key={i} index={i}>{this.props.actions[i].name}</MenuItem>)
        }
        let rightIconButton = 
            <IconMenu iconButtonElement={iconButton} onItemTouchTap={this.handleMenuItemClicked}>
               {buttonActions.map(function(action) {
                        return action
                    })
               }
            </IconMenu>;
        if (user.picture == '') {
            user.picture = 'resources/profile.png'
        }

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

User.defaultProps = {
    user: {
        name: "John Wiseheart",
        id: 1,
        picture: ''
    },
    onClick: function() {},
    actions: [
        {
            name: '',
            doAction: function () {}
        }
    ]
}

module.exports = User;
