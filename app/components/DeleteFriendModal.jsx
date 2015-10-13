import React from 'react';
import FriendActions from '../actions/FriendActions'
import {Dialog} from 'material-ui';

class DeleteFriendModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        }
        this.deleteFriend = this.deleteFriend.bind(this);
        this.cancelDelete= this.cancelDelete.bind(this);
        this.show = this.show.bind(this);
    }

    deleteFriend() {
        let user = this.state.user;
        this.refs.dialog.dismiss();
        FriendActions.deleteFriend(user.id);
    }

    cancelDelete() {
        this.refs.dialog.dismiss();
    }

    show(user) {
        this.setState({user: user})
        this.refs.dialog.show()
    }

    render() {
        let user = this.props.user;
        let standardActions = [
            {text: "Yes", onTouchTap: this.deleteFriend, ref: "deleteFriend"},
            {text: "No",  onTouchTap: this.cancelDelete, ref: "cancelDelete"}
        ];

        return (
            <Dialog
                ref="dialog"
                title={"Remove " + this.state.user.name + " from Friends List"}
                actions={standardActions}
                actionFocus="cancelDelete"
                modal={true}>
                Are you sure you want to remove {this.state.user.name} from your friends list?
            </Dialog>
        );
    }
}


module.exports = DeleteFriendModal;


