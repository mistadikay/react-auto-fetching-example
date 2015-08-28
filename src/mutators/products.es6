import state from 'state';

// data
export function updateProductsList(data) {
    state.getTree().select([ 'data', 'products', 'list' ]).apply(
        (products = []) => products.concat(data)
    );
}

export function updateProductDetails(data) {
    state.setIn([ 'data', 'products', 'details', data.id ], data);
}

// request statuses
export function startProductsListLoading() {
    state.setIn([ 'ui', 'requesting', 'products' ], true);
}

export function stopProductsListLoading() {
    state.unsetIn([ 'ui', 'requesting', 'products' ]);
}

export function startProductDetailsLoading(productID) {
    state.setIn([ 'ui', 'requesting', 'product', productID ], true);
}

export function stopProductDetailsLoading(productID) {
    state.unsetIn([ 'ui', 'requesting', 'product', productID ]);
}

// ui
export function selectProduct(productID) {
    state.setIn([ 'ui', 'products', 'selected' ], productID);
}

export function changeSorting(sortType) {
    state.setIn([ 'ui', 'products', 'sort-type' ], sortType);
}
