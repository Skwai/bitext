import { mount } from 'vue-test-utils'
import AppButton from '@/components/AppButton.vue'

describe('AppButton.vue', () => {
  it('Should render correct button', () => {
    // console.log(AppButton)

    const wrapper = mount(AppButton, {
      slots: {
        default: 'Example'
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.text()).toEqual('Example')
  })
})
