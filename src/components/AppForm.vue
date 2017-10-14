<template>
  <div class="AppForm">
    <div v-if="submitted" class="AppForm__Submitted">
      <svg class="AppForm__SubmittedIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
      <span class="AppForm__SubmittedMessage">All done</span>
    </div>
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
          <label class="AppForm__Label">Text me once on</label>
          <div class="AppForm__Inputs">
            <select
              class="AppForm__Input"
              v-model="user.phoneCountryCode"
            >
              <option
                v-for="(country, id) in countries"
                :key="id"
                :value="country.phoneCountryCode"
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

        <div
          class="AppForm__Field"
          :class="{
            '-valid': validations.price,
            '-invalid': !validations.price
          }"
        >
          <label class="AppForm__Label">When Bitcoin price is</label>
          <div class="AppForm__Inputs">
            <select
              class="AppForm__Input"
              v-model="user.dir"
            >
              <option value="GT">Greater than</option>
              <option value="LT">Less than</option>
            </select>
            <input
              class="AppForm__Input"
              type="tel"
              v-model.number="user.price"
              placeholder="$"
            >
          </div>
        </div>

        <div class="AppForm__Submit">
          <Btn :disabled="!isValid">Confirm</Btn>
          <div class="AppForm__SubmitInfo">We won't share your details</div>
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
        created: new Date(),
        notified: null,

        price: null,
        dir: 'GT',
        phoneCountryCode: '+1',
        phoneNumber: null
      }
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
    await this.$store.dispatch('getCountries')
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

  &__Submitted
    text-align: center

    &Icon
      width: 3rem
      height: 3rem
      fill: currentColor

    &Message
      display: block
      text-transform: uppercase
      font-weight: 600

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

    select&
      width: 8rem

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
