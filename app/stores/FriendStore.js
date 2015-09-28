import uuid from 'node-uuid';
import alt from '../libs/alt';
import Config from '../libs/Config'
import FriendActions from '../actions/FriendActions';

class FriendStore {
    constructor() {
	this.bindActions(FriendActions);
	this.friends = [];
        this.me = {};
        this.exportPublicMethods({
            get: this.getFriend.bind(this),
            pullInfo: this.pullInfo.bind(this)
        });

        this.pullInfo = this.pullInfo.bind(this);
    }
    pullInfo(token) {
	let self = this;
        let me = this.me;
        me.token = token
        self.setState({me: me})

        // Get the info about the current user
        $.ajax({
            method: 'GET',
            beforeSend: function (request) {
                request.setRequestHeader("X-Session-Token", token);
            },
            url: Config.apiBaseUrl + '/me',
        }).done(function(result) {
            if (result.success) {
                let me = self.me;
                me.id = result.user.id;
                me.picture = result.user.picture;
                me.name = result.user.name;
                self.setState({me: me})
                console.log(self.me)
            }
        });

        // Pulls all the other friends
	$.ajax({
            method: 'GET',
            beforeSend: function (request) {
                request.setRequestHeader("X-Session-Token", token);
            },
            url: Config.apiBaseUrl + '/friends',
        }).done(function(result) {
            if (result.friends != null) {
                self.setState({friends: result.friends})
            }
        });

    }
    add(id) {
        // Add a friend by ID
        let self = this;
        $.ajax({
            method: 'POST',
            beforeSend: function (request) {
                request.setRequestHeader("X-Session-Token", self.me.token);
                request.setRequestHeader("Content-Type", 'application/json');
            },
            url: Config.apiBaseUrl + '/friends',
            data: JSON.stringify({id: parseInt(id)})
        }).done(function(result) {
            if (result.success) {
        	const friends = self.friends;
        	self.setState({
        	    friends: friends.concat(result.friend)
        	});
            }
        }).fail(function (jqXHR, textStatus) {
            console.log(jqXHR);
            console.log(textStatus);
        });
    }
    delete(id) {
      // not implemented	
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
