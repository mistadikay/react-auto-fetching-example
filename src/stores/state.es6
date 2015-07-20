import Baobab from 'baobab';

import Store from '.';
import constants from 'constants/actions';

class StateStore extends Store {
    constructor(...args) {
        super(...args);

        this.tree = new Baobab();
    }

    get() {
        return this.tree.get();
    }

    getIn(cursorPath) {
        return this.tree.get(cursorPath);
    }

    set(data) {
        this.tree.set(data);
    }

    setIn(cursorPath, data) {
        this.tree.set(cursorPath, data);
    }

    getTree() {
        return this.tree;
    }

    [constants.PRODUCTS_LOADED]({ data }) {
        this.tree.select([ 'data', 'products', 'list' ]).apply(
            (products = []) => products.concat(data)
        );
        this.emit(constants.PRODUCTS_LOADED);
    }

    [constants.PRODUCT_INFO_LOADED]({ data }) {
        this.tree.set([ 'data', 'products', 'details', data.id ], data);
        this.emit(constants.PRODUCT_INFO_LOADED);
    }
}

export default new StateStore();
