#!/usr/bin/env node
import { join, dirname } from "path";
import { readdirSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from "url";

// 常量定义
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const COMPONENTS_DIR = join(__dirname, '/src/components');
const ENTRY_FILE = join(__dirname, '/src/index.ts');
const MULTI_COMPONENTS = ['Collapse']; // 多文件组件
const EXTRA_COMPONENTS = ['CollapseItem']; // 额外导出组件

// 工具函数
const getVueFiles = (dir) => {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter(file => file.endsWith('.vue'));
};

const generateSingleComponentCode = (componentName) => {
  return `
import type { App } from 'vue'
import ${componentName} from './${componentName}.vue'

${componentName}.install = (app: App) => {
  app.component(${componentName}.name!, ${componentName})
}

export default ${componentName}
export * from './types'
`.trim();
};

const generateMultiComponentCode = (vueFiles) => {
  const componentNames = vueFiles.map(file => file.replace('.vue', ''));

  const imports = componentNames.map(name =>
    `import ${name} from './${name}.vue'`
  ).join('\n');

  const installs = componentNames.map(name =>
    `${name}.install = (app: App) => {
  app.component(${name}.name!, ${name})
}`
  ).join('\n\n');

  const exports = componentNames.map((name, index) => {
    if (index === 0) {
      return `export default ${name}`;
    } else {
      return `export { ${name} }`;
    }
  }).join('\n');

  return `
import type { App } from 'vue'

${imports}

${installs}

${exports}
export * from './types'
`.trim();
};

const generateComponentFile = (componentInfo) => {
  const { dir, name, vueFiles } = componentInfo;
  const indexPath = join(dir, 'index.ts');

  if (vueFiles.length === 0) {
    console.warn(`⚠️ No Vue files found in ${dir}`);
    return;
  }

  const code = vueFiles.length === 1
    ? generateSingleComponentCode(name)
    : generateMultiComponentCode(vueFiles);

  try {
    writeFileSync(indexPath, code);
    console.log(`✅ Generated index.ts for ${name}`);
  } catch (error) {
    console.error(`❌ Failed to generate index.ts for ${name}:`, error);
  }
};

const generateComponents = () => {
  if (!existsSync(COMPONENTS_DIR)) {
    console.error(`❌ Components directory not found: ${COMPONENTS_DIR}`);
    return [];
  }
  // 目录名称
  const componentDirs = readdirSync(COMPONENTS_DIR);
  const componentInfos = [];

  componentDirs.forEach(dirName => {
    // 目录路径
    const dirPath = join(COMPONENTS_DIR, dirName);
    const vueFiles = getVueFiles(dirPath);

    componentInfos.push({
      name: dirName,
      dir: dirPath,
      vueFiles
    });

    generateComponentFile(componentInfos[componentInfos.length - 1]);
  });

  return componentInfos;
};

const generateEntryFile = (componentInfos) => {
  if (componentInfos.length === 0) {
    console.warn('⚠️ No components found to generate entry file');
    return;
  }

  // 生成导入语句
  const importStatements = componentInfos.map(({ name }) => {
    if (MULTI_COMPONENTS.includes(name)) {
      return `import ${name}, { ${name}Item } from '@/components/${name}'`;
    } else {
      return `import ${name} from '@/components/${name}'`;
    }
  }).join('\n');

  // 生成组件名称数组
  const componentNames = componentInfos.map(({ name }) => name);
  const allComponentNames = [...componentNames, ...EXTRA_COMPONENTS];

  const entryCode = `
import type { App } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

${importStatements}

import '@/styles/index.scss'

library.add(fas)

const components = [
${allComponentNames.map(name => `  ${name}`).join(',\n')}
]

const install = (app: App) => {
  components.forEach(component => {
    app.component(component.name!, component)
  })
}

export {
${allComponentNames.map(name => `  ${name}`).join(',\n')}
}

export default {
  install
}
`.trim();

  try {
    writeFileSync(ENTRY_FILE, entryCode);
    console.log('✅ Generated entry file: src/index.ts');
  } catch (error) {
    console.error('❌ Failed to generate entry file:', error);
  }
};

// 主函数
const main = () => {
  console.log('🚀 Starting component index file generation...');

  try {
    const componentInfos = generateComponents();
    generateEntryFile(componentInfos);

    console.log('🎉 Component index generation completed successfully!');
  } catch (error) {
    console.error('💥 Component index generation failed:', error);
    process.exit(1);
  }
};

// 执行主函数
main();