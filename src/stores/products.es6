import { state } from 'doob';

import Store from '.';
import constants from 'constants/actions';

class ProductsStore extends Store {
    [constants.PRODUCTS_LOADED]({ data }) {
        state.getTree().select([ 'data', 'products', 'list' ]).apply(
            (products = []) => products.concat(data)
        );
        this.emit(constants.PRODUCTS_LOADED, data);
    }

    [constants.PRODUCT_INFO_LOADED]({ data }) {
        state.getTree().set([ 'data', 'products', 'details', data.id ], data);
        this.emit(constants.PRODUCT_INFO_LOADED, data);
    }

    [constants.PRODUCTS_LOAD_ERROR]({ error }) {
        this.emit(constants.PRODUCTS_LOAD_ERROR, error);
    }

    [constants.PRODUCT_INFO_LOAD_ERROR]({ productID, error }) {
        this.emit(constants.PRODUCT_INFO_LOAD_ERROR, productID, error);
    }
}

export default new ProductsStore();
