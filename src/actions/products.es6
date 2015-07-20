import Actions from '.';

class ProductsActions extends Actions {
    // products list
    dispatchProductsData(data) {
        this.dispatch('PRODUCTS_LOADED', { data });
    }

    dispatchProductsDataLoadError(error) {
        console.log(error);
        this.dispatch('PRODUCTS_LOAD_ERROR', { error });
    }

    getProducts(options) {
        this.api.getProducts(options).then(
            ::this.dispatchProductsData,
            ::this.dispatchProductsDataLoadError
        );
    }

    // product info
    dispatchProductInfoData(productID, data) {
        this.isRequesting[productID] = false;
        this.dispatch('PRODUCT_INFO_LOADED', { productID, data });
    }

    dispatchProductInfoDataLoadError(productID, error) {
        this.isRequesting[productID] = false;
        this.dispatch('PRODUCT_INFO_LOADED', { productID, error });
    }

    getProductInfo(productID) {
        if (!this.isRequesting[productID]) {
            this.isRequesting[productID] = true;

            this.api.getProductInfo(productID).then(
                this.dispatchProductInfoData.bind(this, productID),
                this.dispatchProductInfoDataLoadError.bind(this, productID)
            );
        }
    }
}

export default new ProductsActions();
