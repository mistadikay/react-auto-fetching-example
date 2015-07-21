import api from 'api';
import constants from 'constants/actions';
import dispatcher from 'dispatcher';

class Actions {
    constructor() {
        this.api = api;
    }

    dispatch(actionType, data) {
        dispatcher.dispatch({
            actionType: constants[actionType],
            ...data
        });
    }
}

export default Actions;
