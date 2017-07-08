var path = require('path');
var webpack = require('webpack');
var assetsPlugin = require('assets-webpack-plugin');//路径
var CleanWebpackPlugin = require('clean-webpack-plugin');//清空

var vendors = require(path.resolve(__dirname, '', 'vendors.js'));//配置库

module.exports = {
    output: {
        path: path.resolve(__dirname, 'dest/vendor'),
        filename: '[name].[chunkhash].js',
        library: '[name]_[chunkhash]',
    },
    entry: {
        vendor: vendors,
    },
    plugins: [
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]_[chunkhash]',
            context: path.resolve(__dirname, 'dest/vendor'),
        }),
        new assetsPlugin({//输出路径名
            filename: 'vendors-config.json', 
            path: './'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            'window.jQuery': 'jquery'
        }),
        new CleanWebpackPlugin(['dest/vendor/*'])
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'jshint-loader'
                    }
                ]
            },
            {
                test: /\.scss$/,//scss编译成style
                use: [
                    {
                        loader: "style-loader"
                    }, 
                    {
                        loader: "css-loader"
                    }, 
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.css$/,//css返回字符串
                use: [
                    {
                        loader: "css-loader"
                    }
                ]
            }, 
            {
                test: /\.(png|jpg|gif)$/,//处理图片
                use: [
                    {
                        loader: 'url-loader?limit=8192&name=./images/[hash].[ext]'
                    }
                ]
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,  
                use: [
                    {
                        loader: 'url-loader?limit=10000&mimetype=application/font-woff' 
                    }
                ] 
            }, {  
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,  
                use: [
                    {
                        loader: 'url-loader?limit=10000&mimetype=application/octet-stream' 
                    }
                ] 
            }, {  
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,  
                use: [
                    {
                        loader: 'file-loader'  
                    }
                ]
            }, {  
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,  
                use: [
                    {
                        loader: "url-loader?limit=10000&mimetype=image/svg+xml"  
                    }
                ]
            }
        ]
    },
};