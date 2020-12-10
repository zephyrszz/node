const { log } = require("console");

// 引入模块
const Koa = require("koa"),
    router = require("koa-router")(),
    render = require('koa-art-template'),
    path = require('path'),
    koaBody = require('koa-body')
    fs = require('fs')
    static = require('koa-static')

// 实例化对象
const app = new Koa();

///////////////////////////////////////////////////////////////////////////////////////////
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

 //  静态资源
 app.use(static('static'))  //'static' :所有静态资源存放路径

////////////////////////////////////////////////////////////////////////////////////////////////////

// 根路径
let root = __dirname

router.get('/', ctx => {
    // 检查是目录还是文件
    let dst = 'views'


    // 异步
    // fs.stat(dst, (err, stats) => {

    //     if (err) {
    //         console.log(err)
    //     } else {
    //         if (stats.isFile()) {
    //             console.log('是文件')
    //         }
    //         if (stats.isDirectory()) {
    //             console.log('是目录')
    //         }
    //     }

    // })
    // 同步
    let stats = fs.statSync(dst)

    try {
        if (stats.isDirectory()) {
            console.log('是目录Sync')
        }
        if (stats.isFile()) {
            console.log('是文件Sync')
        }
    } catch (err) {
        console.log(err)
    }


    // 2判断文件，目录是否存在

    let dst2 = root + '/app.js'

    // 同步
    let res2 = fs.existsSync(dst2)
    try{
        if(res2){
            console.log('存在');
        }else{
            console.log('不存在');
        }
    }catch(err){
        console.log(err);
    }


    // 3 创建目录

    let dst3 = 'test2'
    // 同步
    let res3 = fs.existsSync(dst3)
    try{
        if(!res3){
            fs.mkdirSync(dst3)
        }else{
            console.log('目录已存在');
        }

    }catch(err){
        console.log(err);
    }
    
    // 4 删除目录

    let dst4 =root + '/test3'

    // 同步
    // try{
    //     let res4 = fs.existsSync(dst4)
    //     if(res4){
    //         fs.rmdirSync(dst4)
    //     }else{
    //         console.log('目录不存在');
    //     }
    // }catch(err){
    //     console.log(err);
    // }

    // 异步
    // fs.rmdir(dst4,(err)=>{
    //     if(err){
    //         console.log(err);
    //     }else{
    //         console.log("目录已删除")
    //     }
    // })



    // 5读取目录
    let dst5 = root + '/static'
    // 异步
    // fs.readdir(dst5,(err,files)=>{
    //     if(err){
    //         console.log(err);
    //     }else{
    //         console.log(files);
    //     }
    // })

    // 递归读取所有的目录或文件
    function read(dir){
        // 判断是否存在
        let isExist = fs.existsSync(dir)

        // 如果存在则判断
        if(isExist){
            // 判断是文件还是目录
            let stats = fs.statSync(dir)

            // 目录
            if(stats.isDirectory()){
                // 当前目录
                console.log(dir);
                // 读取目录
                let list = fs.readdirSync(dir)
                console.log(list);

                // 有子文件
                if(list.length>0){
                    
                    for(let i = 0;i<list.length;i++){
                        // 当前文件地址
                        let curDir = dir+ '/' +list[i]  

                        // 递归
                        read(curDir)
                    }
                }else{
                    console.log(dir);
                }
            }else{
                // 文件则打印
                console.log(dir);
            }
        }else{
            console.log('文件不存在！');
        }
    }

    // read(dst5)



    // 6. 创建文件
    let dst6 = root + '/static/test.txt'
    fs.writeFile(dst6,'',(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log('文件创建成功！');
        }
    })

    // 7.向文件中写入内容，文件不存在，则创建
    let dst7 = root + '/static/test2.html'

    fs.writeFile(dst7,'<div>内容</div>',(err)=>{
        if(err){
            console.log(err);
        }
    })


    // 8.追加内容到文件，如果文件不存在，则创建文件

    let dst8 = root + '/static/test3.html'

    fs.appendFile(dst8,'<p>水电费</p> \n',(err)=>{
        if(err){
            console.log(err);
        }
    })


    // 9.读取文件内容
    let dst9 = root + '/views/index.html'

    // 异步
    fs.readFile(dst9,'utf-8',(err,data)=>{
        if(err){
            console.log(err);
        }else{
            console.log(data);
        }
    })
    // 同步
    let res9 = fs.readFileSync(dst9,'utf-8')
    console.log(res9);



    // 10.文件删除
    let dst10 = root + '/static/test.txt'

    let is_ = fs.existsSync(dst10)

    if(is_){
        fs.unlink(dst10,(err)=>{
            if(err){
                log(err)
            }
        })
    }

    // 11.文件的拷贝   管道流

    let dst11 = root + '/views/index.html'

    let dst11_ = root + '/static/index_.html'

    // 创建可读流
    let readStream = fs.createReadStream(dst11)

    // 创建可写入流
    let writeStream = fs.createWriteStream(dst11_)

    // 管道流
    let res11 = readStream.pipe(writeStream)

    if(res11){
        console.log('文件已拷贝');
    }









})

/////////////////////////////////////////////// 
// 文章上架
router.get('/add',ctx=>{

    ctx.render('artice-add')

})


// 执行文章上传
router.post('/addDo',ctx=>{
    // 接收表单数据
    let formData = ctx.request.body

    console.log(formData);
    // 接收文件域
    let photo = ctx.request.files.photo


    // 上传文件

    // 创建上传目录
    let dstDir = root + '/static/upload'
    let isExist = fs.existsSync(dstDir)
    if(!isExist){
        fs.mkdirSync(dstDir)
    }
    // 上传文件地址
    let dstFile = dstDir + '/' + photo.name

    // 写入流
    let writeStream = fs.createWriteStream(dstFile)

    // 可读流
    let readStream = fs.createReadStream(photo.path)

    // 管道流
    readStream.pipe(writeStream)

    // 创建产品页面目录
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()+1
    let day = date.getDate()

    let dstHtmlDir = root + '/a/' + year + '-' + month + '-' + day
    
    let dstHtmlDir_is = fs.existsSync(dstHtmlDir)
    if(!dstHtmlDir_is){
        fs.mkdirSync(dstHtmlDir)
    }

    // 读取模板
    let moduleFile = fs.readFileSync(root + '/templates/detail.html','utf-8')

    // 替换占位符
    moduleFile = moduleFile.replace(/#title#/g,formData.tt)
    moduleFile = moduleFile.replace('#descript#',formData.descript)
    moduleFile = moduleFile.replace('#img#','upload/'+photo.name)


    // 创建新文件
    let newFileName = date.getTime() + '.html'
    let newFileDir = dstHtmlDir + '/' + newFileName

    fs.writeFileSync(newFileDir,moduleFile)

    console.log(moduleFile);

})



//////////////////////////////////////////////////////////////////////////////////////////////////////

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
