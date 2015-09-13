var React = require('react'),
    mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    List         = mui.List,
    Paper        = mui.Paper,
    Colors       = mui.Styles.Colors,
    FriendsListItem = require('./FriendsListItem.jsx'),
    FriendsListAddBox = require('./FriendsListAddBox.jsx'),
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
            friends: [
                {
                    id: 1,
                    name: "John Wiseheart",
                    picture: "http://www.gravatar.com/avatar/f701bd37f4beca74e1be313719d80629"
                },
                {
                    id: 2,
                    name: "George Caley",
                    picture: "http://www.gravatar.com/avatar/c526aa6b7282b04f21dc45663c816129"
                }
            ]
        };
    },
    componentDidMount: function() {
        var self = this;
    },
    render: function() {
        return (
            <div>
            <FriendsListAddBox />
            <List subheader="Friends">
                <Paper zDepth={0} >

                    {this.state.friends.map(function(result) {
                        return (
                            <FriendsListItem key={result.id} user={result} />
                        );
                    })}
                </Paper>
            </List>
            </div>
        );
    }
});
