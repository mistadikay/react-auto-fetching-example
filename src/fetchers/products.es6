import api from 'api';

import {
    updateProductsList,
    updateProductDetails,
    startProductsListLoading,
    stopProductsListLoading,
    startProductDetailsLoading,
    stopProductDetailsLoading
} from 'mutators/products';
import { isRequestingProducts, isRequestingProductDetails } from 'providers/products';

export function getProducts(options) {
    if (!isRequestingProducts()) {
        startProductsListLoading();

        api.getProducts(options).then(
            data => {
                updateProductsList(data);
                stopProductsListLoading();
            }
        ).catch(
            error => {
                stopProductsListLoading();
            }
        );
    }
}

export function getProductInfo(productID) {
    if (!isRequestingProductDetails[productID]) {
        startProductDetailsLoading(productID);

        api.getProductInfo(productID).then(
            data => {
                updateProductDetails(data);
                stopProductDetailsLoading(productID);
            }
        ).catch(
            error => {
                stopProductDetailsLoading(productID);
            }
        );
    }
}
