const router = require('koa-router')()
const koaBody = require('koa-body')
const path = require('path')
const upload = require('../utils/upload')

router.post('/', koaBody({
  multipart:true,
  encoding:'gzip',
  formidable:{
    uploadDir:path.join(__dirname,'public/img'),
    keepExtensions: true,
    maxFieldsSize:200 * 1024 * 1024,
    onFileBegin:(name,file) => {
      // console.log(file);
      // 获取文件后缀
      const ext = upload.getUploadFileExt(file.name);
      // 最终要保存到的文件夹目录
      const dir = path.join(__dirname,'public/img');

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

// module.exports = router
module.exports = router