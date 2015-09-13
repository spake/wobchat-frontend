var React = require('react'),
    mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    ListItem     = mui.ListItem,
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
            },
            onClick: function() {}
        };
    },
    render: function() {
        var user = this.props.user;
        return (
            <ListItem
                onClick={this.props.onClick.bind(null, this)}
                key={user.id}
                leftAvatar={<Avatar src={user.picture} />}
                primaryText={user.name}/>
        );
    }
});
