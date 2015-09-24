var React = require('react'),
    mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    ListItem     = mui.ListItem,
    Avatar       = mui.Avatar,
    Paper        = mui.Paper,
    Dialog       = mui.Dialog,
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
    show: function() {
        this.refs.dialog.show();
    },
    accept: function() {
        this.refs.dialog.dismiss();
        this.props.accept(this.props.user);
    },
    decline: function() {
        this.refs.dialog.dismiss();
        this.props.decline(this.props.user);
    },
    render: function() {
        var user = this.props.user;
        var standardActions = [
            { text: 'Decline', onTouchTap: this.decline, ref: 'decline' },
            { text: 'Accept', onTouchTap: this.accept, ref: 'accept' }
        ];
        return (
            <Dialog
                ref="dialog"
                title={"Friend Request from " + user.name}
                actions={standardActions}
                actionFocus="accept"
                modal={true}>
                {user.name} has requested to become your friend. Do you accept?
            </Dialog>
        );
    }
});
