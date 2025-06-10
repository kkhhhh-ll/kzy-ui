## 类型推断

```
let a = 1; // number
a = '2'; // string
```

## 联合类型

```
let g: number | string;
g = 1;
g = "a";
// g = true; // error
```

## 类型断言

```
// type guard 类型守卫 使用typeof
let g = "1" as string; // 断言为string
g = 1 as number; // 断言为number
```

## 类型别名

```
type Tk = number | string; // 联合类型
const tk: Tk = 1; // number
```

## 交叉类型

```
type T1 = { name: string };
type T2 = { age: number };
type T3 = T1 & T2; // 交叉类型
```

## 字面量类型

精确限定值的范围：

```
let direction: "left" | "right" | "up" | "down";
direction = "left";  // 允许
direction = "north"; // ❌ 错误
```
