const Koa = require('koa')
const Router = require('@koa/router')
const cors = require('@koa/cors')
const app = new Koa()
const router = new Router()

const PORT = 4000

router.post('/webhook', (ctx) => {
  ctx.body = '成功案例！'
})

app.use(cors())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(PORT, () => {
  console.log(`webHook服务启动在${PORT}`)
})
