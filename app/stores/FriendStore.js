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
        this.exportPublicMethods({
            get: this.getFriend.bind(this),
            pullInfo: this.pullInfo.bind(this),
        });

        this.pullInfo = this.pullInfo.bind(this);
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
    }
    add(id) {
        // Add a friend by ID
        let self = this;

        const token = this.me.token
        request
          .post(Config.apiBaseUrl + '/friends')
          .set('X-Session-Token', token)
          .set('Content-Type', 'application/json')
          .send(JSON.stringify({id: parseInt(id)}))
          .end(function(err, res){
            if (!err && res.body.success) {
                const friends = self.friends;
                self.setState({
                    friends: friends.concat(res.body.friend)
                });
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
        let returnFriend = {}
        this.friends.forEach(function(friend) {
            if (friend.id == id) {
                returnFriend = friend;
            }
        })
        return returnFriend;
    }
}

export default alt.createStore(FriendStore, 'FriendStore');
