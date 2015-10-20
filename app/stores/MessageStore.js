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
        this.getLastTextMessage = this.getLastTextMessage.bind(this)
    }
    add(msgEvent) {
        console.log("Message receieved.");
        console.log("Adding message.");

        let self = this;
        let messages = self.messages;
        msgEvent.message.shouldPlayWib = true;
        if (typeof messages[msgEvent.message.senderId] === 'undefined') {
            messages[msgEvent.message.senderId] = [];
        }
        messages[msgEvent.message.senderId].push(msgEvent.message);
        self.setState({messages: messages});
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
                    FriendStore.moveFriendToTop(res.body.message.senderId);
                    self.add(res.body);
                    const user = FriendStore.get(res.body.message.senderId);
                    Notify.play(user)
                } else {
                    console.log("Longpoll unsuccessful");
                }

                // Repoll
                self.poll();
            });
        } else {
            setTimeout(function(){
                self.poll()
            }, 100);
        }
    }
    load(params) {
        const userId = params[0];
        const forceLoad = params[1];
        const callback = params[2];
        let self = this;

        const token = FriendStore.getState().me.token

        let messagesNonEmpty = (typeof self.messages[userId] !== 'undefined' && self.messages[userId].length > 0)

        if (messagesNonEmpty && !forceLoad) {
            // don't bother loading any new messages; we should get them from
            // notifications anywho
            callback();
            return;
        }

        // if messages is empty, or forceLoad is true, then actually download messages

        let suffix = ''
        if (messagesNonEmpty) {
            suffix = '?last=' + self.messages[userId][0].id
            console.log('adding suffix: ' + suffix)
        }
        request
          .get(Config.apiBaseUrl + '/friends/' + userId + '/messages' + suffix)
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
                if (typeof messages[userId] !== 'undefined') {
                    console.log('appending ' + resMessages.length + ' messages')
                    messages[userId] = resMessages.concat(messages[userId])
                } else {
                    console.log('there are ' + resMessages.length + ' new messages')
                    messages[userId] = resMessages
                }
                self.setState({messages: messages})
                // Update most recent msg ID
                var newId = (messages[userId] == undefined) ? messages[userId][messages[userId].length - 1].id : -1;
                if (newId > self.mostRecentId) {
                    self.mostRecentId = newId;
                    console.log("New mostRecentId: " + self.mostRecentId);
                }
                callback();
            } else {
                console.log(err)
            }

        });
    }
    turnOffWibs(userId, messageId) {
        console.log("Turning off wibs")
        let messages = this.messages
        messages[userId].some(function(message) {
            if (message.id == messageId) {
                message.shouldPlayWib = false
                return
            }
        })
        this.setState({
            messages: messages
        })
    }

    // find the last message that's sent by the user that is a text message
    getLastTextMessage(userId) {
        let userMessages = this.messages[userId]
        let myId = FriendStore.getState().me.id

        let foundMessage = false
        let message = null
        for(let i=userMessages.length-1; i >= 0; i--) {
            message = userMessages[i]
            if (message.senderId == myId && message.contentType == 1) {
                foundMessage = true
                break
            }
        }
        if (foundMessage) {
            return message
        }
        return null
    }

    send(message) {
        var self = this;

        // this section applies s/// messages to the previous message and sends that
        // ceebs dealing with backslashes properly - some things will just break
        let subMatchRe = new RegExp("^\s*s/(.*)/(.*)/(g?)\s*$")
        let reResults = subMatchRe.exec(message.content)
        if (reResults) {
            let globalOption = reResults[3]
            let userSubRe = null
            // the regex may be invalid
            try {
                if (globalOption) {
                    userSubRe = new RegExp(reResults[1], 'g')
                } else {
                    userSubRe = new RegExp(reResults[1])
                }
            } catch (err) {
                console.log('Invalid regex entered')
                // just don't do anything if an invalid regex is entered
                return
            }
            let userReplaceString = reResults[2]

            let userMessages = this.messages[message.recipientId]
            let lastMessage = this.getLastTextMessage(message.recipientId)
            if (lastMessage == null) {
                // there wasn't a message to correct
                return
            }
            message.content = "I meant to say: " + lastMessage.content.replace(userSubRe, userReplaceString)
        }

        const token = FriendStore.getState().me.token
        request
          .post(Config.apiBaseUrl + '/friends/' + message.recipientId + '/messages')
          .set('X-Session-Token', token)
          .set('Content-Type', 'application/json')
          .send(JSON.stringify(message))
          .end(function(err, res){
            if (!err && res.body.success) {
                FriendStore.moveFriendToTop(message.recipientId)
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
