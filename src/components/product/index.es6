import React from 'react';
import { DataWatcher } from 'doob';

@DataWatcher
class Product extends React.Component {
    static displayName = 'Product';
    static data = props => ({
        details: [
            'data',
            'products',
            'details',
            [
                'ui',
                'products',
                'selected'
            ]
        ]
    });

    render() {
        const data = this.state.data.details;

        if (!data) {
            return null;
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
        );
    }
}

export default Product;
