import uuid from 'node-uuid';
import alt from '../libs/alt';
import Config from '../libs/Config';
import MessageActions from '../actions/MessageActions';
import FriendStore from '../stores/FriendStore';
import notify from '../libs/Notify';
import request from 'superagent';
let Notify = new notify;

class MessageStore {
    constructor() {
        this.bindActions(MessageActions);
        // Bind non-action functions
        this.add = this.add.bind(this);
        this.messages = {};
        this.mostRecentId = -1;
        this.poll();
        
        this.exportPublicMethods({
            turnOffWibs: this.turnOffWibs.bind(this)
        });

    }
    add(msgEvent) {
        console.log("Message receieved.");
        console.log("Adding message.");

        let self = this;
        let messages = self.messages;
        msgEvent.message.shouldPlayWib = true;
        messages[msgEvent.message.senderId].push(msgEvent.message);
        self.setState({messages: messages});
        // Repoll
        this.poll();
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

        const token = FriendStore.getState().me.token;
        if (typeof token !== 'undefined') {
            request
              .get(url)
              .set('X-Session-Token', token)
              .timeout(70000)
              .end(function(err, res){
                if (!err && res.body.success) {
                    self.add(res.body);
                    const user = FriendStore.get(res.body.message.senderId);
                    Notify.play(user.name)
                } else {
                    console.log("Longpoll unsuccessful");
                    self.poll();
                }

            });
        } else {
            setTimeout(function(){
                self.poll()
            }, 100); 
        }
    }
    loadMessages(userId) {
        let self = this;

        const token = FriendStore.getState().me.token
        request
          .get(Config.apiBaseUrl + '/friends/' + userId + '/messages')
          .set('X-Session-Token', token)
          .end(function(err, res){
            if (!err && res.body.success) {
                let messages = self.messages;
                let resMessages = res.body.messages;
                resMessages.forEach(function(entry) {
                    if (entry.senderId != userId) {
                        entry.direction = "from";
                    } else {
                        entry.direction = "to";
                    }
                    entry.shouldPlayWib = false;
                });
                messages[userId] = resMessages;
                self.setState({messages: messages})
                // Update most recent msg ID
                var newId = (messages[userId] == undefined) ? messages[userId][messages[userId].length - 1].id : -1;
                if (newId > self.mostRecentId) {
                    self.mostRecentId = newId;
                    console.log("New mostRecentId: " + self.mostRecentId);
                }
            } else {
                console.log(err)
            }

        });
    }
    load(userId) {
        this.loadMessages(userId);
        // Start longpoll.
    }
    turnOffWibs(userId, messageId) {
        console.log("Turning off wibs");
        let messages = this.messages;
        messages[userId].some(function(message) {
            if (message.id == messageId) {
                message.shouldPlayWib = false;
                return;
            }
        });
        this.setState({
            messages: messages
        });
    }
    send(message) {
        var self = this;

        const token = FriendStore.getState().me.token
        request
          .post(Config.apiBaseUrl + '/friends/' + message.recipientId + '/messages')
          .set('X-Session-Token', token)
          .set('Content-Type', 'application/json')
          .send(JSON.stringify(message))
          .end(function(err, res){
            if (!err && res.body.success) {
                message.id = res.body.id
                if (message.senderId == FriendStore.getState().me.id) {
                    message.direction = "from";
                } else {
                    message.direction = "to";
                }
                message.shouldPlayWib = true;
                message.timestamp = Date.now();
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
                console.log(err)
            }

        });

    }
}

export default alt.createStore(MessageStore, 'MessageStore')
