# react-transition的问题
1. 整个页面首次加载的动画，不能成功，原因是渲染过程中，css或者less还没加载完毕<br />
> 解决：不单独提取less到link标签，css不用modules，可以参考本框架的webpack配置<br />
2. 当路由组件为异步组件时，每个组件渲染的第一次都不会有动画效果


# webpack结合less开启css module, 实现组件之间的less, css互不干扰
```css
{
test: /\.less$/,
use: [
    require.resolve('style-loader'),
    {
        loader: require.resolve('css-loader'),
        options: {
            modules: true,//开启
            localIndexName:"[name]__[local]___[hash:base64:5]"//配置class的名字
        },
    },
    {
        loader: require.resolve('less-loader'), // compiles Less to CSS
    },
    {
    loader: require.resolve('postcss-loader'),
    options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebookincubator/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
        require('postcss-flexbugs-fixes'),
        autoprefixer({
            browsers: [
            '>1%',
            'last 4 versions',
            'Firefox ESR',
            'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
        }),
        ],
    },
    }
],
},
{
    test: /\.css$/,
    use: [
        require.resolve('style-loader'),
        {
            loader: require.resolve('css-loader'),
            options: {
                modules: false,//关闭
            },
        },
        {
            loader: require.resolve('postcss-loader'),
            options: {
                // Necessary for external CSS imports to work
                // https://github.com/facebookincubator/create-react-app/issues/2677
                ident: 'postcss',
                plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                        browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9', // React doesn't support IE8 anyway
                        ],
                        flexbox: 'no-2009',
                    }),
                ],
            },
        }
    ],
},
```