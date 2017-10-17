import Vue from 'vue'
import { store } from '../mocks'
import Price from '@/components/Price'

/* eslint-disable no-unused-expressions */
describe('Price.vue', () => {
  it('Should render correct price', async () => {
    const vm = new Vue({
      ...Price,
      store
    }).$mount()

    await Vue.nextTick()
    expect(vm.$el instanceof Node).to.be.true
    expect(vm.$el.classList.contains('Price')).to.be.true

    const dollars = vm.$el.querySelector('.Price__Dollars')
    expect(dollars.textContent).to.equal('100')

    const cents = vm.$el.querySelector('.Price__Cents')
    expect(cents.textContent).to.equal('.25')
  })
})
