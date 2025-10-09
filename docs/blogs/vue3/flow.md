vue3底层运行

## 创建Vue3应用

```
// vue3编译后的应用代码大致长这样子
const App = {
    setup() {

    },
    render() {
        return createVNode()
    }
}

```

```
const app = createApp(App)
app.mount('#app')
```

通过执行以上代码，可将整个程序运行起来，并将视图渲染到浏览器中

## 创建渲染器(renderer)

createApp内部通过createRenderer创建渲染器，将我们写的元素以及元素属性进行创建、删除和修改。不同的平台，对元素操作的API都不一样，所以在createRender的时候，就需要根据我们的平台对元素操作特性来创建渲染器。我们平时一般用到的都是Vue3默认提供的runtime-dom这个包来创建的渲染器(renderer)，这个runtime-dom就是根据我们的浏览器的对元素操作的特性进行创建渲染器。

```
const renderer = createRenderer({
    createElement,
    createTextNode,
    removeChild,
    insertBefore
})
```

createElement, createTextNode,removeChild,insertBefore均为浏览器的原生api。

```
// createRenderer实现
function createRenderer() {
    function render() {

    }
    return {
        createApp: createAppAPI(render)
    }
}
```

### 渲染器对象中createApp方法

```
// createAppAPI实现
fucntion createAppAPI(render) {
    return fucntion createApp(rootComponent) {
        const app = {
            mount(rootContainer) {
                const vnode = createVNode(rootComponent)
                render(vnode,rootContainer)
            }
        }
        return app
    }
}
```

### 渲染器中render方法实现

```
function createRenderer() {
    fucntion render(vnode) {
        patch(null, vnode)
    }
    // n1老的vnode，n2新的vnode
    function patch(n1, n2) {
        const { shapeFlag } = n2
        switch(shapeFlag) {
            case 'element':
                processElement(n1,n2)
                break
            case 'component': 
                processComponent(n1,n2)
                break
        }
    }
    return {
        createApp: createAppAPI(render)
    }
}
```

### 渲染器中patch方法实现

根据shapeFlag判断执行分支

```
function processComponent(n1, n2) {
    if(!n1) {
        mountComponent(n2)
    } else {
        updateComponent(n1,n2)
    }
}

```

## 组件初始化流程

### 创建组件实例

```
function mountComponent(initialVNode) {
    // 生成组件实例
    const instance = createComponentInstance(initialVNode)
    // 初始化组件实例
    setupComponent(instance)
    // 更新逻辑
    setupRenderEffect(instance)
}
```

### 实现组件代理对象

```
fucntion setupComponent(instance) {
    initProps()
    initSlots()
    instance.proxy = new Proxy({_:instance},{
        get({_:instance},key) {
            const {setupState,props} = instance
            if(hasOwn(setupState,  key)) {
                return setupState[key]
            } else if(hasOwn(props,key)) {
                return props[key]
            }
        }
    })
    instance.setupState = instance.VNode.setup()
}

```

### 更新逻辑setupRenderEffect

```
function setupRenderEffect() {
    instance.update = effect(()=> {
        if(!instance.isMounted) {
            const subTree = instance.render.call(instance.proxy)
            patch(null, subTree)
            instance.isMounted = true
        } else {
            const subTree = instance.render.call(instance.proxy)
            const preSubTree = instance.subTree
            patch(preSubTree,subTree)
        }
    })
}
```

effect这个API接收一个函数作为参数，并且会把这个函数包装成功一个副作用函数，并会执行一次，并返回这个函数的本身，叫runner。很明显在setupRenderEffect里面把这个返回的runner函数赋值给了组件实例上的update方法，方便将来更新的时候直接调用这个组件实例的update方法。<br>
在这个setupRenderEffect函数里面的effect函数里第一次走的肯定是还没有挂载的这个分支if(!instance.isMounted)。在这里调用组件实例的render方法去生成组件元素的VNode,也叫subTree,然后再通过patch方法去挂载组件元素的VNode,需要说明的就是这个render方法就是我们写的Vue3应用对象上的render方法，而且我们平时写的.vue文件里的template里的内容最终也会被编译成render函数，render函数里面会调用setup或者props里的数据，就是通过call方法绑定了组件实例上的代理对象，从而通过代理对象实现对setup里返回的数据或props里的数据的获取。<br>
那么我们创建了组件元素的VNode之后通过patch方法去挂载组件元素的VNode的时候，我们的流程就又回到patch方法里，所以VNode的渲染就是一个不停调用patch方法的过程。

## 元素初始化流程

```
function patch(n1,n2) {
    const {shapeFlag} = n2
    switch(sahpeFlag) {
        case 'element':
            processElement(n1,n2)
            break
        case 'component':
            processComponent(n1,n2)
            break
    }
}
```

这个时候还处在挂载的流程，所以n1是还不存在的，而这次渲染的是组件的元素的VNode，所以走的自然是processElement流程了。<br>
实际是根据VNode的shapeFlag通过位运算来计算得到结果的，而VNode的shapeFlag是在创建VNode的时候，根据VNode的type类型来判断是元素还是组件。如果type是String类型那么shapeFlag就是元素类型，如果type是Object那么shapeFlag就是组件。

```
function processElement(n1,n2) {
    if(!n1) {
        mountElement(n2)
    } else {
        updateElement(n1,n2)
    }
} 
```

processElement里流程跟processComponent有点像，也是判断是否存在老的VNode然后走不同的分支流程。那么初始化的时候还没有老的VNode,就走mountElement，如果存在老的VNode那么走的就是updateElement了，大名鼎鼎的diff算法过程就发生在updateElement里面。

```
fucntion mountElement(vnode) {
    // 根据VNode的type类型创建元素，type类型在浏览器平台下可能是div,span,p这些DOM元素类型。
    const el = hostCreateElement(vnode.type)
    const { children } = vnode
    if(孩子是文本) {
        el.textContent = children
    } else if(孩子是数组) {
        mountChildren(children)
    }
    const {props} = vnode
    for(const key in props) {
        const val = props[key]
        // 如果存在props那么就创建元素的属性，在浏览器平台下使用的则是setAttribute、removeAttribute 这些API进行处理。
        hostPatchProp(el,key,null,val)
    }
    // 最后通过insertBefore把创建的元素插入到宿主元素中
    hostInsert(el,container,anchor)
}

```

```
function mountChildren(children) {
    children.forEach((v) => {
      patch(null, v)
    })
}
```

在mountChildren里继续循环调用patch方法渲染孩子VNode,流程跟之前一样，值得主要的是，如果孩子里面存在组件VNode,那么在patch方法里面会继续走processComponent的组件流程继续创建组件实例，初始化，生成组件元素VNode然后继续调用patch方法渲染组件元素的VNode,如此一边又一边的循环，直到把所有的VNode都渲染完毕，这个时候页面上就呈现视图了。

## 更新流程

```
function setupRenderEffect(instance) {
    instance.update = effect(() => {
        if(!instance.isMounted) {
           const subTree = instance.render.call(instance.proxy)
           patch(null, subTree)
           instance.isMounted = true
        } else {
            
           const subTree = instance.render.call(instance.proxy)
           const prevSubTree = instance.subTree
           patch(prevSubTree, subTree)
        }
    }, {
        scheduler() {
            queueJobs(instance.update)
        }
    })
}
```

effect这个函数，它第一个参数接收一个函数并包装成一个副作用函数，第二个参数则接收一个scheduler函数作为参数，当里面的依赖数据发生更新的时候，effect内部会再次执行副作用函数，在准备执行副作用函数之前判断是否存在scheduler，如果存在scheduler那么就不执行副作用函数了，而是执行scheduler。之所这么做是因为把所有的更新函数的执行操作都放在一个异步任务队列里面，等所有数据都更新完成再一次统一执行异步任务队列里面的更新函数，进行VNode的更新，这个也就是大名鼎鼎的nextTick函数内部执行机制原理。
