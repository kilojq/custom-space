/*
 * 自动复制移动图片文件，同时生成图片数据Json
 */
const path = require('path');
const fs = require('fs');
const images = require("images");//node.js轻量级跨平台图像编解码库
const stat = fs.statSync;
const staticImgPath = './src/img';
const distPath = './dist/img';
var obj = {
    _res: []
};
// console.log(images('src/img/Assest/Furniture/01.png').width())
var copy = function(src, dst){
    let dirDevide = path.parse(src).name;
    
    var bool = (dirDevide != 'Assest' && path.parse(src).dir.indexOf("Assest") != -1);
    // console.log(path.parse(src))
    if(bool){
        obj[dirDevide] = [];
    }
    //读取目录
    var paths = fs.readdirSync(src);
    paths.forEach(function(pth, index){
        var _src = src + '/' + pth;
        var _dst = dst + '/' + pth;
        var readable;
        var writable;
        var st = stat(_src);
        
        if(st.isFile()){
            readable = fs.createReadStream(_src);//创建读取流
            writable = fs.createWriteStream(_dst);//创建写入流
            readable.pipe(writable);
            // console.log(_src.substr(2))
            if(bool){
                var img = images(_src.substr(2))
                // console.log(path.parse(_src))
                var item = {
                    // id: index,
                    url: _src.substr(6),
                    width: img.width(),
                    height: img.height()
                };
                obj[dirDevide].push(item)
            }
            obj["_res"].push(_src.substr(6))
        }else if(st.isDirectory()){
            exists(_src, _dst, copy);
        }
    })
}

function exists(src, dst, callback){
    let exists = fs.existsSync('dist');
    if(!exists) {
        fs.mkdirSync('dist');
    }
    mkdirs(dst)
    callback(src, dst);
}
function mkdirs(dirpath, callback) {
    //检测某个路径下的文件是否存在
    let exists = fs.existsSync(dirpath);
    if(exists) {
        callback && callback();
    } else {
        //尝试创建父目录，然后再创建当前目录
        mkdirs(path.dirname(dirpath), function(){
            fs.mkdirSync(dirpath);
        });
    }
};
exists(staticImgPath, distPath, copy);


var copyTo = './dist/data.js';
var data = 'export default '+ JSON.stringify(obj);
// var data = 'var DATA = '+ JSON.stringify(obj);
fs.writeFile('./src/data.js', data,  function(err) {
    if (err) {
        return console.error(err);
    }
    console.log("src数据写入成功！");
})
if(process.env.NODE_ENV === 'production'){
    fs.writeFile(copyTo, data, function(err) {
        if (err) {
            return console.error(err);
        }
        console.log("dist数据写入成功！");
    });
}