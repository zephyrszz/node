const router = require('koa-router')()
      sports = require('./sports')


// 新闻跟路由
router.get('/',ctx=>{
    ctx.body='新闻首页'
})


// 子路由
router.get('/jj',ctx=>{
    ctx.body='经济新闻'
})


// 子路由
router.use('/sports',sports)




module.exports=router.routes()