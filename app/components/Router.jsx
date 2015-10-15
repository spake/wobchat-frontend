var React = require('react'),
    Header = require('./Header.jsx'),
    LandingPage = require('./LandingPage.jsx'),
    ChatPage = require('./ChatPage.jsx'),
    RouterMixin = require('react-mini-router').RouterMixin;

var InternalRouter = React.createClass({
    mixins: [RouterMixin],
    routes: {
        '/': 'home',
        '/chat': 'chat',
        '/chat/:id' : 'chatWithId',
    },
    render: function() {
        return this.renderCurrentRoute();
    },
    home: function() {
        return <LandingPage />;
    },
    chat: function() {
        return <ChatPage />;
    },
    chatWithId: function(userId, params) {
        return <ChatPage userId={userId} />
    },
    notFound: function(path) {
        return <div class="not-found">Page Not Found: {path}</div>;
    }
});

export default class Router extends React.Component {
    render() {
        let divStyle={
            display: 'flex',
            WebkitFlexDirection: 'column',
            flexDirection: 'column',
            height: '100%'
        }
        return (
            <div style={divStyle}>
                <Header />
                <InternalRouter />
            </div>
        );
    }
}
