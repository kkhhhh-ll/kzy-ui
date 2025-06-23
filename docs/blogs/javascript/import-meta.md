import.meta 是 JavaScript 模块系统中的一个特殊对象，旨在为模块提供一个统一的、标准化的方式来访问模块自身的上下文信息。
**import.meta 只能在 ES 模块（使用 import/export 语法的模块）中使用，不能在 CommonJS 模块或普通脚本中使用。**

## import.meta.url

返回当前模块的 URL 路径。这个路径可以帮助模块确定自己在文件系统或者网络中的位置。<br>
在 Node.js 中，import.meta.url 返回的总是本地路径，即 file: URL 协议的字符串，如 file:///home/user/foo.js。

## import.meta.env（在构建工具中常见）

import.meta.env 通常用来访问环境变量。<br>
可以通过 import.meta.env.DEV 判断是否在开发环境下运行，或通过 import.meta.env.VITE_API_URL 读取自定义环境变量的值。

## import.meta.glob（在构建工具中常见）

用于动态导入多个模块。<br>
import.meta.glob('./modules/\*.js') 可以匹配当前目录下以 .js 结尾的所有模块，并返回一个包含匹配模块键值对的对象。
