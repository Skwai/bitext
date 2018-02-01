<template>
  <header :class="$style.TheHeader">
    <div :class="$style.TheHeader__Logo">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 273.6 360"><path d="M217.021 167.042c18.631-9.483 30.288-26.184 27.565-54.007-3.667-38.023-36.526-50.773-78.006-54.404l-.008-52.741h-32.139l-.009 51.354c-8.456 0-17.076.166-25.657.338l-.007-51.685-32.11-.003-.006 52.728c-6.959.142-13.793.277-20.466.277v-.156l-44.33-.018.006 34.282s23.734-.446 23.343-.013c13.013.009 17.262 7.559 18.484 14.076l.01 60.083v84.397c-.573 4.09-2.984 10.625-12.083 10.637.414.364-23.379-.004-23.379-.004l-6.375 38.335h41.817c7.792.009 15.448.13 22.959.19l.028 53.338 32.102.009-.009-52.779c8.832.18 17.357.258 25.684.247l-.009 52.532h32.138l.018-53.249c54.022-3.1 91.842-16.697 96.544-67.385 3.79-40.809-15.434-59.025-46.105-66.379zM109.535 95.321c18.126 0 75.132-5.767 75.14 32.064-.008 36.269-56.996 32.032-75.14 32.032V95.321zm-.014 167.126l.014-70.672c21.778-.006 90.085-6.261 90.094 35.32.009 39.876-68.316 35.336-90.108 35.352z"/></svg>
    </div>
    <h1 :class="$style.TheHeader__Title">Bitcoin SMS Alerts</h1>
    <h2 :class="$style.TheHeader__Description">Enter your mobile number and get a one-time SMS notification when Bitcoin reaches a given price</h2>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class TheHeader extends Vue {}
</script>

<style lang="stylus" module>
@require "../styles/config"

.TheHeader
  margin: 0 auto spacingLarge

  &__Title
    caps()
    font-size: 1.25rem
    text-align: center
    margin-bottom: spacingBase

  &__Description
    font-weight: 400
    font-size: 1rem
    text-align: center

  &__Logo
    width: 4rem
    height: 4rem
    border: colorPrimary solid 3px
    border-radius: 50%
    display: flex
    align-items: center
    justify-content: center
    margin: 0 auto spacingBase

    svg
      width: 50%
      height: 50%
      fill: currentColor
</style>
