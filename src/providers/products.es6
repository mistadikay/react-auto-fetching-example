import state from 'state';

export function isRequestingProducts() {
    return state.getIn([ 'ui', 'requesting', 'products' ]);
}

export function isRequestingProductDetails(productID) {
    return state.getIn([ 'ui', 'requesting', 'product', productID ]);
}
