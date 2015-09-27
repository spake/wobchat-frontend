import React from 'react';
import Friends from './Friends.jsx';
import FriendActions from '../actions/FriendActions';
import FriendStore from '../stores/FriendStore';
import FriendsListAddBox from './FriendsListAddBox.jsx';
import PurpleTheme from './PurpleTheme.jsx';
import mui from 'material-ui';
let {TextField} = mui;
let ThemeManager = new mui.Styles.ThemeManager();


ThemeManager.setPalette(PurpleTheme);

class FriendsAddBox extends React.Component {
    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    }
    constructor(props) {
        super(props);

        this.state = {
            search: ""
        }

        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleTextEnter = this.handleTextEnter.bind(this)
    }
    handleTextChange(event) {
        this.setState({search: event.target.value});
        console.log(this.state.search);
    }
    handleTextEnter(ev) {
        var self = this;
        var keycode = (ev.keyCode ? ev.keyCode : ev.which);
        if (keycode == '13') {
            FriendActions.add(self.state.search);
            console.log('enter pressed ' + this.state.search)
        }
    }
    render() {
        var self = this;

        var style = {
            padding: '0 0 0 15px',
            margin: 0
        };

        var value = this.state.search;

        return (
            <div>
                <TextField hintText="Add friends..." style={style}
                  value={value} onChange={this.handleTextChange} onKeyUp={this.handleTextEnter}/>
            </div>
        );
    }
};


FriendsAddBox.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = FriendsAddBox;
