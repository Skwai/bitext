import { createLocalVue, mount, MountOptions } from 'vue-test-utils'
import Vuex, { Store } from 'vuex'
import ThePrice from '@/components/ThePrice.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('ThePrice.vue', () => {
  let store = new Vuex.Store({})

  beforeEach(() => {
    store = new Vuex.Store({
      actions: {
        getBtcPrice: () => Promise.resolve()
      },
      getters: {
        btcPrice: () => 100.25
      }
    })
  })

  it('Should render correct price', () => {
    const options: MountOptions<ThePrice> = {
      store,
      localVue
    }
    const wrapper = mount(ThePrice, options)
    const h2 = wrapper.find('h2')
    expect(h2.text()).toEqual('$100.25')
  })
})
