import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Color from './Color.vue'
// 渲染、禁用状态、事件触发。。。
describe('KColor', () => {
    it('正常渲染并显示初始颜色', () => {
        const wrapper = mount(Color, {
            props: { modelValue: '#ff0000' }
        })
        const input = wrapper.find('input[type="color"]')
        expect(input.exists()).toBe(true)
        expect((input.element as HTMLInputElement).value).toBe('#ff0000')
    })
    it('禁用状态时 input 被禁用', () => {
        const wrapper = mount(Color, {
            props: { modelValue: '#00ff00', disabled: true }
        })
        const input = wrapper.find('input[type="color"]')
        expect(input.attributes('disabled')).toBeDefined()
        expect(wrapper.find('.is-disabled').exists()).toBe(true)
    })
    it('修改颜色时触发事件',async ()=> {
        const wrapper = mount(Color, {
            props: {modelValue: '#0000ff'}
        })
        const input = wrapper.find('input[type="color"]')
        await input.setValue('#ff00ff')
        await input.trigger('change')
        const emitted = wrapper.emitted()
        expect(emitted['update:modelValue']).toBeTruthy()
        expect(emitted['update:modelValue'][0]).toEqual(['#ff00ff'])
        expect(emitted['change']).toBeTruthy()
        expect(emitted['change'][0]).toEqual(['#ff00ff'])
    })
})