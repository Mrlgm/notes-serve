const router = require('koa-router')()


router.get('/', async (ctx, next) => {
  ctx.body = "<div>Hello</div>"
})



// module.exports = router
module.exports = router