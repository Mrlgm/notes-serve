const router = require('koa-router')()


router.post('/',async (ctx)=>{
  // console.log(ctx.request.files);
  console.log(ctx.uploadpath);
  ctx.body = 'http://api.wwnight.cn/' + ctx.uploadpath.file
});

// module.exports = router
module.exports = router