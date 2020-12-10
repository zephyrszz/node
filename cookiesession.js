// 引入模块
const Koa = require("koa"),
    router = require("koa-router")(),
    render = require('koa-art-template'),
    path = require('path'),
    koaBody = require('koa-body'),
    session = require('koa-session')

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

// session
app.keys = ['some secret hurr'];

const CONFIG = {
    key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
    secure: false, /** (boolean) secure cookie*/
    sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
};

app.use(session(CONFIG, app));


///////////////////////////////////////////////////////////////////// 

// cookies
router.get('/cookie', ctx => {
    // 设置cookie
    ctx.cookies.set('key1', 'value1', {
        maxAge: 60 * 60 * 1000
    })
})

// 读取cookie

router.get('/getCookie', ctx => {
    let value = ctx.cookies.get('key1')

    console.log(value);
    ctx.body = value
})

// 删除cookie
router.get('/delCookie', ctx => {
    ctx.cookies.set('key1', '', {
        maxAge: -1
    })
})


/////////////////////////////////////////////////////
// SESSION
router.get('/setSession', ctx => {
    ctx.session.skey1 = 'value1'
    ctx.session.uname = 'jack'
})


// 读取session
router.get('/getsession', ctx => {
    ctx.body = ctx.session.skey1 + ctx.session.uname
})

// 删除session
router.get('/delsession',ctx=>{
    ctx.session = null
})




//////////////////////////////////////////////////////////////////////

// 404页面
app.use(async (ctx, next) => {

    // 等下一个中间件执行完
    await next()

    try {
        if (!ctx.body) {
            ctx.body = '404'
        }
    } catch (e) {
        ctx.body = "500 SERVE ERROR"
        console.log(e)
    }

})




////////////////////////////////////////////////////////////////////////////////
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
