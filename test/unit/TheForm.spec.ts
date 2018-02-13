import TheForm from '@/components/TheForm.vue'
import { shallow, createLocalVue, MountOptions, Wrapper } from 'vue-test-utils'
import Vuex, { Store } from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('TheForm.vue', () => {
  let wrapper: Wrapper<TheForm>
  let store: Store<{}>
  let actions: any

  beforeEach(() => {
    actions = {
      addUser: jest.fn(),
      wasSubmitted: jest.fn(),
      setStoredPhoneNumber: jest.fn(),
      setStoredCountryCode: jest.fn()
    }

    store = new Vuex.Store({
      state: {},
      actions,
      getters: {
        storedPhoneNumber: () => null,
        storedCountryCode: () => null
      }
    })
    const options: MountOptions<TheForm> = { store, localVue }
    wrapper = shallow(TheForm, options)
  })

  it('Should render form when loaded', () => {
    expect(wrapper.isVueInstance()).toEqual(true)
    expect(wrapper.is('form'))
  })

  it('Should be disabled by default', () => {
    const button = wrapper.find('button')
    expect((button.attributes() as any).disabled).toEqual('disabled')
    wrapper.trigger('submit')
    expect(actions.addUser).not.toHaveBeenCalled()
  })

  it('Should not be disabled if form is valid', async () => {
    wrapper.setData({
      user: {
        phoneNumber: '412345678',
        phoneCountryCode: '+61',
        price: 5000,
        dir: 'LT'
      }
    })
    const button = wrapper.find('button')
    expect((button.attributes() as any).disabled).toBeUndefined()
    const { vm }: { vm: any } = wrapper
    wrapper.trigger('submit')
    expect(vm.submitting).toEqual(true)
    expect(actions.addUser).toHaveBeenCalled()
  })
})
