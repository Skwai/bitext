import Vue from 'vue'
import { store } from '../mocks'
import ThePrice from '@/components/ThePrice'

/* eslint-disable no-unused-expressions */
describe('ThePrice.vue', () => {
  it('Should render correct price', async () => {
    const vm = new Vue({
      ...ThePrice,
      store
    }).$mount()

    await Vue.nextTick()
    expect(vm.$el instanceof Node).to.be.true
    const el = vm.$el.querySelector('h2')
    expect(el.textContent).to.equal('$100.25')
  })
})
