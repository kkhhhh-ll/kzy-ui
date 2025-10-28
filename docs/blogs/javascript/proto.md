# 原型和原型链

**proto 和 constructor 是对象独有的**

**prototype 属性是函数独有的**

## 原型

### prototype

给其它对象提供共享属性的对象

### constructor 与 prototype 关系

每个函数都有一个 prototype 属性,它默认指向一个 Object 空对象(即称为:原型对象)<br>

原型对象中有一个属性 constructor,它指向函数对象<br>

给原型对象添加属性(一般是方法)<br>

作用:函数的所有实例对象自动拥有原型中的属性(方法)<br>

```
function Demo() {}
console.log(Demo.prototype.constructor === Demo)  // true
console.dir(Demo.prototype)
```

### proto 和 prototype 关系

#### 显示原型和隐式原型

每个函数 fun 都独有一个 prototype, 即显式原型(属性)<br>
每个实例对象都有一个 proto, 即隐式原型(属性)<br>
实例对象的隐式原型的值等于其构造函数的显示原型的值<br>

### Object 和 Function 的鸡和蛋的问题

先有 Object.prototype（原型链顶端），Function.prototype 继承 Object.prototype 而产生，最后，Function、Object 以及其它构造函数继承 Function.prototype 而产生。

## 原型链

当你在访问一个对象属性的时候，如果该对象内部不存在这个属性，那么就会去它的 proto 属性所指向的对象（父类对象）上查找，如果父类对象依旧不存在这个属性，那么就会去其父类的 proto 属性所指向的父类对象上去查找。以此类推，直到找到原型链的尽头 null。<br>

```
function myInstanceOf(left,right){
    let proto = Object.getPrototypeOf(left)
    let prototype = right.prototype

    while(true) {
        if(!proto) return false
        if(proto === prototype) return true
        proto = Object.getPrototypeOf(proto)
    }
}

```
