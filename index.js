const Koa = require('koa')
const Router = require('@koa/router')
const cors = require('@koa/cors')
const app = new Koa()
const router = new Router()

const PORT = 4000

router.post('/webhook', (ctx) => {
  const buffers = []
  ctx.req.on('data', (buffer) => {
    buffers.push(buffer)
  })
  ctx.req.on('end', () => {
    const body = Buffer.concat(buffers)
    console.log('body=>', body)
  })
  console.log('dddd=>', ctx.request.headers)
  ctx.body = 'ddddd'
})

app.use(cors())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(PORT, () => {
  console.log(`webHook服务启动在${PORT}`)
})
