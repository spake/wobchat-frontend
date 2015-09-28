import React from 'react';
import mui from 'material-ui';
let {List, ListItem} = mui;

class UserSearch extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <List>
                <ListItem primaryText="a friend" />
            </List>
        );
    }
}

UserSearch.defaultProps = {
    search: ""
}

module.exports = UserSearch;
