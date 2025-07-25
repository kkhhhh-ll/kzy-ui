## 迭代器

Iterator是一种接口，为不同的数据结构提供统一的访问机制。Iterator 只是把接口规格加到数据结构之上，遍历器与它所遍历的那个数据结构，实际上是分开的 <br>
作用：<br>
(1)为不同的数据结构提供统一的访问机制<br>
(2)使数据结构的成员按次序排列<br>
(3)供for...of消费

```
// 遍历器接口
interface Iterable {
  [Symbol.iterator]() : Iterator,
}
// 指针对象
interface Iterator {
  next(value?: any) : IterationResult,
}
// next返回值
interface IterationResult {
  value?: any,
  done: boolean,
}
```
