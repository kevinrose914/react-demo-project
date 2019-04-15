const koa = require('koa')
const path = require('path')
const webpack = require('webpack')
const webpackConf = require('../webpack.config')
const devMiddleware = require('./middleware/devMiddleware')
const hotMiddleware = require('./middleware/hotMiddleware')
const Router = require('koa-router')
const fs = require('fs')

const router = new Router()
const app = new koa()
const compiler = webpack(webpackConf)

app.use(devMiddleware(compiler, {
    noInfo: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: false
    },
    publicPath: webpackConf.output.publicPath,
    stats: {
        color: true
    }
}))

app.use(hotMiddleware(compiler, {}))

router.get('/favicon.ico', (ctx, next) => {
    ctx.body = null
})

router.get('/', async (ctx, next) => {
    const htmlFile = await new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, './index.html'), (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data.toString())
            }
        })
    })
    ctx.type = 'text/html;charset=utf-8'
    ctx.body = htmlFile
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(8484, () => {
    console.log('server is running on http://localhost:8484!')
})