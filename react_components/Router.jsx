var React = require('react'),
    Header = require('./Header.jsx'),
    SignInPage = require('./SignInPage.jsx'),
    ChatPage = require('./ChatPage.jsx'),
    RouterMixin = require('react-mini-router').RouterMixin;

var Router = React.createClass({
    mixins: [RouterMixin],
    routes: {
        '/': 'home',
        '/chat': 'chat'
    },
    render: function() {
        return this.renderCurrentRoute();
    },
    home: function() {
        return <SignInPage />;
    },
    chat: function() {
        return <ChatPage />;
    },
    notFound: function(path) {
        return <div class="not-found">Page Not Found: {path}</div>;
    }
});


module.exports = React.createClass({
    render: function() {
        let divStyle={
            display: 'flex',
            WebkitFlexDirection: 'column',
            flexDirection: 'column',
            height: '100%'
        }
        return (
            <div style={divStyle}>
                <Header />
                <Router />
            </div>
        );
    }
})
