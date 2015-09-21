var React = require('react'),
    mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    TextField    = mui.TextField,
    List         = mui.List,
    FriendsListItem = require('./FriendsListItem.jsx'),
    ListDivider  = mui.ListDivider,
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
            search: ""
        }
    },
    getDefaultProps: function() {
        return {
            users: [{
                id: 1,
                picture: '',
                name: 'Test User'
            }]
        };
    },
    handleTextChange: function(event) {
        this.setState({search: event.target.value});
    },
    handleTextEnter: function(ev) {
        var self = this;
         var keycode = (ev.keyCode ? ev.keyCode : ev.which);
        if (keycode == '13') {
            console.log("ENTER");
            console.log(self.state.search);
            self.props.addFriend(self.state.search);
        }
    },

    render: function() {
        var self = this;

        var style = {
            padding: '0 0 0 15px',
            margin: 0
        };

        var value = this.state.search;

        // var filtered = this.props.users.filter(function (el) {
        //     return value && el.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
        // }).map(function(user) {
        //     return (
        //         <FriendsListItem key={user.id} user={user} onClick={self.props.addFriend} />
        //     );
        // });


        return (
            <div>
                <TextField hintText="Add friends..." style={style}
                  value={value} onChange={this.handleTextChange} onKeyUp={this.handleTextEnter}/>
            </div>
        );
    }
});
