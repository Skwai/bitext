import Vue from 'vue'
import AppLoading from '@/components/AppLoading'

/* eslint-disable no-unused-expressions */
describe('AppLoading.vue', () => {
  it('Should render', async () => {
    const vm = new Vue(AppLoading).$mount()
    await Vue.nextTick()
    expect(vm.$el instanceof Node).to.be.true
  })
})
