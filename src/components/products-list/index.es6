import React from 'react';
import { DataWatcher } from 'doob';

import { selectProduct, changeSorting } from 'mutators/products';

const sortTypes = [ 'asc', 'desc' ];

@DataWatcher(props => {
    const sortType = [
        'ui',
        'products',
        'sort-type'
    ];

    return {
        products: [
            'data',
            'products',
            'list',
            {
                sort_type: sortType
            }
        ],
        sortType
    };
})
class ProductsList extends React.Component {
    static displayName = 'ProductsList';

    constructor(props, context) {
        super(props, context);

        changeSorting(sortTypes[0]);
    }

    _changeSort(e) {
        changeSorting(e.target.checked ? sortTypes[1] : sortTypes[0]);
    }

    _chooseProduct(productID) {
        selectProduct(productID);
    }

    render() {
        const products = this.props.products;

        if (!products) {
            return (<div>{ 'loading...' }</div>);
        }

        return (
            <div className='products-list'>
                <div className='products-list__sort'>
                    { 'sort:' }
                    <label>
                        <input id='sort' type='checkbox'
                            checked={ this.props.sortType === sortTypes[1] }
                            onChange={ ::this._changeSort } />
                        { this.props.sortType }
                    </label>
                </div>
                <ul>
                    {
                        products.items.map(product => (
                            <li key={ product.id }>
                                <a href={ '#' + product.id } className='products-list__item'
                                    onClick={ this._chooseProduct.bind(this, product.id) }>
                                    { product.name }
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

export default ProductsList;
