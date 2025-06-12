## Typescript

TypeScript（简称 TS）是 JavaScript 的超集（Superset），由微软开发并开源。它在 JavaScript 的基础上增加了 `静态类型系统` 和 更强大的`面向对象编程能力`，最终会被编译成标准的 JavaScript 代码运行。

## 为什么需要 TypeScript？

### 1.更早发现错误（编译时检查）

JavaScript 是动态类型语言，运行时才能发现类型错误：

```
function add(a, b) {
    return a + b;
}
add(1, "2"); // 返回 "12"（可能不是预期行为）
```

TypeScript 在编译阶段就能检测：

```
function add(a: number, b: number): number {
  return a + b;
}
add(1, "2"); // ❌ 编译时报错：Argument of type 'string' is not assignable to parameter of type 'number'
```

### 2.更好的代码可维护性

类型即文档：通过类型声明，代码意图更清晰。

重构更安全：修改代码时，IDE 会提示受影响的依赖。

### 3.增强的面向对象编程

```
// 使用接口（Interface）定义契约
interface User {
  id: number;
  name: string;
}

// 使用类（Class）实现接口
class Admin implements User {
  id: number;
  name: string;
  role: string; // 扩展属性
}
```

### 4.兼容 JavaScript 生态

可以直接引入现有的 JavaScript 库（通过类型声明文件 `.d.ts`）。

渐进式迁移：允许在 `.ts `文件中混合编写 JavaScript 代码。
