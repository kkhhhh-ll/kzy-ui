import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils";
import Switch from "./Switch.vue";

describe('KSwitch', () => {
    it('正常渲染并显示初始状态', () => {
        const wrapper = mount(Switch, {
            props: { modelValue: true }
        })
        expect(wrapper.find('.k-switch').exists()).toBe(true)
        expect((wrapper.find('input[type="checkbox"]').element as HTMLInputElement).checked).toBe(true)
        expect(wrapper.find('.is-checked').exists()).toBe(true)
    })
    it('禁用状态不可点击', async () => {
        const wrapper = mount(Switch, {
            props: { modelValue: true, disabled: true }
        })
        await wrapper.trigger('click')
        expect((wrapper.find('input[type="checkbox"]').element as HTMLInputElement).checked).toBe(true)
        expect(wrapper.find('.is-disabled').exists()).toBe(true)
    })
    it('点击切换状态并触发事件', async () => {
        const wrapper = mount(Switch, {
            props: { modelValue: false }
        })
        await wrapper.trigger('click')
        expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
        expect(wrapper.emitted()['update:modelValue'][0]).toEqual([true])
        expect(wrapper.emitted()['change']).toBeTruthy()
        expect(wrapper.emitted()['change'][0]).toEqual([true])
    })
    it("显示 activeText 和 inactiveText", async () => {
        const wrapper = mount(Switch, {
            props: { modelValue: true, activeText: '开', inactiveText: '关' }
        })
        expect(wrapper.text()).toContain('开')
        wrapper.setProps({ modelValue: false })
        // 等待响应式更新
        setTimeout(() => {
            expect(wrapper.text()).toContain('关')
        })
    })
})