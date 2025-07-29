## 浏览器加载

浏览器通过script标签加载js代码

```
<!-- 页面内嵌的脚本 -->
<script type="application/javascript">
  // module code
</script>
<!-- 外部脚本 -->
<script type="application/javascript" src="path/to/myModule.js">
</script>
```

默认情况下，浏览器是同步加载 JavaScript 脚本，即渲染引擎遇到script标签就会停下来，等到执行完脚本，再继续向下渲染。如果是外部脚本，还必须加入脚本下载的时间。

## 浏览器加载ES6模块

浏览器加载 ES6 模块，也使用script标签，但是要加入type="module"属性。

```
<script type="module" src="./foo.js"></script>
```

浏览器对于带有type="module"的script，都是异步加载，不会造成堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开<script标签的defer属性。

## ES6与CommomJs模块差异
1、cjs输出的值的拷贝，esm输出的是值的引用；<br>
2、cjs运行时加载，esm是编译时输出接口。<br>
CommonJS 模块输出的是值的拷贝，一旦输出一个值，模块内部的变化就影响不到这个值。<br>
JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。

## Node.js加载
Node.js 要求 ES6 模块采用.mjs后缀文件名。也就是说，只要脚本文件里面使用import或者export命令，那么就必须采用.mjs后缀名。Node.js 遇到.mjs文件，就认为它是 ES6 模块，默认启用严格模式，不必在每个模块文件顶部指定"use strict"。<br>
.mjs文件总是以 ES6 模块加载，.cjs文件总是以 CommonJS 模块加载，.js文件的加载取决于package.json里面type字段的设置。<br>

### main
package.json文件有两个字段可以指定模块的入口文件：main和exports。比较简单的模块，可以只使用main字段，指定模块加载的入口文件。
```
// ./node_modules/es-module-package/package.json
{
  "type": "module",
  "main": "./src/index.js"
}
```
### exports
优先级高于main字段。
#### 子目录别名
package.json文件的exports字段可以指定脚本或子目录的别名。
```
// ./node_modules/es-module-package/package.json
{
  "exports": {
    "./submodule": "./src/submodule.js"
  }
}
// 代码指定src/submodule.js别名为submodule，然后就可以从别名加载这个文件。
```
#### main 的别名
exports字段的别名如果是.，就代表模块的主入口，优先级高于main字段，并且可以直接简写成exports字段的值。
```
{
  "exports": {
    ".": "./main.js"
  }
}
// 等同于
{
  "exports": "./main.js"
}
```
#### 条件加载
利用.这个别名，可以为 ES6 模块和 CommonJS 指定不同的入口。目前，这个功能需要在 Node.js 运行的时候，打开--experimental-conditional-exports标志。
```
{
  "type": "module",
  "exports": {
    ".": {
      "require": "./main.cjs",
      "default": "./main.js"
    }
  }
}

// 简写
{
  "exports": {
    "require": "./main.cjs",
    "default": "./main.js"
  }
}
```
### ES6加载CommonJs
ES6 模块通过Node内置的module.createRequire()方法加载 CommonJS 模块
```
// cjs.cjs
module.exports = 'cjs';
// esm.mjs
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const cjs = require('./cjs.cjs');
cjs === 'cjs'; // true
```
### CommonJS 模块加载 ES6 模块
CommonJS 的require命令不能加载 ES6 模块，会报错，只能使用import()这个方法加载。
```
(async () => {
  await import('./my-app.mjs');
})();
```