const router = require('koa-router')()
      phone = require('./phone.js')

// 商城跟路由
router.get('/',ctx=>{
    ctx.body="商城首页"
})

// 子路由
router.get('/pc',ctx=>{
    ctx.body="电脑"
})

// 子路由
router.use('/phone',phone)








module.exports=router.routes()