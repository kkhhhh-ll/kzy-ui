## 前言

通常项目根目录存有.npmrc文件，这是npm,yarn或pnpm包管理工具配置文件。<br>

通过包管理工具可以对项目进行依赖安装和维护，同时可以根据package.json文件中的script设置项目不同生命周期所需指令。

## 终端命令执行的流程

### 命令解析器

解析用户输入命令，调用相关程序。

```
常见命令解析器：
windows:cmd
linux:bash
unix:shell
powershell:跨平台任务自动化和配置管理框架
```

### 命令执行流程

```
// 判断命令路径
若存在命令路径，直接执行路径下的指令文件
// 判断内部指令还是外部命令
内部指令，存在于内存中，例如ls,cd。
外部指令，存在于磁盘，读入内存执行
// 在PATH系统环境变量查找
// 其他，报错
```

## Node的安装和执行

在node官网，下载相关版本的集成版，安装成功后，会自动在系统环境变量PATH中配置node安装的目录文件，当执行node -v时，就会找到node的目录文件并执行指令。

## npm run ...发生了啥

### 安装npm指令

在安装node环境时，通过集成包安装时，不仅默认安装了node指令，还默认安装了npm指令。

### 全局命令和局部命令

以typescript为例，全局安装

```
npm i typescript -g
```

执行以上命令后，会获得一个全局命令tsc，该命令文件同样存储在node指令目录下。<br>

```
tsc -v
```

局部安装

```
npm i typescript -D
```

执行以上命令后，会在项目node_modules下的.bin文件夹中发现增加的三个文件。<br>
此时,查看typescript的版本的方式为

```
./node_modules/.bin/tsc -v
```

也可以直接使用npx tsc -v执行，npx默认会执行node_modules/.bin文件下的指令。

### npm scripts的本质

npm run时会创建一个shell脚本，package.json文件中scripts自定义的脚本内容在此shell脚本中运行。<br>
我们通常全局安装一个命令工具，那么我们就可以直接在命令终端输入对应的命令名称就可以执行了，但如果是项目中安装，那么就要通过 package.json 文件的 scripts 选项配置脚本命令来执行

### 小结

首先是 npm scripts 本质是一个 Shell 脚本，原理就是执行 npm run 的时候会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令，同时会把当前目录下的 node_modules/.bin 目录路径添加到系统环境变量 PATH 中，这样 Shell 脚本的命令解析器就可以查找当前目录中的 node_modules/.bin 目录中的命令了，执行结束后，再将 PATH 变量恢复原样 。然后再通过命令执行对应的应用程序，然后输出结果。<br>
重点：Shell 在寻找命令的时候是按照系统环境变量 PATH 中配置的目录去查找的，如果找到了就执行对应的命令，若找不到就报错。
