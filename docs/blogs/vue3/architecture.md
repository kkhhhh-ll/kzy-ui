# monorepo 管理仓库

在一个项目仓库(repo)中管理多个模块或包。<br>
vue3 采用 monorepo 方式进行管理，将模块拆分到 package 目录中，作为一个个包来管理，各司其职，且职责明确。<br>

## vue3 项目结构

runtime-core 依赖 reactivity,runtime-dom 依赖 runtime-core<br>
compiler-dom 依赖 compiler-core，compiler-sfc 依赖 compiler-dom 和 compiler-core。

```
compiler-core：与平台无关的编译器核心。
compiler-dom：针对浏览器的编译模块。
compiler-sfc：针对单文件解析。
compiler-ssr：针对服务器渲染的渲染模块。
reactivity：响应式系统。
template-explorer：用于调试编译器输出的开发工具。
vue-compat：迁移构建，用于兼容vue2。
runtime-core：与平台无关的运行时核心。
runtime-dom：针对浏览器的运行时，包括DOM API，属性，事件处理等。
runtime-test：用于测试的运行时。
server-renderer：用于服务端渲染。
shared：多个包之间共享的内容。
vue：完整版本，包括运行时和编译器。
ref-transform：实验性语法，ref转化器。
size-check：用来测试代码体积。
```

## vue3 采用 ts

编译期间可做类型检查
