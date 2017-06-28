var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: 'src/init.js',//主页面
        browser: 'src/main/js/browser.js'//浏览器
    },
    output: {
        filename: '[name].js',
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
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({//首页
            filename: './index.html',
            template: 'src/index.js',
            inject: true,
            hash: true,
            minify: {
                removeComments: true,
            },
            chunks:['main']
        }),
        new HtmlWebpackPlugin({//浏览器
            filename: './browser.html',
            template: 'src/main/js/browser.js',
            inject: true,
            hash: true,
            minify: {
                removeComments: true,
            },
            chunks:['browser']
        }),
    ],
    resolve: {
        alias: {
            'src': path.resolve(__dirname, './src')
        }
    }
};