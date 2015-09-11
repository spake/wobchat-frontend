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
    getDefaultProps: function() {
        return {
            user: {
                id: 1,
                picture: '',
                name: 'Test User'
            }
        };
    },
    render: function() {
        var user = this.props.user;
        return (
            <ListItem
                key={user.id}
                leftAvatar={<Avatar src={user.picture} />}
                primaryText={user.name}/>
        );
    }
});
