import React from 'react';
import productsStore from 'stores/products';
import productsActions from 'actions/products';
import { DataInit, DataFetcher } from 'doob';
import state from 'state';

import ProductsList from 'components/products-list';
import ProductDescription from 'components/product';

@DataInit(state)
@DataFetcher([
    {
        path: [ 'data', 'products', 'list' ],
        callback: sortOptions => {
            if (sortOptions.sort_type) {
                productsActions.getProducts(sortOptions);
            }
        }
    },
    {
        path: [ 'data', 'products', 'details' ],
        callback: productID => productsActions.getProductInfo(productID)
    }
])
class App extends React.Component {
    static displayName = 'app';

    render() {
        return (
            <div className='app'>
                <ProductsList />
                <hr />
                <ProductDescription />
            </div>
        );
    }
}

export default App;
