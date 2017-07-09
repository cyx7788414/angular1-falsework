var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var BabiliPlugin = require("babili-webpack-plugin");//解决es6代码压缩问题
var bundleConfig = require("./vendors-config.json");
var HtmlWebpackPluginExpend = require('./htmlWebpackPluginExpend.js');
var CleanWebpackPlugin = require('clean-webpack-plugin');//清空

module.exports = {
    entry: {
        main: 'src/init.js',//主页面
        browser: 'src/main/js/browser.js',//浏览器
    },
    output: {
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dest')
    },
    devtool: "source-map",
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
                test: /\.ejs$/,
                use: [
                    {
                        loader: 'ejs-compiled-loader',
                        options: {
                            'htmlmin': true,
                            'htmlminOptions': {
                                removeComments: true,
                                minifyCSS: true,
                                minifyURLs: true,
                                processScripts: ['text/ng-template']
                            }
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
    plugins: [
        new HtmlWebpackPlugin({//首页
            forExpendFlag: 'index',
            filename: './index.html',
            template: 'src/indexTemplate.js',
            inject: true,
            hash: true,
            //bundleName: bundleConfig.vendor.js,
            minify: {
                removeComments: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true,
                processScripts: ['text/ng-template']
            },
            chunks:['main']
        }),
        new HtmlWebpackPluginExpend({
            paths: [
                {
                    name: 'vendor/' + bundleConfig.vendor.js,
                    exclude: []//与include只存在一个
                }
            ]
        }),
        new HtmlWebpackPlugin({//浏览器
            forExpendFlag: 'browser',
            filename: './browser.html',
            template: 'src/main/js/browserTemplate.js',
            inject: true,
            hash: true,
            minify: {
                removeComments: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true,
                processScripts: ['text/ng-template']
            },
            chunks:['browser']
        }),
        // new webpack.ProvidePlugin({
        //     $: "jquery",
        //     jQuery: "jquery",
        //     'window.jQuery': 'jquery'
        // }),
        new BabiliPlugin(),//解决es6代码压缩问题
        new webpack.DllReferencePlugin({
            context: path.join(__dirname, "dest/vendor"),
            manifest: require('./manifest.json'),
        }),
        new CleanWebpackPlugin(['dest/*.*', 'dest/images'])
    ],
    resolve: {
        alias: {
            'src': path.resolve(__dirname, './src')
        }
    }
};