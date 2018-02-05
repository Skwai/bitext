import { mount } from 'vue-test-utils'
import AppButton from '../src/components/AppButton.vue'

describe('AppButton.vue', () => {
  it('Should render correct button', async () => {
    // console.log(AppButton)

    const wrapper = await mount(AppButton, {
      slots: {
        default: 'Example'
      }
    })
    expect(wrapper.isVueInstance()).toBeTruthy()
    expect(wrapper.text()).toEqual('Example')
  })
})
