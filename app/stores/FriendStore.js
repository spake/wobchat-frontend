import uuid from 'node-uuid';
import alt from '../libs/alt';
import Config from '../libs/Config'
import FriendActions from '../actions/FriendActions';
import request from 'superagent';

class FriendStore {
    constructor() {
	    this.bindActions(FriendActions);
	    this.friends = [];
        this.me = {};
        this.friendRequests = [];
        this.exportPublicMethods({
            get: this.getFriend.bind(this),
            pullInfo: this.pullInfo.bind(this),
        });

        this.pullInfo = this.pullInfo.bind(this);
        this.checkRequests = this.checkRequests.bind(this);
        this.pullRequests = this.pullRequests.bind(this);
    }
    pullInfo(token) {
    	let self = this;
        let me = this.me;
        me.token = token
        self.setState({me: me})

        // Get the info about the current user
        request
          .get(Config.apiBaseUrl + '/me')
          .set('X-Session-Token', token)
          .end(function(err, res){
            if (!err && res.body.success) {
                let me = self.me;
                me.id = res.body.user.id;
                me.picture = res.body.user.picture;
                me.name = res.body.user.name;
                self.setState({me: me})
            } else {
                console.log(err);
            }
        });

        request
          .get(Config.apiBaseUrl + '/friends')
          .set('X-Session-Token', token)
          .end(function(err, res){

            if (!err && res.body.success) {
                if (res.body.friends != null) {
                    self.setState({friends: res.body.friends})
                }
            } else {
                console.log(err);
            }
        });
        // Pull friend requests
        this.checkRequests(token);
    }
    pullRequests(token) {
        let self = this;
        request
          .get(Config.apiBaseUrl + '/friendrequests')
          .set('X-Session-Token', token)
          .end(function(err, res) {
            if (!err && res.body.success) {
              self.setState({ friendRequests: res.body.requestors})
            } else {
              console.log(err)
            }
        })
    }
    checkRequests(token) {
        this.pullRequests(token)
        setInterval(this.pullRequests.bind(this, token), 5000)
    }
    acceptRequest(id) {
        // Add given friend (from id) to user
        let self = this;
        request
          .put(Config.apiBaseUrl + '/friendrequests/' + id)
          .set('X-Session-Token', self.me.token)
          .end(function(err, res) {
            if (res.body.success) {
                // Remove user from friendRequests and add to friends
                const friends = self.friends;
                const requests = self.friendRequests;
                for (let i = 0; i < requests.length; i++) {
                    if (requests[i].id == id) {
                        if (friends == null) {
                            self.setState({ friends: requests[i] })
                        } else {
                            self.setState({ friends: friends.concat(requests[i])})
                        }
                        requests.splice(i, 1)
                        self.setState({
                            friendRequests: requests
                        });
                        break;
                    }
                }
            }

          });
    }
    requestFriend(id) {
        let self = this;
        request
          .post(Config.apiBaseUrl + '/users/' + id + '/friendrequests')
          .set('X-Session-Token', self.me.token)
          .end(function(err, res) {
            if (!res.body.success) {
              console.log(err)
            }
          })
    }
    declineRequest(id) {
        let self = this;
        request
          .del(Config.apiBaseUrl + '/friendrequests/' + id)
          .set('X-Session-Token', self.me.token)
          .end(function(err, res) {
            if (res.body.success) {
                // Remove from friendRequests
                const requests = self.friendRequests;
                for (let i = 0; i < requests.length; i++) {
                    if (requests[i].id == id) {
                        requests.splice(i, 1)
                        self.setState({friendRequests: requests});
                        break;
                    }
                }
            } else {
              console.log(err)
            }
        });
    }
    deleteFriend(id) {
        // Delete a friend by ID
        let self = this;

        const token = this.me.token
        request
          .del(Config.apiBaseUrl + '/friends/' + id)
          .set('X-Session-Token', token)
          .set('Content-Type', 'application/json')
          .send(JSON.stringify({id: parseInt(id)}))
          .end(function(err, res){
            if (!err && res.body.success) {
                let friends = self.friends;
                for (let i = 0; i < friends.length; i++) {
                    if (friends[i].id == id) {
                        friends.splice(i, 1)
                        self.setState({
                            friends: friends
                        });
                        break;
                    }
                }
            } else {
                console.log(err)
            }
        });
    }
    getFriend(id) {
        // Gets information about a friend (or yourself) by ID
        if (typeof this.me != 'undefined' && id == this.me.id) {
            return this.me;
        }
        let returnFriend = null
        this.friends.forEach(function(friend) {
            if (friend.id == id) {
                returnFriend = friend;
            }
        })
        return returnFriend;
    }
}

export default alt.createStore(FriendStore, 'FriendStore');
