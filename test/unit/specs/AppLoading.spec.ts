import { shallow } from 'vue-test-utils'
import AppLoading from '../../../src/components/AppLoading'

/* eslint-disable no-unused-expressions */
describe('AppLoading.vue', () => {
  it('Should render', async () => {
    const wrapper = shallow(AppLoading)
    expect(wrapper.element).toBeTruthy()
  })
})
