import state from 'state';

import Store from '.';
import constants from 'constants/actions';

class ProductsStore extends Store {
    [constants.PRODUCTS_LOADED]({ data }) {
        state.getTree().select([ 'data', 'products', 'list' ]).apply(
            (products = []) => products.concat(data)
        );
        this.emit(constants.PRODUCTS_LOADED);
    }

    [constants.PRODUCT_INFO_LOADED]({ data }) {
        state.getTree().set([ 'data', 'products', 'details', data.id ], data);
        this.emit(constants.PRODUCT_INFO_LOADED);
    }
}

export default new ProductsStore();
