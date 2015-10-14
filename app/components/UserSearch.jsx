import React from 'react';
import mui from 'material-ui';
import Friend from './Friend.jsx';
import FriendActions from '../actions/FriendActions';
import FriendStore from '../stores/FriendStore';
import Config from '../libs/Config';
import User from './User.jsx'
import request from 'superagent';
let {List, ListItem, Paper} = mui;

class UserSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []  
        };
        this.searchUsers = this.searchUsers.bind(this);
        this.renderUser = this.renderUser.bind(this);
    }

    render() {
        let friendsStyles = {
            // Viewport height - Header height - TextField height - 'Search Results' text
            // - some magic number that makes the browser scroll not overflow
            height: 'calc(100vh - 64px - 48px - 48px - 8px)',
            overflow: 'auto',
            overflowX: 'hidden',
        }

        return (
            <List subheader="Search Results">
            {this.state.users != null ?
                <Paper style={friendsStyles} zDepth={0} >
                    {this.state.users.map(this.renderUser)}
                </Paper>
            :
                <ListItem primaryText="No results found" />
            }
            </List>
        );
    }

    renderUser(user) {
        return (
            <User
                key={user.id}
                user={user}
            />
        );
    }

    componentWillReceiveProps(nextProps) {
        this.searchUsers(nextProps); 
    }

    componentDidMount() {
        this.searchUsers(this.props);
    }

    componentWillUnmount() {
        this.isUnmounted = true;
    }

    searchUsers(props) {
        let self = this;

        const token = FriendStore.getState().me.token;
        request
          .get(Config.apiBaseUrl + '/users?q=' + props.search)
          .set('X-Session-Token', token)
          .end(function(err, res){
            if (!err && res.body.success) {
                if (!self.isUnmounted) {
                    self.setState({ users: res.body.users});
                }
            } else {
                console.log("Longpoll unsuccessful");
            }

        });
    }
}

UserSearch.defaultProps = {
    search: "",
    onClick: function() {
    }
}

module.exports = UserSearch;
