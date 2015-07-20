import React, { Component } from 'react';
import DataWatcher from 'components/@data-watcher';

@DataWatcher
class Product extends Component {
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

    render() {
        const data = this.state.data.details;

        if (!data) {
            if (this.props._productID) {
                return (<div>{ 'loading...' }</div>);
            } else {
                return null;
            }
        }

        return (
            <div className='product'>
                {
                    Object.keys(data).map(key => (
                        <div className='product__property' key={ key }>
                            { data[key] }
                        </div>
                    ))
                }
            </div>
        )
    }
};

export default Product;
