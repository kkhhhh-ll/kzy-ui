# pnpm，npm，yarn 对比

pnpm、npm 和 yarn 都是 JavaScript 生态中常用的包管理工具，它们在依赖管理、性能、磁盘占用、功能特性等方面各有特点。

## 依赖管理机制

### npm

扁平化依赖树：npm 3+ 引入扁平化依赖树，将依赖包尽可能提升到 node_modules 的顶层，减少嵌套层级。但这种机制可能导致“幽灵依赖”（Phantom Dependencies）问题，即某些**未在 package.json 中显式声明的依赖仍能被引用**，可能引发潜在风险。<br>
重复依赖存储：每个项目会独立存储依赖的副本，即使多个项目使用相同版本的包，也会重复占用磁盘空间。

### yarn

扁平化依赖树：yarn 同样采用扁平化依赖树，优化了依赖解析速度，但也存在类似 npm 的“幽灵依赖”问题。<br>
依赖缓存：yarn 引入了本地缓存机制，首次安装依赖后会缓存到本地，后续安装可直接从缓存中读取，提升安装速度。

### pnpm

符号链接与内容寻址存储(软连接与硬链接)：pnpm 使用符号链接将依赖链接到**全局存储目录（~/.pnpm-store）**，所有项目共享同一份依赖副本，避免重复存储，显著节省磁盘空间。<br>
严格隔离依赖：pnpm 通过符号链接确保每个项目只能访问其 package.json 中声明的依赖，彻底杜绝“幽灵依赖”问题。

## 性能与磁盘占用

### npm

安装速度较慢：npm 在安装依赖时需要逐个下载和解析包，尤其在大型项目中速度较慢。<br>
磁盘占用高：依赖重复存储导致磁盘占用较高。

### yarn

安装速度较快：yarn 的并行安装和缓存机制显著提升了安装速度，尤其在首次安装后。<br>
磁盘占用较高：虽然有缓存机制，但依赖仍会在每个项目中独立存储，磁盘占用较高。

### pnpm

安装速度极快：pnpm 的并行安装和符号链接机制使其安装速度远超 npm 和 yarn，尤其在多项目环境中表现突出。<br>
磁盘占用极低：依赖共享存储机制使磁盘占用显著降低，适合多项目或依赖频繁的场景。

## 功能特性

### npm

生态系统完善：作为 Node.js 的默认包管理工具，npm 拥有最广泛的包生态和社区支持。<br>
工作区支持：npm 7+ 引入了工作区（Workspaces）功能，支持 Monorepo 管理，但功能相对基础。

### yarn

工作区支持：yarn 原生支持工作区，适合 Monorepo 项目。<br>
离线模式：yarn 支持离线安装，适合网络环境不稳定的场景。<br>
插件系统：yarn 提供了丰富的插件（如 berry 版本），支持更灵活的配置。

### pnpm

工作区支持：pnpm 原生支持工作区，且在 Monorepo 管理中表现优异，支持更复杂的依赖关系。<br>
过滤安装：pnpm 支持通过 --filter 参数对工作区中的特定包进行操作，适合大型项目。<br>
严格模式：pnpm 的严格模式（pnpm install --shamefully-hoist）可模拟 npm/yarn 的扁平化依赖行为，但默认情况下更安全。

## 安全性与稳定性

### npm

安全性依赖社区：npm 的安全性主要依赖社区维护，依赖包的质量参差不齐。<br>
锁定文件：npm 5+ 引入了 package-lock.json，确保依赖版本一致性，但早期版本存在锁定文件不一致的问题。

### yarn

安全性较高：yarn 的锁定文件（yarn.lock）更严格，确保依赖版本一致性。<br>
审计功能：yarn 提供了审计功能（yarn audit），可检测依赖中的安全漏洞。

### pnpm

安全性高：pnpm 的锁定文件（pnpm-lock.yaml）同样确保依赖版本一致性，且通过符号链接隔离依赖，减少潜在风险。<br>
内容寻址存储：pnpm 的存储机制确保依赖的完整性，避免篡改。

## 总结与推荐

选择 npm：<br>
适合初学者或对磁盘占用不敏感的项目。<br>
需要与现有 npm 生态系统无缝集成的场景。<br>
选择 yarn：<br>
适合需要快速安装和离线支持的项目。<br>
需要 Monorepo 支持且对安全性要求较高的团队。<br>
选择 pnpm：<br>
适合多项目或依赖频繁的场景，显著节省磁盘空间和安装时间。<br>
需要严格隔离依赖、避免“幽灵依赖”的项目。<br>
适合 Monorepo 管理，尤其是大型项目。<br>

## 最终建议：

如果追求极致性能和磁盘占用优化，pnpm 是最佳选择。<br>
如果需要与现有 npm 生态兼容或对离线支持有需求，yarn 是更好的选择。<br>
如果项目简单或对性能要求不高，npm 仍是一个可靠的选择。<br>
