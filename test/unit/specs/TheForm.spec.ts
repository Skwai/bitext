import { shallow } from 'vue-test-utils'
import { store } from '../mocks'
import TheForm from '../../../src/components/TheForm.vue'

describe('TheForm.vue', () => {
  it('Should render form when loaded', () => {
    const wrapper = shallow(TheForm)
    expect(wrapper.element).toBeTruthy()
  })

  /*
  it('Should be disabled by default', () => {
    const vm = await render()
    expect(vm.$el.querySelector('button[type=submit]').getAttribute('disabled')).toEqual('disabled')
  })

  it('Should not be disabled if form is valid', () => {
    const vm = await render()
    Object.assign(vm.user, {
      phoneNumber: '412345678',
      phoneCountryCode: '+61',
      price: 5000,
      dir: 'LT'
    })
    await Vue.nextTick()
    expect(vm.$el.querySelector('button[type=submit]').getAttribute('disabled')).to.be.null
  })
  */
})
