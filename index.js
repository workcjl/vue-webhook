const Koa = require('koa')
const Router = require('@koa/router')
const cors = require('@koa/cors')
const crypto = require('crypto')
const { spawn } = require('child_process')
const app = new Koa()
const router = new Router()

const PORT = 4000
const SECRET = '123456'
const sign = (body) => 'sha1=' + crypto.createHmac('sha1', SECRET).update(body).digest('hex')

router.post('/webhook', (ctx) => {
  const buffers = []
  ctx.req.on('data', (buffer) => {
    buffers.push(buffer)
  })
  ctx.req.on('end', () => {
    const body = Buffer.concat(buffers)
    console.log('body=>', body)
    const event = ctx.request.headers['x-github-event']
    const signature = ctx.request.headers['x-hub-signature']
    const delivery = ctx.request.headers['x-github-delivery']
    console.log('dddd=>', ctx.request.headers)
    if (sign(body) !== signature) ctx.body = 'Not Allowed'
    ctx.set('Content-Type', 'application/json')
    ctx.body = {
      ok: true
    }
    if (event === 'push') {
      const content = JSON.parse(body)
      console.log('content=>', content)
      // spawn('sh')
      console.log('true')
    }
  })
})

app.use(cors())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(PORT, () => {
  console.log(`webHook服务启动在${PORT}`)
})
