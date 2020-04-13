# webpack-babel-frame
webpack + babel 整合前端js模块化插件开发框架

# 结构说明
``` 
builder                 # 工程编辑
   .entryignore         # `entry.build.js`中构建时忽略文件配置
   entry.build.js       # 构建主入口文件，主要将`core`文件夹中文件动态编译到入口文件中
   test.build.js        # 构建测试脚本
   webpack.config.js    # webpack
src                     # 工程主要文件
   core                 # 核心代码库，工程会将该文件夹中文件编译到入口文件(如果想要修改该文件夹名称，在`entry.build.js`中修改)
.babelrc
package.json
```

# package.json

1. `main` 工程打包输出地址

2. `entry` 入口编译文件配置

3. `scripts` 脚本
   - `build:test` 构建测试脚本文件
   - `test` 运行测试脚本
   - `build:entry` 编译core内文件夹到入口文件中  
   - `build:webpack` webpack编译打包  
   - `build` build:entry + build:webpack
   - `init` build + build:test