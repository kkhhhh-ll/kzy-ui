# this 指向

**_this 永远指向一个对象_**<br>
**_this 的指向完全取决于函数调用的位置_**

# this 模式

## 1、方法调用

this 总是指向调用它所在方法的对象，this 的指向与所在方法的调用位置有关，而与方法的声明位置无关（箭头函数特殊）

```
// 声明位置
var test = function(){
  console.log(this.x)
}

var x = "2";

var obj = {
  x:"1",
  fn:test,
}

// 调用位置
obj.fn(); // 1

test(); // 2
```

this 指向调用它所在方法的对象，test 方法在 obj 对象下，所以 this 指向 obj，test 在 window 对象下，所以 this 指向 window。

```
let obj1={
  a:222
};
let obj2={
  a:111,
  fn:function(){
    console.log(this.a);
  }
}
obj1.fn = obj2.fn;
obj1.fn(); // 222
```

obj1.fn 是从 obj2.fn 赋值而来，但是调用函数的是 obj1，所以 this 指向 obj1。

## 2、函数调用

this 指向 window ,调用方法没有明确对象的时候，this 指向 window，如 setTimeout、匿名函数等；

```
var a = 1;
function fn1(){
  console.log(this.a); // 1
}
fn1();

window.b = 2;
function fn2(){
  console.log(this.b); // 2
}
fn2();
//可以理解为 window.fn();
```

```
// 匿名函数，setTimeout
(function(){
  console.log(this); // window
})();

setTimeout(() => {
  console.log(this); // window
}, 0);

setTimeout(function(){
  console.log(this); // window
}, 0);
```

## 3、构造函数

this 指向实例对象，通过 new 操作符实现

```
function objNew(func,...rest) {
    // 创建一个没有原型的对象
    const obj = Object.create(null)
    // 原型链链接
    Object.setPrototypeOf(obj, func)
    // 改变this指向
    const result = func.apply(obj,rest)
    // 优先返回构造函数返回的对象
    return result instanceof Object ? result : obj
}
```

## 4、call、apply、bind

call 接收的参数不固定，第一个参数是函数体内 this 的指向，第二个参数是依次传入的参数; apply 接收两个参数，第一个参数是函数体内 this 的指向，第二个参数是一个集合对象（数组或者类数组）; bind 第一个参数是函数体内 this 的指向，第二个参数是依次传入的参数，并返回一个函数。

```
var obj = {
  name:'111',
  getName:function(){
    console.log(this.name)
  }
};

var otherObj = {
  name:'222',
};

var name = '333';

obj.getName();               // 111
obj.getName.call();          // 333
obj.getName.call(otherObj);  // 222
obj.getName.apply();         // 333
obj.getName.apply(otherObj); // 222
obj.getName.bind(this)();    // 333
obj.getName.bind(otherObj)();// 222
```

## 5、箭头函数

箭头函数里面的 this 是上下文( context ), 外部作用域的 this 就是箭头函数内的 this。<br>

**判断技巧：它的外层没有函数，this 是 window；外层有函数，看外层函数的 this 是谁，它的 this 就是谁。**

```
let obj={
  a:222,
  fn:function(){
    setTimeout(()=>{console.log(this.a)});
  }
};
obj.fn(); // 222
```

```
var name = 'window';
var A = {
  name: 'A',
  sayHello: () => {
    console.log(this.name)
  }
}

A.sayHello(); // 输出的是window,根据刚才讲的规则就可以判断
```

## 6、严格模式

如果 this 没有被执行环境（execution context）定义，那 this 是 undefined。

```
// 严格模式
"use strict";
var fn2 = function(){
  return this
}
console.log(fn2() == undefined); // true
```
