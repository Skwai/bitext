import Vue from 'vue'
import AppHeader from '@/components/AppHeader'

/* eslint-disable no-unused-expressions */
describe('AppHeader.vue', () => {
  it('Should render', async () => {
    const vm = new Vue(AppHeader).$mount()
    await Vue.nextTick()
    expect(vm.$el instanceof Node).to.be.true
    expect(vm.$el.classList.contains('AppHeader')).to.be.true
  })
})
