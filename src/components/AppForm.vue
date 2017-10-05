<template>
  <div class="AppForm">
    <div v-if="submitted">Done</div>
    <template v-else>
      <Loading v-if="loading || submitting" />
      <form v-else @submit.prevent="submit">
        <div
          class="AppForm__Field"
          :class="{
            '-valid': validations.phoneNumber,
            '-invalid': !validations.phoneNumber
          }"
        >
          <label class="AppForm__Label">Text me on</label>
          <div class="AppForm__Inputs">
            <select
              class="AppForm__Input"
              v-model.lazy="user.phoneCountryCode"
            >
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

        <div class="AppForm__Field" :class="{ '-valid': validations.low,
            '-invalid': !validations.low }">
          <label class="AppForm__Label">If Bitcoin price drops below</label>
          <div class="AppForm__Inputs">
            <input
              class="AppForm__Input"
              type="number"
              v-model.number="user.low"
              placeholder="$ USD"
              min="0"
            >
          </div>
        </div>

        <div class="AppForm__Field" :class="{ '-valid': validations.high,
            '-invalid': !validations.high }">
          <label class="AppForm__Label">Or rises above</label>
          <div class="AppForm__Inputs">
            <input
              class="AppForm__Input"
              type="number"
              v-model.number="user.high"
              placeholder="$ USD"
              min="0"
            >
          </div>
        </div>

        <div class="AppForm__Submit">
          <Btn :disabled="!isValid">Confirm</Btn>
          <div class="AppForm__SubmitInfo">We won't text you more than once a day</div>
        </div>

      </form>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { parse } from 'libphonenumber-js'

import Btn from '@/components/Btn'
import Loading from '@/components/Loading'

export default {
  components: {
    Btn,
    Loading
  },

  data () {
    return {
      submitted: false,
      submitting: false,
      loading: true,
      user: {
        active: true,
        createdA: new Date(),
        high: null,
        low: null,
        phoneCountryCode: null,
        phoneNumber: null
      }
    }
  },

  computed: {
    countryAbbreviation () {
      const { user, countries } = this
      return user.phoneCountryCode
        ? countries[user.phoneCountryCode].abbreviation
        : null
    },
    validations () {
      const { user, countryAbbreviation } = this

      return {
        high: !isNaN(user.high) && Number(user.high) > 0,
        low: !isNaN(user.low) && Number(user.low) > 0,
        phoneNumber: 'phone' in parse(user.phoneNumber, countryAbbreviation)
      }
    },
    isValid () {
      return Object.values(this.validations).every(v => v)
    },
    ...mapGetters(['countries'])
  },

  methods: {
    async submit () {
      this.submitting = true
      try {
        await this.$store.dispatch('addUser', this.user)
        this.submitted = true
      } finally {
        this.submitting = false
      }
    }
  },

  async created () {
    await Promise.all([
      this.$store.dispatch('getCountries')
    ])
    this.user.phoneCountryCode = Object.keys(this.countries).pop()
    this.loading = false
  }
}
</script>

<style lang="stylus">
@require "../styles/config"

.AppForm
  &__Label
    display: block
    margin-bottom: spacingSmall
    font-weight: 500

  &__Field
    margin: 0 0 spacingBase
    align-items: center

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

    /*
    .-invalid &
      color: #D0021B

      &::after
        opacity: 1
        background-image: embedurl("../assets/remove.svg", "utf8")
    */

  &__Input + &__Input
    border-left: currentColor solid 1px

  &__Input
    padding: spacingSmall
    border: 0
    background: transparent
    -webkit-appearance: none
    box-sizing: border-box
    transition: transitionBase

    input&
      flex: 1

    &::placeholder
      color: currentColor
      opacity: .7

    &:focus
      outline: 0
      background: rgba(colorPrimary, .1)

  &__Submit
    display: flex
    align-items: center
    margin-top: 2rem

    &Info
      margin-left: spacingBase
      font-size: 87.5%
      opacity: .7
</style>
