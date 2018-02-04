import { shallow } from 'vue-test-utils'

import AppButton from '../src/components/AppButton.vue'

describe('AppButton.vue', () => {
  it('Should render correct button', async () => {
    const wrapper = await shallow(new AppButton(), {
      slots: {
        default: 'Example'
      }
    })

    console.log(wrapper.text())

    // expect(wrapper.element).toBeTruthy()
    // expect(wrapper.text()).toEqual('Example')
  })
})
