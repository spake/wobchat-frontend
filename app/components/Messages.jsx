import React from 'react';
import Message from './Message.jsx';
import MessageActions from '../actions/MessageActions'
import MessageStore from '../stores/MessageStore'
import {List, Paper} from 'material-ui';

class Messages extends React.Component {
    constructor(props) {
        super(props);
        this.renderMessage = this.renderMessage.bind(this);
    }
    componentWillUpdate() {
        let node = React.findDOMNode(this.refs.thread);
        this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
        this.shouldPreserveScroll = node.scrollTop == 0
        this.oldHeight = node.scrollHeight
    }
    componentDidUpdate() {
        let node = React.findDOMNode(this.refs.thread);

        if (this.shouldScrollBottom) {
            node.scrollTop = node.scrollHeight
        }
        if (this.shouldPreserveScroll) {
            node.scrollTop = node.scrollHeight - this.oldHeight
        }

        let self = this

        node.onscroll = function() {
            if (node.scrollTop == 0) {
                MessageActions.load(self.props.userId, function() {})
            }
        }
    }
    render() {
        const messages = this.props.items;
        if (typeof messages === 'undefined') {
            return null;
        }
        let listStyles = {
            padding: '0',
            listStyleType: 'none',
            margin: 0,
            flex: 1,
            alignItems: 'stretch',
            overflow: 'auto'
        }

        let contentStyles = {
            flex:1,
            flexFlow: 'column',
            display: 'flex',
            overflow: 'auto'
        }

        return (
            <Paper style={contentStyles}>
                <ul ref="thread" style={listStyles}>
                    {messages.map(this.renderMessage)}
                </ul>
            </Paper>
        );
    }
    renderMessage(message) {
        return (
            <Message
                key={message.id}
                message={message}
            />
        )
    }
}

Messages.defaultProps = {
    items: [
        {
            content: "Message",
            senderId: 1,
            id: 1,
            timestamp: '1 Jan 1970'
        }
    ]
}

module.exports = Messages;
