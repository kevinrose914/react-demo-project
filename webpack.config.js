const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const resolve = (filepath) => path.resolve(__dirname, filepath)
// 静态资源的存储路径
const join = (filepath) => path.posix.join('static', filepath)

// 生成样式相关的loader
const generalStyleLoader = (options) => {
    const { sourceMap, extract, usePostCSS, preprocessor } = options
    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap,
            modules: !!preprocessor
        }
    }
    const postCssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap,
            plugins: () => [
                autoprefixer({
                    browsers: ['last 3 versions']
                })
            ]
        }
    }
    const styleLoader = {
        loader: 'style-loader'
    }
    let loaders = usePostCSS ? [cssLoader, postCssLoader] : [cssLoader]
    if (preprocessor) {
        loaders.push({
            loader: `${preprocessor.name}-loader`,
            options: Object.assign({}, preprocessor.option, { sourceMap })
        })
    }
    if (!extract) {
        loaders = [styleLoader].concat(loaders)
    }
    // sass, less, stylus, styl
    if (preprocessor) {
        return {
            test: new RegExp('\\.(' + preprocessor.name + ')$'),
            use: loaders,
            exclude: /node_modules/
        }
    }
    return {
        test: new RegExp('\\.(css)$'),
        use: loaders,
        exclude: /node_modules/
    }
}

module.exports = {
    mode: 'development',
    entry: {
        app: ['react-hot-loader/patch', 'webpack-hot-middleware/client', path.join(__dirname, './src/index.js')]
    },
    output: {
        path: resolve('dist'),
        filename: './static/js/[name].js',
        chunkFilename: './static/js/[name].[chunkhash:5].js',
        publicPath: '/'
    },
    resolve: {
        modules: [path.join(__dirname, './node_modules')], // 优化webpack文件搜索范围
        extensions: ['.jsx', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'eslint-loader',
                        options: {
                            formatter: require('eslint-friendly-formatter'),
                            emitWarning: true
                        }
                    }
                ],
                include: [resolve('src')],
                enforce: 'pre'
            },
            {
                test: /\.jsx?$/,
                use: ['babel-loader?cacheDirectory'],
                exclude: /node_modules/
            },
            generalStyleLoader({
                sourceMap: true,
                usePostCSS: true,
                preprocessor: { name: 'less' }
            }),
            generalStyleLoader({
                sourceMap: false,
                usePostCSS: true,
            }),
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: join('/img/[name].[hash:7].[ext]')
                        }
                    }
                ]
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: join('/media/[name].[hash:7].[ext]')
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            name: join('/fonts/[name].[hash:7].[ext]')
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, './dist/index.html'),
            template: './index.html',
            inject: true,
            chunksSortMode: 'none'
        })
    ],
    devServer: {
        // headers: { 'Access-Control-Allow-Origin': '*' },
        // contentBase: path.join(__dirname, './dist'),
        // publicPath: '/',
        historyApiFallback: true,
        port: 8181,
        // disableHostCheck: true,
        // https: false,
        // stats: 'errors-only',
        // clientLogLevel: 'error',
        // watchOptions: {
        //     aggregateTimeout: 300,
        //     poll: 1000
        // }
    },
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            chunks: 'all',
            name: true,
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 3,
                    priority: -10
                },
                styles: {
                    name: 'styles',
                    test: /\.less$/,
                    chunks: 'all',
                    enforce: true
                },
                vendors: {
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/
                },
                // default: false
            }
        },
    }
}