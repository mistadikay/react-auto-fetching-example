import React, { Component, DOM } from 'react';
import ProductsActions from 'actions/products';
import stateStore from 'stores/state';

import DataWatcher from 'components/@data-watcher';
import ProductsListClass from 'components/products-list';
import ProductClass from 'components/product';

const ProductsList = React.createFactory(ProductsListClass);
const ProductDescription = React.createFactory(ProductClass);

@DataWatcher
class AppClass extends Component {
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

        stateStore.getTree().on('get', e => {
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
        return DOM.div(
            {
                className: 'app'
            },
            ProductsList(),
            DOM.hr(null),
            ProductDescription({
                _productID: this.state.data.selectedProductID
            })
        );
    }
}

export default AppClass;
