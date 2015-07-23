import React from 'react';
import { DataWatcher } from 'doob';

const sortTypes = [ 'asc', 'desc' ];

@DataWatcher
class ProductsList extends React.Component {
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

    render() {
        const data = this.state.data.products;

        if (!data) {
            return (<div>{ 'loading...' }</div>);
        }

        return (
            <div className='products-list'>
                <div className='products-list__sort'>
                    { 'sort:' }
                    <label>
                        <input id='sort' type='checkbox'
                            checked={ this.state.sortType === sortTypes[1] }
                            onChange={ ::this._changeSort } />
                        { this.state.sortType }
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
