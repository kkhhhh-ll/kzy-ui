// 新建文件
import { join, dirname } from "path";
import { readdirSync, writeFileSync } from 'fs'
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url); //获取文件的绝对路径，包含当前文件名
const __dirname = dirname(__filename);//获取文件的绝对路径，不包含当前文件名
const coms = join(__dirname, '/src/components') // 组件文件地址
const total = join(__dirname, '/src/index.ts') // 全局文件
const fileList = readdirSync(coms) // @/src/components下所有的文件名
let multi = ['Collapse']
let extra = ['CollapseItem']
function generateCode(fileName) {
    const template = `
import type { App } from 'vue'
import ${fileName} from './${fileName}.vue'

${fileName}.install = (app: App) => {
  app.component(${fileName}.name!, ${fileName})
}
export default ${fileName}
export * from './types'
`
    return template
}
function generateMultiCode(fileName) {
    let nameList = fileName.map(item => item.replace('.vue', ''))
    let t1 = `import type { App } from 'vue'`
    let t2 = ``
    for (let i = 0; i < 2; i++) {
        if (i === 0) {
            nameList.forEach(it => {
                t2 += `
import ${it} from './${it}.vue' 
`
            })
        } else if (i === 1) {
            nameList.forEach(it => {
                t2 += `${it}.install = (app: App) => {
  app.component(${it}.name!, ${it})
}\n`
            })
        }
    }

    let t3 = ''
    nameList.forEach((it, index) => {
        if (index === 0) {
            t3 += `
export default ${it}
`

        } else {
            t3 += `
export {
${it}
}
`
        }
    })
    let t4 = `export * from './types'`
    let template = t1 + t2 + t3 + t4

    return template
}
function judgeDir(dir) {
    const files = readdirSync(dir)
    const len = files.filter(item => /vue/.test(item))
    return len
}
function generateFile(path, name, vueFile) {
    // 因单个vue文件的的文件夹较多，在此做优化
    if (vueFile.length === 1) {
        writeFileSync(path, generateCode(name), (error) => {
            console.log(error)
        })
    } else {
        writeFileSync(path, generateMultiCode(vueFile), (error) => {
            console.log(error)
        })
    }

}
function generate(fileList) {
    if (!fileList.length) retrun
    fileList.forEach((item) => {
        // 有的组件不止有一个vue文件，例如collapse collapseItem
        const dir = join(coms, `/${item}`)
        const vueFile = judgeDir(dir)
        const path = join(coms, `/${item}/index.ts`)
        generateFile(path, item, vueFile)
    })
}

generate(fileList)
function totalGen() {
    let t1 = `
    import type { App } from 'vue'\n
    import { library } from '@fortawesome/fontawesome-svg-core'\n
import { fas } from '@fortawesome/free-solid-svg-icons'\n
    `
    let t2 = ''
    fileList.forEach((item) => {
        if (multi.includes(item)) {
            t2 += `import ${item}, { ${item}Item } from '@/components/${item}'\n`
        } else {
            t2 += `import ${item} from '@/components/${item}'\n`
        }
    })
    let t3 = `
    import '@/styles/index.scss'\n
    library.add(fas)
    `
    let t4 = `
    const components = [
    ${fileList},
    ${extra}
    ]
    `
    let t5 = `
    const install = (app: App) => {
  components.forEach((compoment) => {
    app.component(compoment.name!, compoment)
  })
}\n
    export {
  ${fileList},
    ${extra}
}\n
export default {
  install
}
    `
    let template = t1 + t2 + t3 + t4 + t5
    writeFileSync(total, template, (error) => {
        console.log(error)
    })
}
totalGen()