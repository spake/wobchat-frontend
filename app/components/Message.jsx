import React from 'react';
import mui from 'material-ui';
import FriendActions from '../actions/FriendActions';
import FriendStore from '../stores/FriendStore';
import Config from './Config.jsx';
let {ListDivider, Avatar} = mui;
let Colors = mui.Styles.Colors;

class Message extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            videoPlayed: false
        }
    }
    onEnded(e) {
        console.log("ENDED");
    }
    componentDidMount() {
        if ("video" in this.refs) {
            let node = React.findDOMNode(this.refs.video);
            node.onended = function() {
                this.remove();
            }
        }
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
        let vidStyle={
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            zIndex: 20000,
            pointerEvents: 'none'
        }
        let friend = FriendStore.get(this.props.message.senderId);
        let content = this.props.message.content;
        let media = null;
        if (this.props.message.contentType == 2 && Config.videos.indexOf(this.props.message.content) > -1) {
            // Set the visible message
            if (this.props.message.direction=="from") {
                content = "You sent a video: " + this.props.message.content;
            } else {
                content = "You received a video: " + this.props.message.content;
                console.log(Date.now() - Date.parse(this.props.message.timestamp))
                if(Date.now() - Date.parse(this.props.message.timestamp)  <= 38000) {
                    // Set the video
                    media = (
                        <video style={vidStyle} ref="video" autoPlay ended="alert('ended')">
                            <source src={"resources/" + this.props.message.content + ".webm"} type="video/webm" />
                        </video>);
                }
            }
        } else if (this.props.message.contentType == 3) {
            // Set the visible message
            if (this.props.message.direction=="from") {
                content = "You sent a wobble.";
            } else {
                content = "You were wobbled!";
                console.log(Date.now() - Date.parse(this.props.message.timestamp))
                if(Date.now() - Date.parse(this.props.message.timestamp)  <= 38000) {
                    $('body').trigger('startRumble');
                    setTimeout(function(){$('body').trigger('stopRumble')}, 1500)
                }
            }
        }
        return (
            <li>
                <div style={wrapperStyle} >
                    <Avatar src={friend.picture} />
                    <div style={textStyle}>
                        {content}
                        {media}
                    </div>
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
        senderId: 1
    }
}

module.exports = Message;
