import React from 'react';
import { DataWatcher } from 'doob';

const sortTypes = [ 'asc', 'desc' ];

@DataWatcher(props => ({
    products: [
        'data',
        'products',
        'list',
        {
            sort_type: props.sortType
        }
    ],
    selectedProductID: [
        'ui',
        'products',
        'selected'
    ],
    sortType: [
        'ui',
        'products',
        'sort-type'
    ]
}))
class ProductsList extends React.Component {
    static displayName = 'ProductsList';

    constructor(props, context) {
        super(props, context);

        props.cursors.sortType.set(sortTypes[0]);
    }

    _changeSort(e) {
        this.props.cursors.sortType.set(e.target.checked ? sortTypes[1] : sortTypes[0]);
    }

    _chooseProduct(productID) {
        this.props.cursors.selectedProductID.set(productID);
    }

    render() {
        const data = this.props.products;

        if (!data) {
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
                        data.items.map(product => (
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
