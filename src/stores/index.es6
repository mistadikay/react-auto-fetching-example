import EventEmitter from 'emmett';

import dispatcher from 'dispatcher';

export default class extends EventEmitter {
    constructor(...args) {
        super(...args);

        dispatcher.register(payload => {
            if (this[payload.actionType]) {
                this[payload.actionType](payload);
            }
        });
    }
}
