进程，里面包含许多属性

## process.argv

获取你输入的指令

```
// index.js
// 命令行执行 node index.js 'hhh'
console.log(process.argv)

/*[
  'D:\\nvm\\node.js\\node.exe',
  'C:\\Users\\kyk\\Desktop\\gb\\kzy-ui\\index.js',
  'hhh'
]*/

```

输出结果中第一个是 node 的路径，第二个是当前脚本的绝对路径，第三个才是输入的指令。当然你可以以空格的方式输入更多的指令，他都会给你输出出来。所以我们可以通过这个指令获取用户在终端输入的值。

## process.cwd()

获取当前工作目录的绝对路径，所谓工作目录就是当前项目的根目录。

```
console.log(process.cwd()); // C:\Users\kyk\Desktop\gb\kzy-ui
```

## process.env

获取相关变量

## process.pid

代表进程的 id // 4456

## process.platform

读取当前的操作系统 // win32

## process.arch

读取 cpu // x64

## process.stdout

标准的输出流，可以进行数据的写入

## process.stdin

读取输入的数据流，你可以用这个监听一个 data 事件，获取用户输入的内容

```
process.stdout.write('您多大了呀：') // 脚手架问题展现给用户
// 回答脚手架问题
process.stdin.on('data', (data) => {
    console.log(`用户输入了： ${data}`)
})
```
