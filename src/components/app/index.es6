import React, { Component } from 'react';
import ProductsActions from 'actions/products';
import state from 'state';

import DataWatcher from 'components/@data-watcher';
import ProductsList from 'components/products-list';
import ProductDescription from 'components/product';

@DataWatcher
class App extends Component {
    static displayName = 'app';
    static data = () => ({
        selectedProductID: [
            'ui',
            'products',
            'selected'
        ]
    });

    constructor(props) {
        super(props);

        state.getTree().on('get', e => {
            const [
                stateType,
                branch,
                entity,
                ...pathParams
            ] = e.data.path;

            if (stateType === 'data' && !e.data.data) {
                if (branch === 'products') {
                    switch (entity) {
                        case 'list':
                            const [ sortOptions ] = pathParams;

                            ProductsActions.getProducts(sortOptions);
                            break;
                        case 'details':
                            const [ productID ] = pathParams;

                            ProductsActions.getProductInfo(productID);
                            break;
                    }
                }
            }
        });
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
