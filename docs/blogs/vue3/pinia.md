## Pinia 简易版

```
import { computed, reactive } from 'vue'
let activePinia = null
const { assign } = Object

// 设置pinia
function setActivePinia(pinia) {
    activePinia = pinia
}
// 获取pinia
function getActivePinia() {
    return activePinia
}
// 创建全局实例
export function createPinia() {
    const pinia = {
        install() {
            setActivePinia(pinia)
        },
        cache: new Map()
    }
    return pinia
}
// 定义store
export function defineStore(id, options) {
    function useStore() {
        const pinia = getActivePinia()
        if (!pinia.cache.has(id)) {
            if (typeof options === 'function') {
                createSetupStore(id, options, pinia)
            } else {
                createOptionsStore(id, options, pinia)
            }
        }
        const store = pinia.cache.get(id)
        return store
    }
    return useStore
}
// 处理options
function createOptionsStore(id, options, pinia) {
    const { state, actions, getters } = options
    let store
    function setup() {
        return assign(
            state(),
            actions,
            Object.keys(getters).reduce((computedGetter, name) => {
                computedGetter[name] = computed(() => {
                    return getters[name].call(store)
                })
                return computedGetter
            }, {})
        )
    }
    store = createSetupStore(id, setup, pinia)
    return store
}

function createSetupStore(id, setup, pinia) {
    const store = reactive({
        <!-- 重置 -->
        $reset: () => { },
        <!-- 修改state数据 -->
        $patch: () => { }
    })
    assign(store, setup)
    pinia.cache.set(id, store)
    return store
}

```