const router = require('koa-router')()
const koaBody = require('koa-body')
const fs = require('fs')
const path = require('path')
const User = require('../lib/mongo').User

// router.post('/uploadfile',koaBody({
//   multipart: true,
//   formidable: {
//       maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
//   }
// }), async (ctx, next) => {
//   // 上传单个文件
//   const file = ctx.request.files.file; // 获取上传文件
//   // 创建可读流
//   const reader = fs.createReadStream(file.path);
//   let filePath = path.join(__dirname, '../public/img/') + `/${file.name}`;
//   // 创建可写流
//   const upStream = fs.createWriteStream(filePath);
//   // 可读流通过管道写入可写流
//   reader.pipe(upStream);
//   return ctx.body = "上传成功！";
// });

router.post('/register', koaBody(), async (ctx) => {
  // 待写入数据库的用户信息
  let {username,password,avatar} = ctx.request.body
  console.log(ctx.request.body)
  let user = await User.findOne({
    username
  })
  console.log(user)
  if(user){
    ctx.body={status:'fail', msg: '用户已存在'}
  }else{
    let result = await User.create({
      username,
      password,
      avatar
    })
    // // 删除密码这种敏感信息，将用户信息存入 session
    // delete user.password
    console.log(result)
    let json = result.ops[0]
    ctx.session.user = json
    ctx.body={status:'ok',msg: '创建成功', data: json}
  }
})

// 判断用户是否登录
router.get('/', async (ctx, next) => {
  console.log(ctx.session.user)
  if(ctx.session.user){
   return ctx.body = {status:'ok',isLogin: true, data: ctx.session.user}
  }else {
   return ctx.body = {status:'ok', isLogin: false}
  }
})

// 注销登录
router.get('/logout', async (ctx, next) => {
  if(ctx.session.user){
    ctx.session.user = null
    ctx.body = {status:'ok',msg: '注销成功'}
  }else {
    ctx.body = {status:'fail',msg: '当前用户尚未登录'}
  }
})

// 用户登陆
router.post('/login', koaBody(), async (ctx) => {

  let  username= ctx.request.body.username
  let password = ctx.request.body.password
  
  console.log(ctx.request.body)
  let user = await User.findOne({
    username
  })
  if(!user){
    return ctx.body = {status:'fail',msg:'用户不存在'}
  }
  if(password!==user.password){
    return ctx.body = {status:'fail',msg:'用户名或密码错误'}
  }
  ctx.session.user = user
  ctx.body = {status:'ok',msg: '登录成功', data: user}
})

// router.get('/login', async (ctx) => {
//   let html = `
//       <h1>koa2 request post demo</h1>
//       <form method="POST" action="/">
//         <p>userName</p>
//         <input name="userName" /><br/>
//         <p>nickName</p>
//         <input name="nickName" /><br/>
//         <p>email</p>
//         <input name="email" /><br/>
//         <button type="submit">submit</button>
//       </form>
//     `
//   ctx.body = html
// })

module.exports = router