import Vue from 'vue'
import TheSubmitted from '@/components/TheSubmitted'

/* eslint-disable no-unused-expressions */
describe('TheSubmitted.vue', () => {
  it('Should render', async () => {
    const vm = new Vue(TheSubmitted).$mount()
    await Vue.nextTick()
    expect(vm.$el instanceof Node).to.be.true
  })
})
