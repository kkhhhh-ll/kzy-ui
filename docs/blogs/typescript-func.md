## 函数

函数输入，输出以及本身都有类型

```
let add: (x: number, y: number, z?: number) => number;
add = (x: number, y: number, z?: number): number => {
    return z ? x + y + z : x + y;
};
const add2 = (x: number, y: number, z?: number): number => {
    return z ? x + y + z : x + y;
};
interface IAdd {
    (x: number, y: number, z?: number): number;
}
const add3: IAdd = add2;
```
