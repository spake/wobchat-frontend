import React from 'react';
import mui from 'material-ui';
import FriendActions from '../actions/FriendActions';
import FriendStore from '../stores/FriendStore';
let {ListDivider, Avatar} = mui;
let Colors = mui.Styles.Colors;

export default class Message extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var wrapperStyle = {
            display: "flex",
            padding: "10px",
            backgroundColor: this.props.message.direction=="from" ? Colors.purple50 : null,
        }

        var textStyle = {
            paddingLeft: "10px",
            fontFamily: 'Roboto, sans-serif',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        }
        let friend = FriendStore.get(this.props.message.senderId);
        return (
            <li>
                <div style={wrapperStyle} >
                    <Avatar src={friend.picture} />
                    <div style={textStyle}>
                        {this.props.message.content}
                    </div>
                </div>
                <ListDivider />
            </li>
        );
    }
}
