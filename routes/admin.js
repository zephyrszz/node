const router = require('koa-router')()


// 根
router.get('/', ctx => {
    ctx.render('admin')
})

// 注册
router.get('/reg', ctx => {
    ctx.render('reg')
})


// 执行注册
router.post('/regDo', ctx => {
    // 接收表单数据
    let res = ctx.request.body

    // 保存到数据库

    ctx.body = { status: 200, res }


})


module.exports = router.routes()