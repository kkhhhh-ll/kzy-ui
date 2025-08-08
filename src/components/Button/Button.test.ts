import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from './Button.vue'

describe('KButton', () => {
  it('渲染默认插槽内容', () => {
    const wrapper = mount(Button, {
      slots: {
        default: '按钮文本'
      }
    })
    expect(wrapper.text()).toContain('按钮文本')
  })

  it('loading 状态时显示 loading 图标且禁用', () => {
    const wrapper = mount(Button, {
      props: { loading: true }
    })
    expect(wrapper.find('.is-loading').exists()).toBe(true)
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })

  it('type、size、plain、round、circle、disabled 属性生效', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary',
        size: 'large',
        plain: true,
        round: true,
        circle: true,
        disabled: true
      }
    })
    expect(wrapper.classes()).toContain('k-button--primary')
    expect(wrapper.classes()).toContain('k-button--large')
    expect(wrapper.classes()).toContain('is-plain')
    expect(wrapper.classes()).toContain('is-round')
    expect(wrapper.classes()).toContain('is-circle')
    expect(wrapper.classes()).toContain('is-disabled')
    expect(wrapper.find('button').attributes('disabled')).toBeDefined()
  })
})