<template>
  <div class="AppForm">
    <div v-if="submitted">Done</div>
    <template v-else>
      <Loading v-if="loading || submitting" />
      <form v-else @submit.prevent="submit">
        <div class="AppForm__Field" :class="{ '-valid': validations.phoneNumber }">
          <label class="AppForm__Label">Text me on</label>
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

        <div class="AppForm__Field" :class="{ '-valid': validations.low }">
          <label class="AppForm__Label">If price drops below (USD)</label>
          <div class="AppForm__Inputs">
            <input
              class="AppForm__Input"
              type="number"
              v-model.number="user.low"
              placeholder="$"
              min="0"
            >
          </div>
        </div>

        <div class="AppForm__Field" :class="{ '-valid': validations.high }">
          <label class="AppForm__Label">Or rises above (USD)</label>
          <div class="AppForm__Inputs">
            <input
              class="AppForm__Input"
              type="number"
              v-model.number="user.high"
              placeholder="$"
              min="0"
            >
          </div>
        </div>

        <Btn :disabled="!isValid">Confirm</Btn>
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

    .-valid &
      box-shadow: inset #24C875 0 0 0 1px

    .-invalid &
      box-shadow: inset #D0021B 0 0 0 1px

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
