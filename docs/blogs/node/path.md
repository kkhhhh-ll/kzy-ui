node 的模块化语法是 CommonJS

```
const path = require('path')  // path理解为某某路径下的一个东西，node自带的
console.log(path)  // path下有很多方法，都可以和操作系统交互
```

## path.join()

将多个路径进行合并拼接，windows 操作系统是反斜杠，Mac 操作系统是斜杠进行拼接的

```
console.log(path.join('a', 'b', 'c')) // a\b\c

```

## path.resolve()

直接拼接到当前工作区(当前项目的根目录)的绝对路径

```
import path from "path";
console.log(path.resolve("a", "b")); // C:\Users\kyk\Desktop\gb\kzy-ui\a\b
```

## path.dirname()

返回路径中最终指向的路径的上一级

```
console.log(path.dirname(process.cwd())) //  C:\Users\kyk\Desktop\gb
console.log(path.dirname('a/b/c')) // a/b
```

## path.basename()

返回路径中的文件名，第二个参数为删除的后缀

```
// index.js
console.log(path.basename('a/b/c.js')) // c.js  Mac需要'/a/b/c.js'，多一个斜杠
console.log(path.basename(__filename)) // index.js
console.log(path.basename(__filename, '.js'))  // index
```

## path.extname()

获取文件的后缀或扩展名，一般上传文件限制文件格式就可以用这个方法

```
console.log(path.extname(__filename)) // .js
```

## path.normalize()

规范路径

```
console.log(path.normalize('/a/\b/c.j'))  // a\b\c.j
```

## path.parse()

解析出当前文件的根目录，文件夹绝对目录，带有后缀的文件名，扩展名以及文件名

```
import { parse } from "path";
console.log(parse("C:\\Users\\kyk\\Desktop\\gb\\kzy-ui\\src\\index.js"));
/*{
  root: 'C:\\',
  dir: 'C:\\Users\\kyk\\Desktop\\gb\\kzy-ui\\src',
  base: 'index.js',
  ext: '.js',
  name: 'index'
}*/
```

## path.isAbsolute()

判断路径是否为绝对路径

## path.sep

就是代表斜杠，不过 window 是反斜杠，这是个属性

```
console.log('foo\\bar\\baz'.split(path.sep)) // [ 'foo', 'bar', 'baz' ]
```
