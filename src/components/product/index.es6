import { Component, DOM } from 'react';
import DataWatcher from 'components/@data-watcher';

@DataWatcher
class ProductClass extends Component {
    static displayName = 'Product';
    static data = props => ({
        details: [
            'data',
            'products',
            'details',
            props._productID
        ]
    });

    componentWillReceiveProps(nextProps) {
        if (nextProps._productID !== this.props._productID) {
            this._reloadData(nextProps);
        }
    }

    _renderProductDetails() {
        const data = this.state.data.details;

        if (!data) {
            if (this.props._productID) {
                return DOM.div(null, 'loading...');
            } else {
                return null;
            }
        }

        return Object.keys(data).map(key => {
            return DOM.div(
                {
                    className: 'product__property',
                    key
                },
                data[key]
            );
        });
    }

    render() {
        return DOM.div(
            {
                className: 'product'
            },
            this._renderProductDetails()
        )
    }
};

export default ProductClass;
