import React from 'react';
import mui from 'material-ui';

class FriendRequests extends React.component {
    constructor(props) {
        super(props);

        this.getFriendRequests = this.bind.getFriendRequests(this);
        
    }
    render() {
        return (
            <List subheader="Pending Requests">
                <Paper zDepth={0} >
                    {this.state.users.map(this.renderUser)}
                </Paper>
            </List>
        ); 
    }

    renderUser(user) {
        return (
            
        );
    }

    componentDidMount() {
        this.getFriendRequests();
    }

    getFriendRequests() {

    }
}   

module.exports = FriendRequests;
