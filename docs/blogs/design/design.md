## 单例模式

使用场景：管理全局状态

```
// 类只有一个实例
class SingleInstance {
    constructor() {
        if(SingleInstance.instance) {
            return SingleInstance.instance
        }
        SingleInstance.instance = this
    }
}
```

## 观察者模式

观察者+被观察者，被观察者发出消息，观察者接受

```
class Observered {
    constructor(observer = null) {
        this.observers = new Set();
        if (observer) {
            this.addObserver(observer);
        }
    }
    
    addObserver(observer) {
        if (observer && typeof observer.update === 'function') {
            this.observers.add(observer);
        } else {
            console.warn('Observer must implement update method');
        }
    }
    
    deleteObserver(observer) {
        this.observers.delete(observer);
    }
    
    notify(message) {
        this.observers.forEach(observer => {
            try {
                observer.update(message);
            } catch (error) {
                console.error(`Error notifying observer: ${error.message}`);
            }
        });
    }
    
    clearObservers() {
        this.observers.clear();
    }
    
    get observerCount() {
        return this.observers.size;
    }
}

class Observer {
    constructor(name) {
        this.name = name;
    }
    
    update(message) {
        console.log(`${this.name} received: ${message}`);
    }
}

```

// 工厂函数模式
