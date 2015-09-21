var React = require('react'),
    mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    List         = mui.List,
    Paper        = mui.Paper,
    Colors       = mui.Styles.Colors,
    FriendsListItem = require('./FriendsListItem.jsx'),
    FriendsListAddBox = require('./FriendsListAddBox.jsx'),
    FriendsListAcceptDeclineModal = require('./FriendsListAcceptDeclineModal.jsx'),
    RaisedButton = mui.RaisedButton,
    PurpleTheme  = require('./PurpleTheme.jsx');

ThemeManager.setPalette(PurpleTheme);
module.exports = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },
    getChildContext: function() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },
    getInitialState: function() {
        return {
            friends: []
        };
    },
    componentDidMount: function() {
        var self = this;
        $.ajax({
            method: 'GET',
            beforeSend: function (request) {
                request.setRequestHeader("X-Session-Token", localStorage.token);
            },
            url: "https://api.wob.chat/friends",
        }).done(function(result) {
            if (result.friends != null) {
                self.setState({friends: result.friends})
            }
        });
    },
    acceptRequest: function(user) {
        console.log(user);
    },
    declineRequest: function(user) {
        console.log(user);
    },
    addFriend: function(userId) {
        var self = this;
            $.ajax({
                method: 'POST',
                beforeSend: function (request) {
                    request.setRequestHeader("X-Session-Token", localStorage.token);
                    request.setRequestHeader("Content-Type", 'application/json');
                },
                url: "https://api.wob.chat/friends",
                data: JSON.stringify({uid: userId})
            }).done(function(result) {
                if (result.success) {
                    self.setState({friends: self.state.friends.concat([result.friend])})
                }
            });

        // here we can send a message to the API telling it we have added a friend
    },
    launchModal: function() {
        this.refs.modal.show();
    },
    render: function() {
        var self = this;
        var friends = this.state.friends.map(function(result) {
            return (
                <FriendsListItem key={result.uid} user={result} onClick={self.props.openChat} />
            );
        }.bind(this));
        return (
            <div>
            <FriendsListAddBox addFriend={this.addFriend}/>
            <List subheader="Friends">
                <Paper zDepth={0} >
                    {friends}
                </Paper>
                <RaisedButton onClick={this.launchModal} primary={true} label="Friend Request Dialog"/>
                <FriendsListAcceptDeclineModal ref="modal" user={this.state.friends[0]} accept={this.acceptRequest} decline={this.declineRequest}/>
            </List>
            </div>
        );
    }
});
