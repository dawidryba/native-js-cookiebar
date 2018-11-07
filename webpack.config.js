const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = (env, options) => {
    const devMode = options.mode !== 'production';
    return {
        entry: {
            main: [
                './src/index.js',
                './src/index.scss',
            ]
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'cookiebar.min.js'
        },
        module: {
            rules: [{
                    test: /\.js/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/env'],
                    },
                },
                {
                    test: /\.scss$/,
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader"
                    ]
                },
                {
                    test: /.(png|jpg|woff(2)?|eot|ttf|svg)(\?[a-z0-9=\.]+)?$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '../css/[hash].[ext]'
                        }
                    }]
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader', 'postcss-loader']
                }
            ]
        },
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: false
        },
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true
                }),
                new OptimizeCSSAssetsPlugin({})
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "cookiebar.css",
                chunkFilename: "cookiebar.css"
            }),
            new webpack.DefinePlugin({
                "process.env.NODE_ENV": JSON.stringify("production")
            })
        ]
    };
};