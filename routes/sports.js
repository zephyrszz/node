const router = require('koa-router')()

router.get('/',ctx=>{
    ctx.body='体育新闻首页'
})

router.get('/backetball',ctx=>{
    ctx.body='篮球新闻'
})


module.exports=router.routes()