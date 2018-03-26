const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: {
        app: './client/app/app.js',
    },
    output: {
        path: path.join(__dirname, 'client/public/dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: [
                    [
                        'env', {
                            targets: {
                                browsers: ['last 2 versions']
                            }
                        }
                    ]
                ],
                plugins: ['angularjs-annotate']
            }
        }, {
            test: /\.(s*)css$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ],
    resolve: {
        modules: ['node_modules'],
        extensions: ['.js', '.json', '.jsx', '.css'],
    },
};