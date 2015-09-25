import React from 'react';
import {Dialog} from 'material-ui';

class DeleteFriendModal extends React.Component {
    constructor(props) {
        super(props);

        this.deleteFriend = this.deleteFriend.bind(this);
        this.cancelDelete= this.cancelDelete.bind(this);
    }

    deleteFriend() {
        this.refs.dialog.dismiss();
        this.props.deleteFriend(this.props.user);
    }

    cancelDelete() {
        this.refs.dialog.dismiss();
        this.props.cancelDelete(this.props.user);
    }

    show() {
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
                title={"Remove " + user.name + " from Friends List"}
                actions={standardActions}
                actionFocus="cancelDelete"
                modal={true}>
                Are you sure you want to remove {user.name} from your friends list?
            </Dialog>
        );
    }
}

module.exports = DeleteFriendModal;
