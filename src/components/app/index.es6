import React from 'react';
import { getProducts, getProductInfo } from 'fetchers/products';
import { DataInit, DataFetcher } from 'doob';
import state from 'state';

import ProductsList from 'components/products-list';
import ProductDescription from 'components/product';

@DataInit(state)
@DataFetcher([
    ([ type, store, branch, sortOptions ]) => [
        {
            path: [ 'data', 'products', 'list', sortOptions ],
            callback() {
                if (sortOptions.sort_type) {
                    getProducts(sortOptions);
                }
            }
        }
    ],
    ([ type, store, branch, productID ]) => [
        {
            path: [ 'data', 'products', 'details', productID ],
            callback() {
                getProductInfo(productID);
            }
        }
    ]
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
