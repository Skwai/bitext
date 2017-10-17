import Vue from 'vue'
import Submitted from '@/components/Submitted'

/* eslint-disable no-unused-expressions */
describe('Submitted.vue', () => {
  it('Should render', async () => {
    const vm = new Vue(Submitted).$mount()
    await Vue.nextTick()
    expect(vm.$el instanceof Node).to.be.true
    expect(vm.$el.classList.contains('Submitted')).to.be.true
  })
})
