## 接口

定义对象的结构

```
interface Iobj {
    name: 'string',
    age?: number
}
let obj:Iobj = {
    name: 'kk'
}
```

## 接口和类型别名的区别

```
1. 类型别名可以是基本类型、联合类型、元组等，而interface只能是对象类型
2. 类型别名可以使用交叉类型，而interface不可以
3. interface可以被extends，而类型别名不可以
4. interface可以被implements，而类型别名不可以
5. interface可以声明合并，而类型别名不可以
6. interface可以被声明多次，而类型别名不可以
```
