import Vue from 'vue'
import TheHeader from '@/components/TheHeader'

/* eslint-disable no-unused-expressions */
describe('TheHeader.vue', () => {
  it('Should render', async () => {
    const vm = new Vue(TheHeader).$mount()
    await Vue.nextTick()
    expect(vm.$el instanceof Node).to.be.true
  })
})
