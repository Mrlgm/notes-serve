const router = require('koa-router')()

// 获取所有notes
router.get('/', async (ctx, next) => {
  ctx.body = "获取所有notes"
})

router.post('/add', async (ctx, next) => {
  ctx.body = "获取所有notes"
})

router.post('/edit', async(ctx)=>{

})

router.post('/delete', async(ctx)=>{

})

module.exports = router