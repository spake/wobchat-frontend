import React from 'react';
import PurpleTheme from './PurpleTheme.jsx';
import googleApiLoader from '../libs/GAPI';
import FriendStore from '../stores/FriendStore';
import mui from 'material-ui';
let {RaisedButton} = mui;
let ThemeManager = new mui.Styles.ThemeManager();
let navigate = require('react-mini-router').navigate;


ThemeManager.setPalette(PurpleTheme);

class SignInOut extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loggedStatusLabel: "Loading..."
        }

        this.toggleLoggedStatus = this.toggleLoggedStatus.bind(this);
    }
    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    }
    componentDidMount() {
        var self = this;
        var _this = this;
        googleApiLoader.authLoaded(function () {
            _this.setState({authLoaded: true});

            googleApiLoader.getAuth2().currentUser.listen(function (user) {
                _this.setState({finishedLoading: true});
                if (googleApiLoader.getAuth2().isSignedIn.get()) {
                    _this.setState({loggedStatusLabel: 'Sign Out'});
                    FriendStore.pullInfo(user.getAuthResponse().id_token);
                    navigate('/chat');
                } else {
                    _this.setState({loggedStatusLabel: 'Sign In'});
                    navigate('/');
                }
            });

        });


    }
    toggleLoggedStatus() {
        if (googleApiLoader.getAuth2().isSignedIn.get()) {
            googleApiLoader.signOut();
            navigate('/');
        } else {
            googleApiLoader.signIn();
            googleApiLoader.getAuth2().isSignedIn.listen(function (bool) {
                if (bool) {
                    navigate('/chat');
                }
            });
        }

    }
    render() {
            return <RaisedButton label={this.state.loggedStatusLabel} onClick={this.toggleLoggedStatus} />
    }
};

SignInOut.childContextTypes = {
  muiTheme: React.PropTypes.object
};

module.exports = SignInOut;
