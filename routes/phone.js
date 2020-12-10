const router = require('koa-router')()


router.get('/',ctx=>{
    ctx.body='全部手机'
})

router.get('/huawei',ctx=>{
    ctx.body='华为手机'
})


module.exports=router.routes()