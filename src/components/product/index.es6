import React from 'react';
import { DataWatcher } from 'doob';

@DataWatcher(props => ({
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
}))
class Product extends React.Component {
    static displayName = 'Product';

    render() {
        const data = this.props.details;

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
