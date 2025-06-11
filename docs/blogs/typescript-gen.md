# 泛型

泛型（Generics）是一种强大的工具，用于创建可重用的组件，同时保持类型安全性。

```
function jj<T>(arg: T): T {
  return arg;
}
const kk = <T>(arg: T): T => {
  return arg;
};
```

# 泛型解决了什么问题？

## 解决代码复用与类型安全的矛盾

问题：
在编写函数或类时，如果希望它们能处理多种类型的数据（如数组、Promise、自定义对象等），但直接使用 any 会丢失类型信息，导致类型安全下降。
泛型的解决方案：
通过泛型，可以在不指定具体类型的情况下编写代码，同时保留类型信息。例如：

```
typescript
function identity<T>(arg: T): T {
  return arg;
}
const num = identity<number>(42); // 明确指定类型为 number
const str = identity("hello"); // 自动推断为 string
```

优势：
代码可复用（适用于任意类型）。
类型安全（调用时或推断时确定具体类型）。

## 避免重复类型定义

问题：
如果没有泛型，针对不同类型需要编写多个相似的函数或类。例如，为 number 和 string 分别实现一个 wrap 函数：

```
typescript
function wrapNumber(value: number): { value: number } {
  return { value };
}
function wrapString(value: string): { value: string } {
  return { value };
}
```

问题：
代码冗余，维护成本高。
泛型的解决方案：
通过泛型统一实现：

```
typescript
function wrap<T>(value: T): { value: T } {
  return { value };
}
const wrappedNum = wrap(42); // { value: number }
const wrappedStr = wrap("hello"); // { value: string }
```

## 增强类型推断与约束

某些场景下，需要确保泛型参数满足特定条件（如必须包含某个属性或方法）。

```
interface Ilen {
  length: number;
}
// 传入的参数必须有length属性
const getLen = <T extends Ilen>(arg: T): number => {
  return arg.length;
};
```

## 泛型类与接口的灵活性

需要编写可复用的类或接口，但不同实例化时类型不同。

```
class queue<T> {
    private data: T[] = [];
    push(item: T) {
        this.data.push(item);
    }
    pop(): T | undefined {
        return this.data.shift();
    }
}
const q = new queue<number>();
interface obj<T, U> {
    key: T;
    value: U;
}
const obj1: obj<number, string> = { key: 1, value: "a" };
```
