const Koa = require('koa')
const mongoose = require('mongoose')
const cors = require('koa2-cors')
const router = require('koa-router')()
const koaBody = require('koa-body')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session-minimal');
const static = require('koa-static')
const MongooseStore = require('koa-session-mongoose');
const config = require('./config/default')
const path = require('path')

const notes = require('./routes/notes')
const auth = require('./routes/auth')
const index = require('./routes/index')
const upload = require('./utils/upload')

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
  key: config.session.key,
  // store: new MongooseStore()
}))

// koaBody({
//   multipart: true,
//   formidable: {
//       maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
//   }
// })

const staticPath = './public'

app.use(static(path.join( __dirname,  staticPath)))

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

//app.use(bodyParser())

router.post('/', koaBody({
  multipart:true,
  encoding:'gzip',
  formidable:{
    uploadDir:path.join(__dirname,'/public/img'),
    keepExtensions: true,
    maxFieldsSize:200 * 1024 * 1024,
    onFileBegin:(name,file) => {
      // console.log(file);
      // 获取文件后缀
      const ext = upload.getUploadFileExt(file.name);
      // 最终要保存到的文件夹目录
      const dir = path.join(__dirname,'/public/img');

      const fileName = upload.getUploadFileName(ext)
      // 重新覆盖 file.path 属性
      file.path = `${dir}/${fileName}`;
      
      app.context.uploadpath = app.context.uploadpath ? app.context.uploadpath : {};
      app.context.uploadpath[name] = `img/${fileName}`;
    },
    onError:(err)=>{
      console.log(err);
    }
  }
}),async (ctx)=>{
  // console.log(ctx.request.files);
  console.log(ctx.uploadpath);
  ctx.body = 'http://api.wwnight.cn/' + ctx.uploadpath.file
});

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