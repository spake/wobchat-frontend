import uuid from 'node-uuid';
import alt from '../libs/alt';
import Config from '../libs/Config';
import MessageActions from '../actions/MessageActions';
import FriendStore from '../stores/FriendStore';
import notify from '../libs/Notify';
let Notify = new notify;

class MessageStore {
    constructor() {
        this.bindActions(MessageActions);
        // Bind non-action functions
        this.add = this.add.bind(this);
        this.messages = {};
        this.mostRecentId = -1;
        this.poll();
    }
    add(msgEvent) {
        console.log("Message receieved.");
        console.log("Adding message.");

        let self = this;
        let messages = self.messages;
        messages[msgEvent.message.senderId].push(msgEvent.message);
        self.setState({messages: messages});
        // Repoll
        this.poll(msgEvent.message.senderId);
    }
    poll() {
        let self = this;
        console.log("Sending Message longpoll.");
        let url = "";
        if (this.mostRecentId != -1) {
            url = Config.apiBaseUrl + "/nextMessage?after=" + self.mostRecentId;
        } else {
            url = Config.apiBaseUrl + "/nextMessage";
        }
        $.ajax({
            method: 'GET',
            beforeSend: function (request) {
                const token = FriendStore.getState().me.token
                request.setRequestHeader("X-Session-Token", token);
            },
            url: url,
            timeout: 70000 // milliseconds
        }).done(function(data) {
            if (data.success == false) {
                console.log("Longpoll unsuccessful.");
                self.poll();
            } else {
                self.add(data);
                const user = FriendStore.get(userId);
                Notify.play(user.name);
            }
        }).fail(function(userId) {
            console.log("Message Poll Failed.");
            // TODO: Handle possible errors here.
            self.poll(userId); }
        );
    }
    loadMessages(userId) {
        let self = this;
        $.ajax({
            method: 'GET',
            beforeSend: function (request) {
                const token = FriendStore.getState().me.token
                request.setRequestHeader("X-Session-Token", token);
            },
            url: Config.apiBaseUrl + '/friends/' + userId + '/messages',
        }).done(function(result) {
            if (result.success) {
                let messages = self.messages;
                let resMessages = result.messages;
                resMessages.forEach(function(entry) {
                    if (entry.senderId != userId) {
                        entry.direction = "from";
                    } else {
                        entry.direction = "to";
                    }
                });
                messages[userId] = resMessages;
                self.setState({messages: messages})
                // Update most recent msg ID
                var newId = (messages[userId] == undefined) ? messages[userId][messages[userId].length - 1].id : -1;
                if (newId > this.mostRecentId) {
                    self.mostRecentId = newId;
                    console.log("New mostRecentId: " + self.mostRecentId);
                }
            } else {
                console.log(result.error)
            }
        }).fail(function (jqXHR, textStatus) {
            console.log(jqXHR);
            console.log(textStatus);
        });
    }
    load(userId) {
        this.loadMessages(userId);
    }
    send(message) {
        var self = this;
        $.ajax({
            method: 'POST',
            beforeSend: function (request) {
                const token = FriendStore.getState().me.token
                request.setRequestHeader("X-Session-Token", token);
                request.setRequestHeader("Content-Type", 'application/json');
            },
            url: Config.apiBaseUrl + '/friends/' + message.recipientId + '/messages',
            data: JSON.stringify(message)
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
            } else {
                console.log(result.error)
            }
        }).fail(function (jqXHR, textStatus) {
            console.log(jqXHR);
            console.log(textStatus);
        });


    }
}

export default alt.createStore(MessageStore, 'MessageStore')
