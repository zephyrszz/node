// 引入模块
const Koa = require("koa"),
      router = require("koa-router")(),
      path = require('path')
      render =require('koa-art-template')
    

// 实例化对象
const app = new Koa();

///////////////////////////////////////
// 配置
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
  });




//////////////////////////////////////////////////////////////////
 
// 网站总首页
router.get('/',ctx=>{
    ctx.body="网站总首页"
})

router.get('/template',ctx=>{

    // 模板数据
    let data ={
        title:'标题',
        opts:{
            'key1':'value1',
            'key2':'value2'
        },
        descript:'<p><h4>描述</h4></p>',
        age:70,
        arr:['readding','writing',200],
    }
    let header = {'title':'tt'}

    // 渲染模板
    ctx.render('index',{...data,header})
})



//////////////////////////////////////////////////////////////////

// 配置路由
app.use(router.routes()).use(router.allowedMethods);


// 开启服务器监听
app.listen(2020, () => {
    console.log("服务器运行在localhost:2020");
});
