## extends

extends关键字在TS编程中出现的频率挺高的，而且不同场景下代表的含义不一样

```
表示继承/拓展的含义
表示约束的含义
表示分配的含义
```

### 基本使用

```
interface Animal {
    kind: string;
}
interface Dog extends Animal {
    bark:()=>void
}
```

### 泛型约束

在书写泛型时，需要对类型参数作一定的限制

```
function getCnames<T extends {name: string}>(entities:T[]):string[] {
    return entities.map(e=>e.name)
}
// 这里extends对传入的参数作了一个限制，就是 entities 的每一项可以是一个对  象，但是必须含有类型为string的name属性
```

### 条件类型与高阶类型

```
SomeType extends OtherType ? TrueType : FalseType
```

extends还有一大用途就是用来判断一个类型是不是可以分配给另一个类型

```
type Human = {
    name: string
}
type Duck = {
    name: string;
}
type Bool = Duck extends Human ? "yes" : "no" // Bool = 'yes'
// Duck可以分配给类型Human，但不是说类型Duck是类型Human的子集
```

```
type Human = {
    name: string;
    occupation: string;
}
type Duck = {
    name: string;
}
type Bool = Duck extends Human ? "yes" : "no" // Bool = 'no'
//当我们给Human加上一个occupation属性，发现此时Bool是'no'，这是因为 Duck 没有类型为string的occupation属性，类型Duck不满足类型Human的类型约束。
```

```
type P<T> = T extends 'x': string : number;
type A = P<'x'|'y'> //  A的类型是string|number;
<!-- 对于使用extends关键字的条件类型（即上面的三元表达式类型），如果extends前面的参数是一个泛型类型，当传入该参数的是联合类型，则使用分配律计算最终的结果。分配律是指，将联合类型的联合项拆成单项，分别代入条件类型，然后将每个单项代入得到的结果再联合起来，得到最终的判断结果。 -->
```

## keyof

返回一个由对象类型的所有属性名组成的字符串字面量联合类型。

```
interface Person {
  name: string;
  age: number;
  gender: string;
}

type PersonKeys = keyof Person; //  PersonKeys 的类型是 "name" | "age" | "gender"
```

## Pick

用于从一个现有的类型中“挑选”出指定的属性，创建一个新的类型。

```
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
// T: 需要从中挑选属性的原始类型（例如，一个接口或一个类型别名）。
// K: 一个联合类型，表示要从 T 中选择的属性键。K 中的每个键都必须是 T 的属性键。
```

## Record

Record<K, T> 是一个工具类型，用于创建一个新的对象类型，其属性键是 K，属性值是 T。简单来说，它帮助你定义一个对象的键和值的类型。Record 接收两个类型参数：K 表示键的类型，T 表示值的类型。

```
// 1. 定义一个键为字符串，值为数字的对象类型
type StringNumberMap = Record<string, number>;

const map: StringNumberMap = {
  age: 30,
  price: 199,
  // quantity: "high", // 错误:  不能将类型“string”分配给类型“number”
};

// 2. 定义一个键为字符串，值为联合类型的对象类型
type StringUnionMap = Record<string, string | number>;

const unionMap: StringUnionMap = {
  name: "Alice",
  age: 30,
  // score: true // 错误:  不能将类型“boolean”分配给类型“string | number”
};

// 3. 使用 `Record` 定义更复杂的对象类型
type User = {
  id: number;
  name: string;
};

type UserMap = Record<number, User>;

const users: UserMap = {
  1: { id: 1, name: "Alice" },
  2: { id: 2, name: "Bob" },
  // "3": {id: 3, name: "Charlie"} // 错误: 不能将类型“string”分配给类型“number”
};

// 4. Record结合其他类型操作
type Keys = 'a' | 'b' | 'c';
type MyRecord = Record<Keys, number>;

const myRecord: MyRecord = {
    a: 1,
    b: 2,
    c: 3,
    // d: 4 // 错误: 类型“{ a: number; b: number; c: number; d: number; }”的元素  “d” 在类型“MyRecord”中不存在
}

// 5. 动态属性的场景
type DynamicObject = Record<string, any>;

const dynamicObj: DynamicObject = {
    name: "John",
    age: 30,
    city: "New York",
    [Date.now().toString()]: "some value" // 动态键
}
```

## infer

用于在条件类型（conditional types）中推断类型。它允许你在类型“extends”条件语句中，从一个类型中提取并推断出一个新的类型，然后可以在条件为真时使用这个推断的类型。

```
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : T;
type Foo = { a: number; b: string };
type Bar = (x: number) => string;

type A = GetReturnType<Foo>; // type A = { a: number; b: string }
type B = GetReturnType<Bar>; // type B = string

// T extends (...args: any[]) => infer R： T 是否可以赋值给一个接受任意参数并返回一个值的函数。如果可以，infer R 就会推断出这个函数的返回值类型，并将其赋值给 R。
// ? R : T 如果 T 是一个函数，则返回推断出的返回值类型 R；否则，返回 T。
```

```
infer 的作用:
类型推断:
infer 允许TypeScript 在编译时推断类型，而无需显式地指定。
类型提取:
infer 可以从复杂的类型中提取出特定的部分，例如函数的参数类型或返回值类型。
类型复用:
推断出的类型可以在条件类型的其他部分被复用，增加代码的可读性和可维护性。
infer 的限制:
infer 只能在条件类型（extends 语句）中使用。
infer 推断出的类型只能在条件类型为真时（? 后面的部分）使用。
```
