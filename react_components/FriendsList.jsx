var React = require('react'),
    mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    RaisedButton = mui.RaisedButton,
    AppBar       = mui.AppBar,
    List         = mui.List,
    ListItem     = mui.ListItem,
    ListDivider  = mui.ListDividier,
    Avatar       = mui.Avatar,
    Paper        = mui.Paper,
    Colors       = mui.Styles.Colors,
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
            <List subheader="Friends">
                <Paper zDepth={0} >
                    {this.state.friends.map(function(result) {
                        return (
                            <ListItem
                                key={result.id}
                                leftAvatar={<Avatar src={result.picture} />}
                                primaryText={result.name}/>
                        );
                    })}
                </Paper>
            </List>
        );
    }
});
