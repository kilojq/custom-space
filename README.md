# custom-space
A mobile H5 framework of custom space


最近h5营销又流行起了一种通过添加拖拉摆放和组合元素，来自定义一个场景并合成图片分享出去的新H5展示形式，笔者也用操作DOM的形式做了一个类似项目，现在整合成一个简易的框架分享给大家，只需要根据自己的需要完成布局与样式的编写，以及按下面指示操作，就可以生成一个自己的空间定制H5。
<!--more-->


## 目录结构

    ├─  package.json        # 项目配置
    ├─  README.md           # 项目说明
    ├─  node_modules        # npm依赖包
    ├─  webpack.config.js   # webpack配置文件
    ├─  .babelrc            # babel配置
    │
    │
    ├─  src                 # 前端代码
    │    │
    │    ├─ App.js               #  项目入口文件
    │    ├─ index.html           #  首页
    │    ├─ data.js              #  图片数据文件，由build-data-json.js生成
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

生成图片data.js图片数据文件：
```
npm run build-json
```

生成打包文件：
```
npm run build
```

app running at http://localhost:9000/：
注：运行第一次运行项目或是img文件夹里面的文件有变动时，运行 npm start 命令前需要先运行 npm run build-json 或 npm run build 命令，先生成或更新data.js文件
```
npm start
```

## 说明

项目由于需要按一定格式自动生成图片json数据，用于项目预加载以及图片拖拽元素的遍历生成，而webpack打包图片会打包处理文件，改变图片的目录结构，没法满足这一要求，所以我自己封装了方法来实现这个功能，即utils/build-data-json.js，可通过执行`npm run build-json`命令来实现。

这里图片预加载和页面中拖拽元素的图片引用的路径，都交给node去生成，要注意的是图片文件的放置要按要求来，页面UI界面相关的图片请统一放在 img/ 文件夹的根目录下，而选项图片请分类放在不同文件夹中，并将这些分类文件夹放在 img/Assest 目录里。这样项目运行时会根据分类文件夹，以文件夹名自动生成对于的元素菜单选项，如下图:


![配图1](/screenshot/img1.jpg "配图1")

如果要修改选项名，可通过配置入口文件 srv/App.js 的 App.init() 的 tabBtnNames 选项来实现，详见初始化配置部分。


效果:

 ![配图2](/screenshot/img2.jpg "配图2")

## 初始化配置

暂时只有选项名一项配置，后续将逐步更新其他的功能和配置选项，如果背景更换，元素是否可旋转，缩放等等功能。
```
var config = {
    tabBtnNames: {
        "Furniture": "家具",
        "Kid": "人物",
        "Cat": "猫",
        "Dog": "狗",
    }
}
App.init(config)
```

## 截图

 ![配图3](/screenshot/img3.jpg "配图3")


## 最后

项目案例中的图片借用了相关H5的图片，未做商用，若相关版权方觉得构成侵权，请联系我(QQ: 418291886)，可立马删除。本案例有些简陋，仅供学习参考。