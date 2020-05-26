const wepackMerge = require('webpack-merge');
const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const ProdConfig = require('./webpack.prod.config');
const DevConfig = require('./webpack.dev.config');

//根据条件处理相关配置
const genarateConfig = env => {
    //样式loader
    let cssLoader = [{
        loader: 'css-loader',
        options: {
            sourceMap: true
        }
    }, {
        loader: 'postcss-loader',
        options: {
            ident: 'postcss',
            plugins: [
                require('postcss-cssnext')()
            ],
            sourceMap: true
        }
    }, {
        loader: 'less-loader',
        options: {
            sourceMap: true
        }
    }];
    let styleLoader = [{
        test: /\.(css|less)$/,
        use: env === 'prod' ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: cssLoader
        }) : [{
            loader: 'style-loader',
            options: {
                sourceMap: true
            }
        }].concat(cssLoader)
    }];

    //脚本loader
    let jsLoader = [{
        test: require.resolve('jquery'),
        use: [{
            loader: 'expose-loader',
            options: 'jQuery'
        }, {
            loader: 'expose-loader',
            options: '$'
        }]
    }, {
        test: /\.js$/,
        exclude: /(node_modules|bower_components|libs)/,
        use: [{
            loader: 'babel-loader'
        }].concat(env === 'dev' ? [{
            loader: 'eslint-loader'
        }] : [])
    }];

    //文件处理loader
    let fileLoaderOptions = {
        useRelativePath: false,
        name: '[name]-[hash:5].[ext]'
    };
    if (env === 'prod') {
        fileLoaderOptions.limit = 10000;
    }
    let fileLoader = [{
        test: /\.(jpg|jpeg|png|icon)$/,
        use: [{
            loader: env === 'dev' ? 'file-loader' : 'url-loader',
            options: env === 'dev' ? fileLoaderOptions : Object.assign({}, fileLoaderOptions, {
                outputPath: '../dist/img'
            })
        }]
    }, {
        //解析字体文件
        test: /\.(eot|svg|ttf|woff2?)$/,
        use: [{
            loader: env === 'dev' ? 'file-loader' : 'url-loader',
            options: env === 'dev' ? fileLoaderOptions : Object.assign({}, fileLoaderOptions, {
                outputPath: '../dist/fonts'
            })
        }]
    }, {
        //解析主页面和页面上的图片
        test: /\.html$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'html-loader',
            options: {
                attrs: ['img:src', 'img:data-src'],
                minimize: true
            }
        }
    }];

    //webpack插件
    let plugins = [];

    //入口html插件
    plugins.push(new HtmlWebpackPlugin({
        template: Path.join(__dirname, '../index.html'),
        filename: 'index.html',
        inject: true,
        chunks: ['vendor']
    }));

    //友好提示插件
    plugins.push(new FriendlyErrorsPlugin());

    //不打包默认加载项
    plugins.push(new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

    plugins.push(new Webpack.ProvidePlugin({
        CryptoJS: 'crypto'
    }));

    let config = {
        devtool: 'source-map',
        output: {
            path: Path.join(__dirname, '../dist/'),
            filename: env === 'dev' ? '[name]-[hash:5].bundle.js' : '[name]-[chunkhash:5].bundle.js'
        },
        module: {
            rules: [].concat(styleLoader).concat(jsLoader).concat(fileLoader)
        },
        plugins: plugins,
        resolve: {}
    };

    return config;
};

module.exports = env => {
    let config = env === 'dev' ? DevConfig : ProdConfig;
    let result = wepackMerge(genarateConfig(env), config);
    return result;
};
