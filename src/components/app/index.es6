import React from 'react';
import productsStore from 'stores/products';
import productsActions from 'actions/products';
import { DataInit, DataWatcher } from 'doob';
import state from 'state';

import ProductsList from 'components/products-list';
import ProductDescription from 'components/product';

@DataInit({
    state
})
class App extends React.Component {
    static displayName = 'app';

    componentDidMount() {
        state.on('get',
            [ 'data', 'products', 'list' ],
            sortOptions => productsActions.getProducts(sortOptions)
        );

        state.on('get',
            [ 'data', 'products', 'details' ],
            productID => productsActions.getProductInfo(productID)
        );
    }

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
