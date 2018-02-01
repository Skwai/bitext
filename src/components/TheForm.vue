<template>
  <AppLoading v-if="submitting" />
  <form v-else @submit.prevent="submit" :class="$style.AppForm">
    <div :class="$style.AppForm__Error" v-if="error">{{error}}</div>
    <div :class="{
      [$style.AppForm__Field]: true,
      [$style.AppForm__FieldValid]: validations.phoneNumber
    }">
      <div :class="$style.AppForm__Inputs">
        <label :class="[$style.AppForm__InputWrap, $style.AppForm__InputWrapSelect]">
          <span :class="$style.AppForm__Label">Country Phone Code</span>
          <select
            :class="$style.AppForm__Input"
            v-model="user.phoneCountryCode"
            id="AppForm__CountryCode"
          >
            <option
              v-for="(country, id) in countries"
              :key="id"
              :value="country.phoneCode"
            >{{country.phoneCode}} ({{country.name}})</option>
          </select>
        </label>
        <label :class="$style.AppForm__InputWrap">
          <span :class="$style.AppForm__Label">Mobile Number</span>
          <input
            id="AppForm__PhoneNumber"
            :class="$style.AppForm__Input"
            type="tel"
            v-model="user.phoneNumber"
            placeholder="Mobile number"
          >
        </label>
      </div>
    </div>

    <div :class="{
      [$style.AppForm__Field]: true,
      [$style.AppForm__FieldValid]: validations.price
    }">
      <div :class="$style.AppForm__Inputs">
        <label :class="[$style.AppForm__InputWrap, $style.AppForm__InputWrapSelect]">
          <span :class="$style.AppForm__Label">When price is</span>
          <select
            :class="$style.AppForm__Input"
            id="AppForm__Dir"
            v-model="user.dir"
          >
            <option value="GT">When more than</option>
            <option value="LT">When less than</option>
          </select>
        </label>
        <label :class="$style.AppForm__InputWrap">
          <span :class="$style.AppForm__Label">Price (USD)</span>
          <input
            id="AppForm__Price"
            :class="$style.AppForm__Input"
            type="tel"
            v-model.number="user.price"
            placeholder="$ USD"
          >
        </label>
      </div>
    </div>

    <div :class="$style.AppForm__Submit">
      <AppButton :disabled="!isValid">Confirm</AppButton>
    </div>

    <footer :class="$style.AppForm__Info">We won't share your details</footer>
  </form>
</template>

<script lang="ts">
import { parse } from 'libphonenumber-js'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mapGetters } from 'vuex'
import { Action, Getter } from 'vuex-class'

import * as countries from '../data/countries.json'
import User from '../models/User'
import AppButton from './AppButton.vue'
import AppLoading from './AppLoading.vue'

interface ICountryCode {
  name: string
  phoneCode: string
  code: string
}

@Component({
  components: {
    AppButton,
    AppLoading
  }
})
export default class TheForm extends Vue {
  private error: string | null = null
  private submitting: boolean = false
  private user: User = new User()

  @Action private setStoredPhoneNumber: (phoneNumber: string) => void

  @Action private setStoredCountryCode: (countryCode: string) => void

  @Getter private storedPhoneNumber: string

  @Getter private storedCountryCode: string

  @Watch('user.phoneNumber')
  private onPhoneNumberChanged(val: string) {
    this.setStoredPhoneNumber(val)
  }

  @Watch('user.phoneCountryCode')
  private onPhoneCountryCodeChanged(val: string) {
    this.setStoredCountryCode(val)
  }

  get countries(): ICountryCode[] {
    return countries.sort((a: ICountryCode, b: ICountryCode) => {
      return a.phoneCode < b.phoneCode ? -1 : 1
    })
  }

  get validations() {
    const { phone } = this.parsedPhoneNumber
    const phoneNumber = phone && phone === this.user.phoneNumber
    const price = !isNaN(this.user.price) && Number(this.user.price) > 0
    return {
      phoneNumber,
      price
    }
  }

  get isValid() {
    return Object.values(this.validations).every((v) => v)
  }

  get parsedPhoneNumber() {
    return parse(`${this.user.phoneCountryCode}${this.user.phoneNumber}`)
  }

  private async submit() {
    if (this.submitting || !this.isValid) {
      return
    }
    this.submitting = true
    this.error = null
    try {
      await this.$store.dispatch('addUser', this.user)
      this.$store.dispatch('wasSubmitted')
    } catch (err) {
      this.error = 'There was a problem submitting form'
    } finally {
      this.submitting = false
    }
  }
  private loadStoredPhoneNumber() {
    const { user, storedPhoneNumber, storedCountryCode } = this

    if (storedPhoneNumber) {
      user.phoneNumber = storedPhoneNumber
    }

    if (storedCountryCode) {
      user.phoneCountryCode = storedCountryCode
    }
  }

  private created() {
    this.loadStoredPhoneNumber()
  }
}
</script>

<style lang="stylus" module>
@require "../styles/config"

.AppForm
  &__Label
    sr()

  &__Field
    margin: 0 0 spacingBase
    align-items: center

  &__FieldValid &__Inputs
    color: colorPrimary

    &::after
      opacity: 1
      background-image: embedurl("../assets/check.svg", "utf8")

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

  &__InputWrap + &__InputWrap
    border-left: currentColor solid 1px

  &__InputWrap
    flex: 50%
    position: relative

    &Select
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
