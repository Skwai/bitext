<template>
  <form class="AppForm" @submit.prevent="submit" v-if="!loading">

    <div class="AppForm__Field">
      <label class="AppForm__Label">SMS me on</label>
      <div class="AppForm__Inputs">
        <select class="AppForm__Input" v-model="user.phoneCountryCode">
          <option
            v-for="(country, id) in countries"
            :key="id"
            :value="id"
          >{{country.phoneCountryCode}} ({{country.abbreviation}})</option>
        </select>
        <input
          class="AppForm__Input"
          type="tel"
          v-model="user.phoneNumber"
          placeholder="Mobile number"
        >
      </div>
    </div>

    <div class="AppForm__Field">
      <label class="AppForm__Label">Drops below</label>
      <div class="AppForm__Inputs">
        <input
          class="AppForm__Input"
          type="number"
          v-model="user.low"
          placeholder="$"
        >
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
import { mapGetters } from 'vuex'
import Btn from '@/components/Btn'
import User from '@/models/User'

export default {
  components: {
    Btn
  },

  data () {
    return {
      loading: true,
      user: new User()
    }
  },

  computed: {
    isValid () {
      return this.user.isValid()
    },
    ...mapGetters(['countries', 'currencies'])
  },

  methods: {
    submit () {
      this.$store.dispatch('addUser', this.user)
    }
  },

  async created () {
    await Promise.all([
      this.$store.dispatch('getCountries'),
      this.$store.dispatch('getCurrencies')
    ])
    this.user.phoneCountryCode = Object.keys(this.countries).pop()
    this.loading = false
  }
}
</script>

<style lang="stylus">
@require "../styles/config"

.AppForm
  text-transform: uppercase
  font-weight: 600
  background: #fff
  padding: spacingBase
  border-radius: borderRadiusBase

  &__Label
    display: block
    margin-bottom: spacingSmall
    font-size: fontSizeSmall
    color: rgba(colorFont, 0.6)

  &__Field
    margin: 0 0 spacingBase
    align-items: center

  &__Inputs
    display: flex
    background: rgba(colorFont, 0.05)
    border-radius: 2px

  &__Input
    padding: spacingSmall
    border-radius: 4px
    border: 0
    background: transparent
    -webkit-appearance: none
    box-sizing: border-box

    input&
      flex: 1

    &::placeholder
      color: fontColor

    &:focus
      outline: 0
</style>
