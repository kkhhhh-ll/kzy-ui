import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Alert from './Alert.vue'

describe('KAlert', () => {
    it('默认渲染内容', () => {
        const wrapper = mount(Alert, {
            props: { content: '警告内容' }
        })
        expect(wrapper.text()).toContain('警告内容')
        expect(wrapper.find('.k-alert').exists()).toBe(true)
    })

    it('type、effect 属性生效', () => {
        const wrapper = mount(Alert, {
            props: { type: 'success', effect: 'dark', content: '内容' }
        })
        const alertEl = wrapper.find('.k-alert')
        expect(alertEl.classes()).toContain('k-alert--success')
        expect(alertEl.classes()).toContain('is-dark')
    })

    it('显示图标并可关闭', async () => {
        const wrapper = mount(Alert, {
            props: { showIcon: true, content: '内容' }
        })
        const icon = wrapper.find('.k-alert-icon')
        expect(icon.exists()).toBe(true)
        await icon.trigger('click')
        expect(wrapper.find('.k-alert').exists()).toBe(false)
    })

    it('自定义插槽内容', () => {
        const wrapper = mount(Alert, {
            slots: {
                content: '<span>自定义内容</span>',
                icon: '<span class="custom-icon"></span>'
            }
        })
        expect(wrapper.html()).toContain('自定义内容')
        expect(wrapper.find('.custom-icon').exists()).toBe(true)
    })
})