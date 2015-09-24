import uuid from 'node-uuid';
import alt from '../libs/alt';
import Config from '../components/Config.jsx'
import MessageActions from '../actions/MessageActions';

class MessageStore {
    constructor() {
	this.bindActions(MessageActions);
	this.messages = {};
    }
    load(userId) {
        let self = this;
        $.ajax({
            method: 'GET',
            beforeSend: function (request) {
                request.setRequestHeader("X-Session-Token", localStorage.token);
            },
            url: Config.apiBaseUrl + '/friends/' + userId + '/messages',
        }).done(function(result) {
            if (result.success) {
                let messages = self.messages;
                messages[userId] = result.messages;
                self.setState({messages: messages})
            } else {
                console.log(result.error)
            }
        }).fail(function (jqXHR, textStatus) {
            console.log(jqXHR);
            console.log(textStatus);
        });
    }
    send(message) {
        var self = this;
        $.ajax({
            method: 'POST',
            beforeSend: function (request) {
                request.setRequestHeader("X-Session-Token", localStorage.token);
                request.setRequestHeader("Content-Type", 'application/json');
            },
            url: Config.apiBaseUrl + '/friends/' + message.recipientId + '/messages',
            data: JSON.stringify({content: message.content, contentType: 1})
        }).done(function(result) {
            if (result.success) {
                message.id = result.id
                // send a message to the given userId
                let messages = self.messages;
                let userMessages = [];
                if (message.recipientId in messages) {
                    userMessages = messages[message.recipientId];
                }
                messages[message.recipientId] = userMessages.concat(message);
                self.setState({
                    messages: messages
                });
            }
        }).fail(function (jqXHR, textStatus) {
            console.log(jqXHR);
            console.log(textStatus);
        });


    }
}

export default alt.createStore(MessageStore, 'MessageStore')
