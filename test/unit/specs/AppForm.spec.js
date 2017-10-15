import Vue from 'vue'
import { store } from '../mocks'
import AppForm from '@/components/AppForm'

const render = async () => {
  const vm = new Vue({ store, ...AppForm }).$mount()
  await Vue.nextTick()
  return vm
}

/* eslint-disable no-unused-expressions */
describe('AppForm.vue', () => {
  it('Should render form when loaded', async () => {
    const vm = await render()
    expect(vm.$el).to.exist
    expect(vm.$el.tagName).to.equal('FORM')
  })

  it('Should be disabled by default', async () => {
    const vm = await render()
    expect(vm.$el.querySelector('button[type=submit]').getAttribute('disabled')).to.equal('disabled')
  })

  it('Should not be disabled if form is valid', async () => {
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
})
