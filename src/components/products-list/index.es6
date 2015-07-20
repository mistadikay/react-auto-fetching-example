import { Component, DOM } from 'react';
import DataWatcher from 'components/@data-watcher';

const sortTypes = [ 'asc', 'desc' ];

@DataWatcher
class ProductsListClass extends Component {
    static displayName = 'ProductsList';
    static data = (props, state) => ({
        products: [
            'data',
            'products',
            'list',
            {
                sort_type: state.sortType
            }
        ],
        selectedProductID: [
            'ui',
            'products',
            'selected'
        ]
    });

    constructor(props) {
        super(props);

        this.state = {
            sortType: sortTypes[0]
        };
    }

    _changeSort(e) {
        this.setState({
            sortType: e.target.checked ? sortTypes[1] : sortTypes[0]
        }, this._reloadData);
    }

    _chooseProduct(productID) {
        this.cursors.selectedProductID.set(productID);
    }

    _renderSortSwitcher() {
        return DOM.div(null,
            'sort:',
            DOM.label(null,
                DOM.input({
                    id: 'sort',
                    type: 'checkbox',
                    onChange: ::this._changeSort
                }),
                this.state.sortType
            )
        )
    }

    _renderProductsList() {
        const data = this.state.data.products;

        if (!data) {
            return DOM.div(null, 'loading...');
        }

        return DOM.ul(null,
            data.items.map(product => DOM.li({
                    key: product.id
                },
                DOM.a({
                    href: '#' + product.id,
                    className: 'products-list__item',
                    onClick: this._chooseProduct.bind(this, product.id)
                },
                product.name)
            ))
        );
    }

    render() {
        return DOM.div(
            {
                className: 'products-list'
            },
            this._renderSortSwitcher(),
            this._renderProductsList()
        );
    }
}

export default ProductsListClass;
