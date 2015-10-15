import React from 'react';
import mui from 'material-ui';
import FriendActions from '../actions/FriendActions';
import FriendStore from '../stores/FriendStore';
import MessageStore from '../stores/MessageStore';
import Config from '../libs/Config.js';
import TimeAgo from 'react-timeago';
let {ListDivider, Avatar} = mui;
let Colors = mui.Styles.Colors;

class Message extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        let user = null;
        const self = this;
        if(this.props.message.shouldPlayWib) {
            if (this.props.message.direction=="from") {
                user = this.props.message.recipientId;
            } else {
                user = this.props.message.senderId;
            }
            if ("video" in this.refs) {
                let node = React.findDOMNode(this.refs.video);
                node.onended = function() {
                    MessageStore.turnOffWibs(user, self.props.message.id);
                    this.pause();
                    this.src =""; // empty source
                    this.load();
                }
            } else {
                setTimeout(function() {
                    MessageStore.turnOffWibs(user, self.props.message.id);
                }, 1550); // 50ms longer than a wobble. Turning the wobble off any earlier changes the state, causing it to cease.
            }
        }
    }
    render() {
        var wrapperStyle = {
            display: "flex",
            padding: "10px",
            backgroundColor: this.props.message.direction=="from" ? Colors.purple50 : null,
        }

        var avatarStyle = {
            flex: 'initial'
        }
        var textStyle = {
            paddingLeft: "10px",
            fontFamily: 'Roboto, sans-serif',
            display: 'flex',
            alignItems: 'center',
            wordBreak: 'break-all',
            flex: 1
        }
        let vidStyle={
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            zIndex: 20000,
            pointerEvents: 'none'
        }
        
        let timeStyle={
            fontSize: '0.7em',
            color: '#aaa'
        } 

        let friend = FriendStore.get(this.props.message.senderId);
        if (friend == null) {
            friend = {};
        }
        let content = this.props.message.content;
        let media = null;
        if (this.props.message.contentType == 2 && Config.videos.indexOf(this.props.message.content) > -1) {
            // Set the visible message
            if (this.props.message.direction=="from") {
                content = "You sent a video: " + this.props.message.content;
            } else {
                content = "You received a video: " + this.props.message.content;
            }
            if(this.props.message.shouldPlayWib) {
                // Set the video
                media = (
                    <video style={vidStyle} ref="video" autoPlay ended="alert('ended')">
                        <source src={"resources/" + this.props.message.content + ".webm"} type="video/webm" />
                    </video>);
            }
        } else if (this.props.message.contentType == 3) {
            // Set the visible message
            if (this.props.message.direction=="from") {
                content = "You sent a wobble.";
            } else {
                content = "You were wobbled!";
            }
            if(this.props.message.shouldPlayWib) {
                $('body').trigger('startRumble');
                setTimeout(function(){$('body').trigger('stopRumble')}, 1500)
            }
        }
        return (
            <li>
                <div style={wrapperStyle} >
                    <Avatar style={avatarStyle} src={friend.picture} />
                    <div style={textStyle}>
                        {content}
                        {media}
                    </div>
                    <TimeAgo style={timeStyle} date={this.props.message.timestamp} />
                </div>
                <ListDivider />
            </li>
        );
    }
}

Message.defaultProps = {
    message: {
        content: "Test Message",
        direction: "from",
        senderId: 1,
        timestamp: '1 Jan 1970'
    }
}

module.exports = Message;
