## global

node 中的 global 就相当于浏览器的 window

## \_\_filename

当前文件的绝对路径，只在 CommonJS 语法才有

## \_\_dirname

当前文件夹的绝对路径，只在 CommonJS 语法才有

```
// dev.js
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url); //包含当前文件名，如dev.js
const __dirname = dirname(__filename); //不包含当前文件名
```
