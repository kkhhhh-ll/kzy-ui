import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Card from './Card.vue'

describe('Card.vue', () => {
    it('渲染标题和内容', () => {
        const wrapper = mount(Card, {
            props: {
                title: '测试标题',
                content: '测试内容'
            }
        })
        expect(wrapper.find('.k-card__header').text()).toContain('测试标题')
        expect(wrapper.find('.k-card__body').text()).toContain('测试内容')
    })

    it('渲染插槽 header/footer/body', () => {
        const wrapper = mount(Card, {
            slots: {
                header: '<span>自定义头部</span>',
                default: '<div>自定义内容</div>',
                footer: '<span>自定义底部</span>'
            }
        })
        expect(wrapper.find('.k-card__header').text()).toContain('自定义头部')
        expect(wrapper.find('.k-card__body').text()).toContain('自定义内容')
        expect(wrapper.find('.k-card__footer').text()).toContain('自定义底部')
    })

    it('应用自定义类名', () => {
        const wrapper = mount(Card, {
            props: {
                title: '标题',           // 保证 header 渲染
                content: '内容',         // 保证 body 渲染
                footer: '底部',          // 保证 footer 渲染
                headerClass: 'my-header',
                bodyClass: 'my-body',
                footerClass: 'my-footer'
            }
        })
        expect(wrapper.find('.k-card__header').classes()).toContain('my-header')
        expect(wrapper.find('.k-card__body').classes()).toContain('my-body')
        expect(wrapper.find('.k-card__footer').classes()).toContain('my-footer')
    })

    it('应用自定义 bodyStyle', () => {
        const wrapper = mount(Card, {
            props: {
                bodyStyle: { color: 'red', padding: '8px' }
            }
        })
        const style = wrapper.find('.k-card__body').attributes('style')
        expect(style).toContain('color: red')
        expect(style).toContain('padding: 8px')
    })
})