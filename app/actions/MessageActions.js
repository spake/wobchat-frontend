import alt from '../libs/alt';

class MessageActions {
	constructor() {
    this.generateActions('load');
    this.generateActions('send', 'poll');
  }


}

export default alt.createActions(MessageActions);
