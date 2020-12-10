// 引入模块
const Koa = require("koa"),
      router = require("koa-router")(),
      path = require('path')
      news = require('./routes/news.js')
      shop = require('./routes/shop.js')

// 实例化对象
const app = new Koa();


//////////////////////////////////////////////////////////////////
 
// 网站总首页
router.get('/',ctx=>{
    ctx.body="网站总首页"
})

// 新闻
router.use('/news',news)

// 商城
router.use('/shop',shop)


//////////////////////////////////////////////////////////////////

// 配置路由
app.use(router.routes()).use(router.allowedMethods);


// 开启服务器监听
app.listen(2020, () => {
    console.log("服务器运行在localhost:2020");
});
