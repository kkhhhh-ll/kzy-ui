## 单元测试

针对程序模块（软件设计的最小单位）进行正确性检验的测试工作。对于面向对象编程来说，最小单元就是方法。<br>
在典型的vue项目中，我们需要进行单元测试的模块主要包括：

## 校验规则(reg)

```
// /reg/phone.ts
export function regChinesePhoneNumber(phoneNumber: string){
    const reg = /^1[3-9]\d{9}$/
    return reg.test(phoneNumber)
}

// /reg/phone.test.ts
import {expect,test,describe} from 'vitest'
import regChinesePhoneNumber form '../phone'

describe('校验手机号',()=> {
    test('合格手机号',()=> {
        expect(regChinesePhoneNumber('15522577281')).toBe(true)
    })
    test('不合格手机号',()=> {
        expect(regChinesePhoneNumber('1552257728')).toBe(true)
    })
})
```

## hooks

hooks是逻辑的封装，是最需要单元测试的场景。

```
// /hooks/useLastChange.ts
import {watch, ref, type WatchSource} from 'vue'
import dayjs from 'dayjs'
export function useLastChange(source: WatchSource) {
    const lastChange = ref('')
    watch(source,()=> {
        lastChange.value = dayjs().format('YYYY-MM-DD')
    })
    return lastChange
}
// /hooks/_test_/useLastChange.test.ts
import {it, expect} from 'vitest'
import {nextTick,ref} from 'vue'
import {useLastChange} from '../useLastChange'

it('update lastChange when source changes',async ()=> {
    const source = ref('')
    const lastChange = useLastChange(source)
    const snap1 = lastChange.value
    source.value = 'Ray'
    await nextTick()
    const snap2 = lastChange.value

    expect(snap1).not.toBe(snap2)
})

```

hooks测试就是执行后比对结果。

## 工具函数(utils)

```
// /utils/tax-ratio.ts

type TRatio = number | string | null |undefined
// null,undefined,''将数据暴露出去，并将'0.13%','13%',13,0.13,统一展示风格
export function displayTaxRatio(val:TRatio):TRatio {
    const isValidValue: boolean = val === null || val === undefined || val === ''
    if(isValidValue){
        return val
    }
    let value = 0
    if(typeof val === 'string') {
        let numLike = val
        if(val.includes('%')){
            numLike = val.replace('%','')
        }
        value = Number(numLike)
    }
    if(typeof val === 'number') {
        value = val
    }
    if(value <= 1) {
        return Number(value * 100)
    }
    return value
}

// /utils/_test_/tax-ratio.test.ts
import {describe,expect,text} from 'vitest'
import {displayTaxRatio} from '../tax-ratio'
describe('税率展示',() => {
    test('输入null,返回null',()=> {
        expect(displayTaxRatio(null)).toBe(null)
    })
     test('输入undefined,返回undefined',()=> {
        expect(displayTaxRatio(undefined)).toBe(undefined)
    })
     test('输入空字符串,返回空字符串',()=> {
        expect(displayTaxRatio('')).toBe('')
    })
     test('输入'0.13%',返回13',()=> {
        expect(displayTaxRatio('0.13%')).toBe(13)
    })
     test('输入'13%',返回13',()=> {
        expect(displayTaxRatio('13%')).toBe(13)
    })
     test('输入0.13,返回13',()=> {
        expect(displayTaxRatio(0.13)).toBe(13)
    })
})

```
