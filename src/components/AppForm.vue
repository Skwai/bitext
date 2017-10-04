<template>
  <form class="AppForm" @submit.prevent="submit">


    <div class="AppForm__Field">
      <label class="AppForm__Label">SMS me on</label>
      <div class="AppForm__Inputs">
        <select class="AppForm__Input" v-model="user.countryCode">
          <option value="+1">+1</option>
        </select>
        <input class="AppForm__Input" type="tel" v-model="phoneNumber" placeholder="Mobile number">
      </div>
    </div>


    <div class="AppForm__Field">
      <label class="AppForm__Label">When bitcoin price</label>
      <div class="AppForm__Inputs">
        <select class="AppForm__Input" v-model="user.currency">
          <option value="USD" selected>USD</option>
        </select>
      </div>
    </div>

    <div class="AppForm__Field">
      <label class="AppForm__Label">Drops below</label>
      <div class="AppForm__Inputs">
        <input class="AppForm__Input" type="number" v-model="user.low" placeholder="$">
      </div>
    </div>

    <div class="AppForm__Field">
      <label class="AppForm__Label">Or rises above</label>
      <div class="AppForm__Inputs">
        <input class="AppForm__Input" type="number" v-model="user.high" placeholder="$">
      </div>
    </div>
    <Btn>Confirm</Btn>
  </form>
</template>

<script>
import Btn from '@/components/Btn'

export default {
  components: {
    Btn
  },

  data () {
    return {
      loading: true,

      user: {
        currency: 'USD',
        high: null,
        low: null,
        countryCode: '+1',
        phoneNumber: null
      }
    }
  },

  async created () {
    await Promise.all([
      this.$store.dispatch('getCountries'),
      this.$store.dispatch('getCurrencies')
    ])
    this.loading = false
  }
}
</script>

<style lang="stylus">
@require "../styles/config"

.AppForm
  text-transform: uppercase
  font-weight: 600

  &__Label
    display: block
    margin-bottom: spacingSmall

  &__Field
    margin: (spacingBase / 2) 0
    align-items: center

  &__Inputs
    display: flex

  &__Input
    flex: 1
    padding: 0.75rem
    border-radius: 4px
    border: 0
</style>
