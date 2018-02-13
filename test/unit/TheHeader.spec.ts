import { mount } from 'vue-test-utils'
import TheHeader from '@/components/TheHeader.vue'

describe('TheHeader.vue', () => {
  it('Should render', () => {
    const wrapper = mount(TheHeader)
    expect(wrapper.isVueInstance()).toEqual(true)
  })
})
