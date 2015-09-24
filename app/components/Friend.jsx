import React from 'react';
import {ListItem, Avatar} from 'material-ui';

export default class Friend extends React.Component {
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
