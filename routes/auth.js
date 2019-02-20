const router = require('koa-router')()
const koaBody = require('koa-body') 
const User = require('../lib/mongo').User

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
  if(req.session.user){
    ctx.session.user = null
    ctx.body = {status:'ok',msg: '注销成功'}
  }else {
    ctx.body = {status:'fail',msg: '当前用户尚未登录'}
  }
})

// 用户登陆
router.post('/login', koaBody(), async (ctx) => {
  let {
    username,
    password
  } = ctx.request.body
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