import Vue from 'vue'
import { mount } from 'vue-test-utils'
import TheSubmitted from '@/components/TheSubmitted.vue'

describe('TheSubmitted.vue', () => {
  it('Should render', () => {
    const wrapper = mount(TheSubmitted)
    expect(wrapper.isVueInstance()).toEqual(true)
  })
})
