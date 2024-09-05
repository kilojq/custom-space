# custom-space
A mobile H5 framework of custom space
___________

最近h5营销又流行起了一种通过添加拖拉摆放和组合元素，来自定义一个场景并合成图片分享出去的新H5展示形式，笔者也用操作DOM的形式做了一个类似项目，现在整合成一个简易的框架分享给大家，只需要根据自己的需要完成布局与样式的编写，以及按下面指示操作，就可以生成一个自己的空间定制H5。
<!--more-->


## 目录结构

    ├─  package.json        # 项目配置
    ├─  README.md           # 项目说明
    ├─  node_modules        # npm依赖包
    ├─  webpack.base.js     # webpack配置文件
    ├─  webpack.dev.js      # webpack配置文件
    ├─  webpack.prov.js     # webpack配置文件
    ├─  server.js           # node服务
    ├─  config.js           # 配置项目资源基础路径
    ├─  .babelrc            # babel配置
    │
    │
    ├─  src                 # 前端代码
    │    │
    │    ├─ App.js               #  项目入口文件
    │    ├─ index.html           #  首页
    │    ├─ data.js              #  图片数据文件，由build-data-json.js生成，运行`npm run dev`或`npm run build`、`npm run build-json:prov`等命令即生成
    │    ├─ css                  #  样式文件夹
    │    ├─ js                   #  脚本文件夹
    │    ├─ media                #  背景音乐文件夹 
    │    └─ img                  #  图片文件夹
    │
    │
    ├─  utils               # 工具文件
    │    │
    │    └─ build-data-json.js   # 用于自动生成图片数据文件，并复制打包图片
    │    
    │
    └  Demo                 # 案例文件


## 运行

安装依赖模块：
```
npm install
```

预览Demo示例：
```
node server.js
```

生成图片data.js图片数据文件：
```
npm run build-json:dev    # 开发环境
npm run build-json:prov   # 生产环境
```

生成打包文件：
```
npm run build
```

开发环境启动本地服务：
```
npm start / npm run dev
```

## 说明

项目由于需要按一定格式自动生成图片json数据，用于项目预加载以及图片拖拽元素的遍历生成，而webpack打包图片会打包处理文件，改变图片的目录结构，没法满足这一要求，所以我自己封装了方法来实现这个功能，即utils/build-data-json.js，可通过执行`npm run build-json`命令来实现。(直到目前尚未找到相关的webpack plugin可以实现这一功能需求的，如果有知悉哪个插件可以实现的，还望不吝告之，非常感谢！！！)

这里图片预加载和页面中拖拽元素的图片引用的路径，都交给node去生成，要注意的是图片文件的放置要按要求来，页面UI界面相关的图片请统一放在 img/ 文件夹的根目录下，而选项图片请分类放在不同文件夹中，并将这些分类文件夹放在 img/Assest 目录里。这样项目运行时会根据分类文件夹，以文件夹名自动生成对于的元素菜单选项，如下图:


![配图1](/screenshot/img1.jpg "配图1")

如果要修改选项名，可通过配置入口文件 srv/App.js 的 App.init() 的 tabBtnNames 选项来实现，详见初始化配置部分。


效果:

 ![配图2](/screenshot/img2.jpg "配图2")

## 初始化配置


```
// App.js
const config = {
    tabBtnNames: { // 配置选项名
        "background": "背景”,
        "Furniture": "家具",
        "Kid": "人物",
        "Cat": "猫",
        "Dog": "狗",
    },
    backgroundSetable: true, // 是否开启背景设置, 默认值为false
    backgroundGroupName: 'background', // 指定背景图片的目录名, 默认值为'background'
    rotatable: true, // 元素是否可旋转, 默认值为true
    scalable: true // 元素是否可缩放, 默认值为true
}
App.init(config)
```

## 截图

 ![配图3](/screenshot/img3.jpg "配图3")
