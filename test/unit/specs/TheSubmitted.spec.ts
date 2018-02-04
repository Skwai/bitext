import { shallow } from 'vue-test-utils'
import TheSubmitted from '../../../src/components/TheSubmitted.vue'

/* eslint-disable no-unused-expressions */
describe('TheSubmitted.vue', () => {
  it('Should render', () => {
    const wrapper = shallow(TheSubmitted)
    expect(wrapper.element).toBeTruthy()
  })
})
