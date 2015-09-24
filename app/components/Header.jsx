import React from 'react';
import mui from 'material-ui';
import SignInOut from './SignInOut.jsx';
import PurpleTheme from './PurpleTheme.jsx';
let {AppBar} = mui;
let ThemeManager = new mui.Styles.ThemeManager();


ThemeManager.setPalette(PurpleTheme);

class Header extends React.Component {
    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    }
    render() {
        var appBarStyle = {
            position: "fixed",
            top: 0,
            zIndex: 20
        }

        var threadStyle = {
            paddingTop: "20px"
        }
        var signStyle = {
            paddingTop: "6px",
            paddingRight: "4px"
        }
        return (
            <AppBar
                    title="WobChat"
                    showMenuIconButton={false}
                    style={{zIndex: 20}}
                    iconElementRight={<div style={signStyle}><SignInOut/></div>}/>
        )
    }
}


Header.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = Header;
