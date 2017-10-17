import Vue from 'vue'
import Loading from '@/components/Loading'

/* eslint-disable no-unused-expressions */
describe('Loading.vue', () => {
  it('Should render', async () => {
    const vm = new Vue(Loading).$mount()
    await Vue.nextTick()
    expect(vm.$el instanceof Node).to.be.true
    expect(vm.$el.classList.contains('Loading')).to.be.true
  })
})
