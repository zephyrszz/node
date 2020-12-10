// 引入模块
const Koa = require("koa"),
      router = require("koa-router")(),
      render = require('koa-art-template'),
      path = require('path'),
      koaBody = require('koa-body')

// 实例化对象
const app = new Koa();

///////////////////////////////////////////////////
// 配置

// 模板
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
  });

// koabody
app.use(koaBody({
    multipart: true
}));




///////////////////////////////////////////

// 路由
router.get("/", (ctx) => {
    //ctx:上下文对象
    ctx.body = "首页";
});

// 静态路由
router.get("/news/sports/china", (ctx) => {
    // 接收GET传参

    // 1.query返回json格式化的数据对象
    let res = ctx.query;

    // 2.querystring 以字符串形式返回参数
    let resString = ctx.querystring;

    // console.log(res);

    // ctx.body向浏览器输出文本
    ctx.body = res.name + res.age + res.like;
    console.log(resString);
});

// 动态路由
router.get("/info/:id/news/:title", (ctx) => {
    // 获取url
    let url = ctx.url;

    // 以JSON格式接受参数
    let { id, title } = ctx.params;

    console.log(id, title, url);

    ctx.body = id + title;
});

// 登录
router.get('/login',ctx =>{
    // 载入模板
    ctx.render('login')
})
// 处理登录
router.post('/loginDo',ctx=>{
    // 接受post数据
    let res = ctx.request.body

    console.log(res)

    ctx.body=res.username
})

/**node.js/koa2的路由
 * 1.安装路由模块koa-router
 * 2.在项目中（入口文件或模块文件）引入koa-router并实例化
 * 3.配置koa框架中，app.use(...).use(...)
 * 
 * 4.格式：router.(get/post/delete..)('路由地址',(ctx) =>{..回调函数...})
 * 5.get:
 *      接受参数：
 *              静态：ctx.query(以JSON格式)；ctx.querystring(以字符串格式)
 *              动态：ctx.params(以JSON格式)
 *              url: ctx.url
 *      输出内容：
 *              字符串：ctx.body
 *              模板：ctx.render
 *  post:
 *      接受参数：
 *      输出内容：
 * 
 * 6.404页面不存在
 *      使用中间件实现404或500
 */
 

// 404页面
app.use(async (ctx,next) =>{

    // 等下一个中间件执行完
    await next()

    try{
        if(!ctx.body){
            ctx.body='404'
        }
    }catch(e){
        ctx.body="500 SERVE ERROR"
        console.log(e)
    }
    
})

// 配置路由
app.use(router.routes()).use(router.allowedMethods);

// Hello world
app.use(async (ctx) => {
    ctx.body = "Hello world !";
});

// 开启服务器监听
app.listen(2020, () => {
    console.log("服务器运行在localhost:2020");
});
