const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log('WEBPACK_ENV:', WEBPACK_ENV);

module.exports = {
    entry: './src/app.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        /* publicPath相当于html中引用文件的路径前面加的前缀 */
        publicPath: WEBPACK_ENV === 'dev' ? "/dist/" : "//s.liujianwei.top/admin-fe/dist",
        filename: 'js/app.js'
    },
    resolve: {
        alias: {
            /* src的模块引用路径 */
            page: path.resolve(__dirname, 'src/page'),
            component: path.resolve(__dirname, 'src/component'),
            util: path.resolve(__dirname, 'src/util'),
            service: path.resolve(__dirname, 'src/service')
        }
    },
    module: {
        rules: [
            /* react语法处理 */
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react']
                    }
                }
            },
            /* css文件处理 */
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            /* sass文件处理 */
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            /* 图片处理 */
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            },
            /* 字体图标处理 */
            {
                test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        /* 处理html文件 */
        new HtmlWebpackPlugin({
            template: './src/index.html',
            favicon: './favicon.ico'
        }),
        /* 独立css文件 */
        new ExtractTextPlugin("css/[name].css"),
        /* 提取公共模块 */
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/base.js'
        })
    ],
    devServer: {
        // contentBase: './dist'
        port: 8086,
        /* 使404页面访问到首页 */
        historyApiFallback: {
            index: "/dist/index.html"
        },
        // 开发时请求劫持
        proxy: {
            // 以/manage开头的请求
            "/manage": {
                target: "http://admin.liujianwei.top",
                changeOrigin: true/* 使发送的请求以服务器域名为源地址, 解决跨域问题 */
            },
            // 单独配置不以/manage开头的请求
            "/user/logout.do": {
                target: "http://admin.liujianwei.top",
                changeOrigin: true
            }
        }
    }
};
