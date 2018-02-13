import { mount } from 'vue-test-utils'
import AppLoading from '@/components/AppLoading.vue'

describe('AppLoading.vue', () => {
  it('Should render', () => {
    const wrapper = mount(AppLoading)
    expect(wrapper.isVueInstance()).toEqual(true)
  })
})
