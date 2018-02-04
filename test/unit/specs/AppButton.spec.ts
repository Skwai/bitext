import { shallow } from 'vue-test-utils'
import AppButton from '../../../src/components/AppButton'

describe('AppButton.vue', () => {
  it('Should render correct button', async () => {
    const wrapper = shallow(AppButton, {
      slots: {
        default: 'Example'
      }
    })
    expect(wrapper.text()).toEqual('Example')
    expect(wrapper.element.getAttribute('disabled')).toBeFalsy()
  })

  it('Should render disabled button', async () => {
    const wrapper = shallow(AppButton, {
      slots: {
        default: 'Example'
      }
    })
    expect(wrapper.element.getAttribute('disabled')).toEqual('disabled')
  })
})
