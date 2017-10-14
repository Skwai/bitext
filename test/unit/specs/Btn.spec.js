import Vue from 'vue'
import Btn from '@/components/Btn'

describe('Btn.vue', () => {
  it('Should render correct button', async () => {
    const vm = new Vue({
      template: '<div><Btn>Example</Btn></div>',
      components: { Btn }
    }).$mount()

    await Vue.nextTick()
    const el = vm.$el.querySelector('.Btn')
    expect(el.textContent).to.equal('Example')
    expect(el.getAttribute('disabled')).to.not.equal('disabled')
  })

  it('Should render disabled button', async () => {
    const vm = new Vue({
      template: '<div><Btn disabled=true>Example</Btn></div>',
      components: { Btn }
    }).$mount()

    await Vue.nextTick()
    const el = vm.$el.querySelector('.Btn')
    expect(el.getAttribute('disabled')).to.equal('disabled')
  })
})
