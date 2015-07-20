import superagent from 'superagent';
import apiConf from 'conf/api.json';

const API = apiConf[process.env.NODE_ENV];
const HEADERS = {
    Accept: 'application/json'
};

const isValidResult = function(result) {
    return result && result.body && result.body.success;
};

const buildRequestURL = function(apiMethod) {
    if (apiMethod.indexOf('/') === 0 || apiMethod.indexOf('http') === 0) {

        return apiMethod;
    }

    return API.url + apiMethod;
};

const buildRequest = function(httpMethod, apiMethod, params) {
    // depending on http method: 'query' or 'send' for sending paramaters with request
    const paramsTransport = httpMethod === 'get' ? 'query' : 'send';

    return new Promise(
        function(resolve, reject) {
            superagent[httpMethod](buildRequestURL(apiMethod))
                .set(HEADERS)
                [paramsTransport](params)
                .on('error',
                    function(error) {
                        reject(error);
                    }
                )
                .end(
                    function(err, result) {
                        if (err) {
                            reject(err);
                        } else if (!isValidResult(result)) {
                            reject(result.error);
                        } else {
                            resolve(result.body.data, result);
                        }
                    }
                );
        }
    );
};

export default {
    get(apiMethod, queryParams) {

        return buildRequest('get', apiMethod, queryParams);
    },

    post(apiMethod, queryParams) {

        return buildRequest('post', apiMethod, queryParams);
    }
};
