# gulp-vue2js 

## 项目描述

* 诞生场景：在不使用webpack下使用vue单文件
* 支持异步路由页面，异步加载子组件
* 兼容：标准.vue写法,便于以后有需要时,直接移至webpack模式下使用
* ...


## 安装使用

#### 安装工具：gulp-vue2js

全局安装：

    npm install gulp-vue2js -g
局部安装：( 工作目录下运行 )

    npm install gulp-vue2js


#### 工具命令

* 文件转译：( 运行后,将会监听_component目录，并把转译同步至component下 )

      vue2js .\vue_js\_component\ .\vue_js\component\
* 组件整合：( 运行后,将会监听component目录，并把该目录下的所有js整合至指定文件allCom.js )

      js2pack .\vue_js\component\ .\vue_js\component\package\allCom.js

* PS：局部安装工具需要改为 `.\node_modules\.bin\vue2js` 运行命令

* 浏览器配合安装 LiveReload插件 可以实现自动刷新页面[chrome](https://addons.mozilla.org/zh-CN/firefox/addon/livereload-web-extension/?src=search) [firefox](https://addons.mozilla.org/zh-CN/firefox/addon/livereload-web-extension/)


## 转译 .vue 至 .js 规则

* vue格式模板

      <template>
        ${template}
      </template>

      <script>
        ${import}
        ${localVar}
        export default {
          ${vueExtend}
        }
      </script>

      <style scoped>
        ${style}
      </style>

* 在页面组件中引入子组件 ${import}

        // 方式1：直接使用子组件
        import Backbtn from './Component/Backbtn.js';

        //方式2：使用组件包
        import {Backbtn} from './Component/pack/allCom.js';
        
* scoped标志，设置页面组件独立样式，此样式只作用于当前页面组件


## 组件应用

#### 1. 页面中需引入 vue-loader.js (用于异步加载组件，文件可从lib下获取)

    <script src="../lib/vue-loader.js"></script>

#### 2. Function API
`setComMainf({comName:comUrl})` 配置组件文件路径

_comName_ : String

_comUrl_ : String

    setComMainf({
      Main: './Component/page/Main.js',
      About: './Component/page/About.js',
      allCom: './Component/pack/allCom.js',
    })

`loadRouterCom(comName)` 使用路由页面异步组件

_comName_ : String

    new VueRouter({
      routes: [
        { path: '/', component: loadRouterCom('Main') },
        { path: '/About', component: loadRouterCom('About') }
      ]
    })

`loadChildCom(comName)` 使用子异步组件

_comName_ : String

    // 使用组件包中的组件 'allCom.Footer'
    components: { 'v-footer': loadChildCom('allCom.Footer') },

    // 直接使用组件 'Footer'
    components: { 'v-footer': loadChildCom('Footer') },


## 更新日志 ##
* v1.0.9
  * 单页面路由组件支持使用组件包
  * 更新demo用例
