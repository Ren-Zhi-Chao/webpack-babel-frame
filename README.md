# webpack-babel-frame
webpack + babel 整合前端js模块化插件开发框架

# 结构说明
``` 
builder                 # 工程编辑
   entry.build.js       # 构建主入口文件，主要将core文件夹中文件动态编译到入口文件中
   webpack.config.js    # webpack
src                     # 工程主要文件
   core                 # 核心代码库，工程会将该文件夹中文件编译到入口文件
   utils                # 工具类文件夹
.babelrc
index.js                # 入口文件
package.json
```

# 命令
`build:index` 编译core内文件夹到index.js中  
`build:babel` 使用babel编译(当前还未实现...😁)  
`build:webpack` webpack编译打包  
`build` 编译index.js后使用webpack编译打包工程