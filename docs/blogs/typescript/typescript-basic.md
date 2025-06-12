## 基本数据类型

### number

```
let a:number = 1
```

### string

```
let a:string = '1'
```

### boolean

```
let a:boolean = true
```

### undefined

```
let a:undefined = undefined
```

### null

```
let a:null = null
```

### symbol

```
let sym: symbol = Symbol("key");
```

### any

```
let anyValue: any = "可以赋任意值"; // 任意类型（禁用类型检查）
```

### unknown

```
let unknownValue: unknown = "类型安全版的any"; // 未知类型（需类型断言后使用）
```

### never

```
let neverValue: never; // 表示永远不存在的值（如抛出错误的函数）
```

## any 和 unknown 比较

### 类型安全性

完全绕过类型检查：any 会关闭 TypeScript 的类型系统，允许对该变量执行任何操作（如调用方法、访问属性），而不会触发编译错误。

风险：可能导致运行时错误（例如调用一个不存在的方法）。

```
let value: any = "hello";
value.toUpperCase(); // 编译通过，但若 value 是数字则会报错
value.nonExistentMethod(); // 编译通过，但运行时错误
```

类型安全但严格：unknown 是 TypeScript 中最安全的类型，表示“可能是任何类型，但必须先进行`类型检查`或`类型断言`才能操作”。

风险：必须显式处理类型（如`类型守卫(typeof)`或`断言(as)`），否则无法操作变量

```
let value: unknown = "hello";
// value.toUpperCase(); // 编译错误：Object is of type 'unknown'
if (typeof value === "string") {
  value.toUpperCase(); // 类型守卫后允许
}
```

### 类型断言

any 可以直接断言为任何类型，无需检查。

```
let value: any = "hello";
const str: string = value; // 直接断言，无警告
```

unknown 必须先通过`类型守卫`或 `断言`为具体类型。

```
let value: unknown = "hello";
const str: string = value as string; // 必须显式断言
// 或通过类型守卫
if (typeof value === "string") {
  const str: string = value; // 类型守卫后自动推断
}
```

### 类型收窄

any 无法收窄类型，始终保持 any。

```
let value: any = "hello";
if (typeof value === "string") {
  // value 仍然是 any，而非 string
}
```

unknown 可以通过类型守卫收窄为具体类型。

```
let value: unknown = "hello";
if (typeof value === "string") {
  // value 被收窄为 string
  value.toUpperCase(); // 合法
}
```
