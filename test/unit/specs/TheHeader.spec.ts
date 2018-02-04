import { shallow } from 'vue-test-utils'
import TheHeader from '../../../src/components/TheHeader.vue'

/* eslint-disable no-unused-expressions */
describe('TheHeader.vue', () => {
  it('Should render', () => {
    const wrapper = shallow(TheHeader)
    expect(wrapper.element).toBeTruthy()
  })
})
