var React = require('react'),
    mui = require('material-ui'),
    ThemeManager = new mui.Styles.ThemeManager(),
    RaisedButton = mui.RaisedButton,
    AppBar       = mui.AppBar,
    Avatar       = mui.Avatar,
    Colors       = mui.Styles.Colors,
    ListDivider  = mui.ListDivider,
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
        };
    },
    getDefaultProps: function() {
        return {
            message: {
                id: 1,
                message: "This is a test message",
                direction: "from",
                 user: {
                    id: 1,
                    name: "John Wiseheart",
                    picture: "http://www.gravatar.com/avatar/c526aa6b7282b04f21dc45663c816129"
                },

            }
        }
    },
    render: function() {
        var wrapperStyle = {
            display: "flex",
            padding: "10px",
            backgroundColor: this.props.message.direction=="from" ? Colors.purple50 : null,
        }

        var textStyle = {
            paddingLeft: "10px",
            fontFamily: 'Roboto, sans-serif',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        }
        return (
            <li>
                <div style={wrapperStyle} >
                    <Avatar src={this.props.message.user.picture} />
                    <div style={textStyle}>
                        {this.props.message.content}
                    </div>
                </div>
                <ListDivider />
            </li>
        );
    }
});
