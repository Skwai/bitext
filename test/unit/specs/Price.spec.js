import Vue from 'vue'
import { store } from '../mocks'
import Price from '@/components/Price'

describe('Price.vue', () => {
  it('Should render correct price', async () => {
    const vm = new Vue({
      store,
      template: '<Price />',
      components: { Price }
    }).$mount()

    await Vue.nextTick()
    const el = vm.$el.querySelector('.Price__Dollars')
    expect(el.textContent).to.equal('100')
  })
})
