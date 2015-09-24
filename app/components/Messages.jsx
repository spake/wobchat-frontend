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
    }
    componentDidUpdate() {
        if (this.shouldScrollBottom) {
            let node = React.findDOMNode(this.refs.thread);
            node.scrollTop = node.scrollHeight
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
            id: 1
        }
    ]
}

module.exports = Messages;
