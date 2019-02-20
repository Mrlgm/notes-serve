const Koa = require('koa')
const mongoose = require('mongoose')
const cors = require('koa2-cors')
const router = require('koa-router')()
const koaBody = require('koa-body') 
const bodyParser = require('koa-bodyparser')
const session = require('koa-session-minimal');
const MongooseStore = require('koa-session-mongoose');
const config = require('./config/default')

const notes = require('./routes/notes')
const auth = require('./routes/auth')
const index = require('./routes/index')

const app = new Koa()


// 处理跨域的配置
app.use(cors({
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
  maxAge: 100,
  credentials: true,
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}));

app.use(session({
  key:config.session.key,
  store: new MongooseStore()
}))

// router.get('/', async (ctx, next) => {
//   let val = null
//   const data = await User.findOne({username:'ydj'})
//   console.log('data', data)
//   const result = {
//     code: 200,
//     response: data,
//     ts: 12345
//   }
//   ctx.response.body = result
//   return result
// })

// app.use(bodyParser())

router.use('/', index.routes())
router.use('/notes', notes.routes())
router.use('/auth', auth.routes())

app.use(router.routes()).use(router.allowedMethods());


if (module.parent) {
  // 被 require，则导出 app
  module.exports = app
} else {
  app.listen(config.port);
  console.log('app started at port 3000...')
}