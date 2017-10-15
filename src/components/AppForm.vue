<template>
  <Loading v-if="loading || submitting" />
  <form v-else @submit.prevent="submit" class="AppForm">
    <div class="AppForm__Error" v-if="error">{{error}}</div>

    <p class="AppForm__Field" :class="{ '-valid': validations.phoneNumber }">
      <div class="AppForm__Inputs">
        <label class="AppForm__InputWrap -select">
          <span class="AppForm__Label">Country Phone Code</span>
          <select
            class="AppForm__Input"
            v-model="user.phoneCountryCode"
            id="AppForm__CountryCode"
          >
            <option
              v-for="(country, id) in countries"
              :key="id"
              :value="country.phoneCountryCode"
            >{{country.phoneCountryCode}} ({{country.abbreviation}})</option>
          </select>
        </label>
        <label class="AppForm__InputWrap">
          <span class="AppForm__Label">Mobile Number</span>
          <input
            id="AppForm__PhoneNumber"
            class="AppForm__Input"
            type="tel"
            v-model="user.phoneNumber"
            placeholder="Mobile number"
          >
        </label>
      </div>
    </p>

    <p class="AppForm__Field" :class="{ '-valid': validations.price }">
      <label class="AppForm__Label">When Bitcoin price is</label>
      <div class="AppForm__Inputs">
        <label class="AppForm__InputWrap -select">
          <span class="AppForm__Label">When price is</span>
          <select
            id="AppForm__Dir"
            class="AppForm__Input -select"
            v-model="user.dir"
          >
            <option value="GT">When more than</option>
            <option value="LT">When less than</option>
          </select>
        </label>
        <label class="AppForm__InputWrap">
          <span class="AppForm__Label">Price (USD)</span>
          <input
            id="AppForm__Price"
            class="AppForm__Input"
            type="tel"
            v-model.number="user.price"
            placeholder="$ USD"
          >
        </label>
      </div>
    </p>

    <p class="AppForm__Submit">
      <Btn :disabled="!isValid">Confirm</Btn>
    </p>

    <footer class="AppForm__Info">We won't share your details</footer>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
import { parse } from 'libphonenumber-js'

import Btn from '@/components/Btn'
import Loading from '@/components/Loading'
import User from '@/models/User'

export default {
  components: {
    Btn,
    Loading
  },

  data () {
    return {
      submitting: false,
      loading: true,
      error: false,
      user: new User()
    }
  },

  computed: {
    validations () {
      const { user } = this
      return {
        price: !isNaN(user.price) && Number(user.price) > 0,
        phoneNumber: 'phone' in parse(`${user.phoneCountryCode}${user.phoneNumber}`)
      }
    },
    isValid () {
      return Object.values(this.validations).every(v => v)
    },
    ...mapGetters(['countries'])
  },

  methods: {
    addAnother () {
      this.user.dir = 'GT'
      this.user.price = null
    },
    async submit () {
      this.submitting = true
      this.error = false
      try {
        await this.$store.dispatch('addUser', this.user)
        this.$store.dispatch('wasSubmitted')
      } catch (err) {
        this.error = 'There was a problem submitting form'
      } finally {
        this.submitting = false
      }
    }
  },

  async created () {
    await this.$store.dispatch('getCountries')
    this.loading = false
  }
}
</script>

<style lang="stylus">
@require "../styles/config"

.AppForm
  &__Label
    sr()

  &__Field
    margin: 0 0 spacingBase
    align-items: center

  &__Error
    color: colorError
    margin-bottom: spacingBase
    text-align: center
    font-weight: 500

  &__Inputs
    display: flex
    background: #fff
    border-radius: 2px
    box-shadow: currentColor 0 0 0 1px
    position: relative

    &::after
      position: absolute
      content: ""
      background: currentColor
      right: 0
      height: 100%
      top: 0
      width: 2.5rem
      opacity: 0
      background-size: 1.5rem 1.5rem
      background-position: center center
      background-repeat: no-repeat


    .-valid &
      color: colorPrimary

      &::after
        opacity: 1
        background-image: embedurl("../assets/check.svg", "utf8")

  &__InputWrap + &__InputWrap
    border-left: currentColor solid 1px

  &__InputWrap
    flex: 50%
    position: relative

    &.-select
      cursor: pointer

      &::after
        content: ""
        border-top: 5px currentColor solid
        border-left: 5px transparent solid
        border-right: 5px transparent solid
        width: 0
        height: 0
        right: 1rem
        top: 50%
        transform: translate(0, -50%)
        position: absolute

  &__Input
    padding: 1rem
    border: 0
    background: transparent
    -moz-appearance: none
    -webkit-appearance: none
    box-sizing: border-box
    transition: transitionBase
    width: 100%
    border-radius: 0 // iOS

    &::placeholder
      color: currentColor
      opacity: .7

    &:focus,
    &:hover
      outline: 0
      background: rgba(colorPrimary, .1)

  &__Submit
    margin-top: spacingLarge
    margin-bottom: spacingLarge
    text-align: center

  &__Info
    font-size: 87.5%
    opacity: .7
    text-align: center
</style>
