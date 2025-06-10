## 元组

定义命名常量集合：

```
// 枚举
enum hh {
  up,
  down,
  left,
  right,
}
//双向映射
console.log(hh.up); // 0
console.log(hh[0]); // up
// 常量枚举，提高性能，不支持反向映射
// 常量枚举在编译后的 JavaScript 代码中不会生成实际的枚举对象，仅替换为对应的值。
const enum ii {
  up = 10,
  down = 11,
  left = 12,
  right = 13,
}
// 编译后的 JS 代码（假设在代码中引用了 ii.Up）
console.log(10); // 而不是 Direction.Up

```
