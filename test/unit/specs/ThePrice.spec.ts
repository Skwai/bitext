import { shallow } from 'vue-test-utils'
import { store } from '../mocks'
import ThePrice from '../../../src/components/ThePrice.vue'

/* eslint-disable no-unused-expressions */
describe('ThePrice.vue', () => {
  it('Should render correct price', () => {
    const wrapper = shallow(ThePrice, {
      store
    })
    expect(wrapper.element).toBeTruthy()
    expect(wrapper.text()).toEqual('$100.25')
  })
})
