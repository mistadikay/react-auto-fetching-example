import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixerConfig from './autoprefixer';

export default {
    cache: true,
    entry: [
        './src',
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:3001'
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
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'images/[name]-[hash].[ext]'
                }
            },
            {
                test: /\.less$/,
                loaders: [
                    'style',
                    'css?-minimize',
                    'autoprefixer?' + autoprefixerConfig,
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
