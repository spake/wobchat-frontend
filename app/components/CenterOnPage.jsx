import React from 'react';

export default class CenterOnPage extends React.Component {
    render() {
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
        )
    }
}
