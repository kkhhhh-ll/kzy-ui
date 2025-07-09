fs 模块提供了访问和操作文件系统的功能

## readFile

异步读取文件内容

```
import {readFile} from 'node:fs'

fs.readFile('./test.txt','utf8',(err,data)=> {
    if(error) throw error
    console.log(data)
})
```

## readFileSync

同步读取文件内容

```
import {readFileSync} from 'node:fs'

const res = fs.readFileSync('./test.txt','utf8')
console.log(res)
```

## writeFile

异步写入文件。注意：会覆盖原有内容

```
import {writeFile} from 'node:fs'

fs.writeFile('./test.txt','hhhh','utf8',(err)=> {
    if(error) throw error
    console.log('成功写入')
})
```

## writeFileSync

同步写入文件。

```
import {writeFileSync} from 'node:fs'

fs.writeFileSync('./test.txt','hhhh','utf8')
console.log('成功写入')
```

## appendFile

异步追加写入文件。注意：在原有文件的最后写入内容

```
import {appendFile} from 'node:fs'

fs.appendFile('./test.txt','hhhh','utf8',(err)=> {
    if(err) throw err
    console.log('成功！')
})
```

## existsSync

异步检查文件是否存在

```
import {existsSync} from 'node:fs'
if (fs.existsSync("example.txt")) {
  console.log("文件存在");
} else {
  console.log("文件不存在");
}
```

## unlink

删除文件

```
import {unlink} from 'node:fs'
fs.unlink("example.txt", (err) => {
  if (err) throw err; //失败 err 为错误信息 ，成功 err 为 null
  console.log("文件已删除");
});

```
