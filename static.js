// 引入模块
const Koa = require("koa"),
      router = require("koa-router")(),
      path = require('path'),
      render =require('koa-art-template'),
      static = require('koa-static')
    

// 实例化对象
const app = new Koa();

//////////////////////////////////////////////////////////////////
// 配置

    // 模板
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
  });

    //  静态资源
app.use(static('static'))  //'static' :所有静态资源存放路径

//////////////////////////////////////////////////////////////////
 


// 网站总首页
router.get('/',ctx=>{
    ctx.body="网站总首页"
})

router.get('/static',ctx=>{
    ctx.render('static')
})



//////////////////////////////////////////////////////////////////

// 配置路由
app.use(router.routes()).use(router.allowedMethods);


// 开启服务器监听
app.listen(2020, () => {
    console.log("服务器运行在localhost:2020");
});
