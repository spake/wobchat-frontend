import React from 'react';
import mui from 'material-ui';
import Logo from './Logo.jsx';
import CenterOnPage from './CenterOnPage.jsx';
import googleApiLoader from '../libs/GAPI';
let navigate = require('react-mini-router').navigate;


export default class LandingPage extends React.Component {
    componentDidMount() {
        googleApiLoader.authLoaded(function () {
            if (googleApiLoader.getAuth2().isSignedIn.get()) {
                navigate('/chat');
            }
        });
    }
    render() {
        return (
                <CenterOnPage>
                    <Logo />
                </CenterOnPage>
        );
    }
}
