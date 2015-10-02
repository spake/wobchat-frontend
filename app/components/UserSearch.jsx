import React from 'react';
import mui from 'material-ui';
import Friend from './Friend.jsx';
import FriendActions from '../actions/FriendActions';
import FriendStore from '../stores/FriendStore';
import Config from '../libs/Config';
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
        return (
            <List subheader="Search Results">
            {this.state.users != null ?
                <Paper zDepth={0} >
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
            <Friend
                key={user.id}
                user={user}
                onClick={FriendActions.add(user.id)}
            />
        );
    }

    componentWillMount() {
        this.searchUsers(this.props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.search == "") {
            return false;
        }
        return true;
    }

    componentWillReceiveProps(nextProps) {
       this.searchUsers(nextProps); 
    }

    searchUsers(props) {
        let self = this;
        $.ajax({
            method: 'GET',
            beforeSend: function(request) {
                request.setRequestHeader("X-Session-Token", FriendStore.getState().me.token);
            },
            url: Config.apiBaseUrl + '/users?q=' + props.search,
        }).done(function(result) {
            if (result.success) {
                self.setState({ users: result.users});
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
