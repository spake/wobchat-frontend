import React from 'react';
import {ListItem, Avatar} from 'material-ui';
import {IconMenu, MenuItem, IconButton} from 'material-ui';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';


class Friend extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let user = this.props.user;
    let iconButton = 
        <IconButton>
            <MoreVertIcon />
        </IconButton>
    let rightIconButton = 
        <IconMenu iconButtonElement={iconButton}>
            <MenuItem index={0} primaryText="Remove Friend" />
            <MenuItem index={1} primaryText="Potato" />
        </IconMenu>

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
