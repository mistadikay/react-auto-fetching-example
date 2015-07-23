import EventEmitter from 'emmett';

import state from 'state';
import dispatcher from 'dispatcher';

export default class extends EventEmitter {
    constructor(...args) {
        super(...args);

        this.state = state;

        dispatcher.register(payload => {
            if (this[payload.actionType]) {
                this[payload.actionType](payload);
            }
        });
    }
}
