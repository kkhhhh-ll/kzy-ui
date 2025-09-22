import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import Carusel from './Carusel.vue'

const imgList = [
    { key: 1, src: 'https://via.placeholder.com/300x150?text=1' },
    { key: 2, src: 'https://via.placeholder.com/300x150?text=2' },
    { key: 3, src: 'https://via.placeholder.com/300x150?text=3' }
]

describe('KCarusel', () => {
    it('渲染图片列表', () => {
        const wrapper = mount(Carusel, {
            props: {
                imgList
            }
        })
        expect(wrapper.findAll('img').length).toBe(imgList.length)
    })
    it('点击切换下一张', async () => {
        const wrapper = mount(Carusel, {
            props: {
                imgList,
                showBtn: true
            }
        })
        const nextBtn = wrapper.find('.k-carusel__btn--next')
        await nextBtn.trigger('click')
        expect(wrapper.vm.currentIndex).toBe(1)
    })
    it('点击切换下一张', async () => {
        const wrapper = mount(Carusel, {
            props: {
                imgList,
                showBtn: true
            }
        })
        await wrapper.find('.k-carusel__btn--next').trigger('click')
        await wrapper.find('.k-carusel__btn--prev').trigger('click')
        expect(wrapper.vm.currentIndex).toBe(0)
    })
    it('点击切换到指定图片', async () => {
        const wrapper = mount(Carusel, {
            props: {
                imgList,
                showSpot: true
            }
        })
        const spots = wrapper.findAll('.k-carusel__spot')
        await spots[1].trigger('click')
        expect(wrapper.vm.currentIndex).toBe(1)
    })
    it('自动轮播', async () => {
        const wrapper = mount(Carusel, {
            props: {
                imgList,
                autoPlay: true,
                interval: 500,
            }
        })
        await new Promise((resolve) => setTimeout(resolve, 500))
        expect(wrapper.vm.currentIndex).toBe(1)
    })
})