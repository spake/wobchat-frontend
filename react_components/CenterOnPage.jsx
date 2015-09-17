var React = require('react');

module.exports = React.createClass({
    render: function() {
        var style = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
        }
        return (
            <div style={style}>
                <div>
                {this.props.children}
                </div>
            </div>
        );
    }
})
