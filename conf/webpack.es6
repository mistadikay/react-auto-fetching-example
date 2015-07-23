import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    cache: true,
    entry: [
        './src',
        'webpack/hot/dev-server'
    ],
    output: {
        pathinfo: true,
        path: '/',
        publicPath: 'http://localhost:3000/',
        filename: 'bundle.js'
    },
    resolve: {
        root: path.resolve('src'),
        extensions: [ '', '.js', '.es6', '.json' ],
        alias: {
            conf: path.resolve('conf')
        }
    },
    module: {
        preLoaders: [
            {
                test: /\.es6$/,
                loader: 'babel'
            }
        ],
        loaders: [
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.less$/,
                loaders: [
                    'style',
                    'css?-minimize',
                    'less'
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/assets/index.html',
            assets: {
                bundle: 'bundle.js'
            }
        })
    ]
};
