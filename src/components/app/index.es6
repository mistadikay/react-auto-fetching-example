import React from 'react';
import ProductsStore from 'stores/products';
import ProductsActions from 'actions/products';
import { state, DataWatcher } from 'doob';

import ProductsList from 'components/products-list';
import ProductDescription from 'components/product';

@DataWatcher
class App extends React.Component {
    static displayName = 'app';
    static data = () => ({
        selectedProductID: [
            'ui',
            'products',
            'selected'
        ]
    });

    componentDidMount() {
        state.on('get',
            [ 'data', 'products', 'list' ],
            sortOptions => ProductsActions.getProducts(sortOptions)
        );

        state.on('get',
            [ 'data', 'products', 'details' ],
            productID => ProductsActions.getProductInfo(productID)
        );
    }

    render() {
        return (
            <div className='app'>
                <ProductsList />
                <hr />
                <ProductDescription _productID={ this.state.data.selectedProductID } />
            </div>
        );
    }
}

export default App;
