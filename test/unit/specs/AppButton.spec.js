import Vue from 'vue'
import AppButton from '@/components/AppButton'

describe('AppButton.vue', () => {
  it('Should render correct button', async () => {
    const vm = new Vue({
      template: '<div><AppButton>Example</AppButton></div>',
      components: { AppButton }
    }).$mount()

    await Vue.nextTick()
    const el = vm.$el.querySelector('button')
    expect(el.textContent).to.equal('Example')
    expect(el.getAttribute('disabled')).to.not.equal('disabled')
  })

  it('Should render disabled button', async () => {
    const vm = new Vue({
      template: '<div><AppButton disabled=true>Example</AppButton></div>',
      components: { AppButton }
    }).$mount()

    await Vue.nextTick()
    const el = vm.$el.querySelector('button')
    expect(el.getAttribute('disabled')).to.equal('disabled')
  })
})
