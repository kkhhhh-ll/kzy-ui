## 构建流程

1、安装 pnpm<br>

```
npm install pnpm -g
```

2、pnpm init，生成 package.json 文件，type 声明 module。<br>

```
pnpm init

```

3、建立.npmrc 文件，设置 shamefully-hoist=true，拍平安装的依赖。<br>

```
//.npmrc
shamefully-hoist=true

```

4、在根目录中建立 packages 文件夹，指定管理项目中模块或包的目录。<br>
5、在 packages 文件夹中建立 reactivity 和 shared 文件夹，并分别设置 src>index.ts+package.json 文件。<br>

```
// 将本地shared包安装到reactivity中
pnpm install @vue/shared --workspace --filter @vue/reactivity
```

![An image](/blog-vue3-m-p-s-p.png)
6、建立 pnpm-workspace.yaml 文件。<br>

```
packages:
     --"packages/*"
```

7、安装相关依赖。(开发依赖且放置在根目录)<br>

```
pnpm install typescript esbuild minimist -D -w
```

8、生成 tsconfig.json 文件。<br>

```
npx tsc --init
```

9、在根目录下建立 scripts 文件夹。<br>
10、建立 dev.js 文件。<br>

```
// 解析命令行参数
import minimist from "minimist";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
// esm支持require
import { createRequire } from "module";
// node中的命令行参数通过process.argv获取
const args = minimist(process.argv.slice(2));
const __filename = fileURLToPath(import.meta.url); //获取文件的绝对路径，包含当前文件名，如dev.js
const __dirname = dirname(__filename);//获取文件的绝对路径，不包含当前文件名
const target = args._[0] || "reactivity"; // 打包的项目
const format = args.f || "iife"; // 打包后的代码模式
//入口文件,node esm用法中没有__dirname
// resolve将多个路径片段解析为一个绝对路径，可处理其中的 .（当前目录）和 ..（上级目录）等符号
const entry = resolve(__dirname, `../packages/${target}/src/index.ts`);
const require = createRequire(import.meta.url);
// 获取package.json文件
const pkg = require(`../packages/${target}/package.json`);
// 按需打包
esbuild
  .context({
    entryPoints: [entry], // 入口文件
    outfile: resolve(__dirname, `../packages/${target}/dist/${target}.js`), // 输出文件,
    bundle: true, //打包到一起
    platform: "browser", // 运行环境，浏览器
    sourcemap: true,
    format, // esm cjm iife
    globalName: pkg?.buildOptions?.name,
  })
  .then((ctx) => {
    console.log("build success");
    return ctx.watch();
  });
```

11、搭建脚本，打包 packages 下的模块，最终打包成 js 文件。在 package.json 中的 scripts 设置。<br>

```
"dev": "node scripts/dev.js reactivity -f esm"
```
