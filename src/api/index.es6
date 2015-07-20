import apiConf from 'conf/api.json';
import request from 'api/request';

const {
    products,
    product_info
} = apiConf[process.env.NODE_ENV];

export default {
    getProducts(options) {
        return request.get(products.url, options);
    },

    getProductInfo(productID) {
        return request.get(product_info.url.replace(':productID', productID));
    }
};
