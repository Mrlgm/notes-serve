const router = require('koa-router')()
const koaBody = require('koa-body')
const Note = require('../lib/mongo').Note

// 获取所有notes
router.get('/', async (ctx, next) => {
  if(ctx.session && ctx.session.user){
    let username = ctx.session.user.username
    let notes = await Note.find({username})
    if(notes){
      ctx.body = notes
    }
  }else{
    ctx.body = {
      status: 1,
      errorMsg: '请先登录'
    }
  }
})

router.post('/add', koaBody(), async (ctx, next) => {
  if (!ctx.session || !ctx.session.user) {
    return ctx.body = {
      status: 1,
      errorMsg: '请先登录'
    }
  }
  if (!ctx.request.body.content) {
    return ctx.body = {status: 2, errorMsg: '内容不能为空'}
  }
  let {grade,content} = ctx.request.body
  let username = ctx.session.user.username
  console.log({content: content, username: username})
  let note = await Note.create({username,content,grade})
  if(note){
    ctx.body = {status: 0, msg:'创建成功'}
  }
})

router.post('/edit', koaBody(), async (ctx) => {
  if (!ctx.session || !ctx.session.user) {
    return ctx.body = {
      status: 1,
      errorMsg: '请先登录'
    }
  }
  let {noteId,content,complete,grade}= ctx.request.body

  let query = {'_id':noteId};
  let newData = {content,complete,grade}
  let result = await Note.findOneAndUpdate(query, newData, {upsert:true});
  if(result){
    ctx.body = {
      status: 0,
      msg: '修改成功'      
    }
  }
  result.__v+=1
  result.save()
})

router.post('/delete', koaBody(), async (ctx) => {
  if (!ctx.session || !ctx.session.user) {
    return ctx.body = {
      status: 1,
      errorMsg: '请先登录'
    }
  }
  let {noteId}= ctx.request.body
  let username = ctx.session.user.username
  let query = {'_id':noteId, username}
  let result = await Note.deleteOne(query)
  if(result.ok === 1){
    ctx.body = {
      status: 0,
      msg: '删除成功'      
    }
  }
})

module.exports = router