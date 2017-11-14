<template>
  <div :class="$style.ThePrice">
    <div :class="$style.ThePrice__Content">
      <div :class="$style.ThePrice__Label">Current Price (USD)</div>
      <AppLoading v-if="loading" />
      <h2 v-else-if="btcPrice" :class="$style.ThePrice__Value">
        <small :class="$style.ThePrice__Symbol">$</small><span :class="$style.ThePrice__Dollars">{{price.dollars}}</span><small :class="$style.ThePrice__Cents">.{{price.cents}}</small>
      </h2>
    </div>
    <ThePriceChart />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppLoading from '@/components/AppLoading'
import ThePriceChart from '@/components/ThePriceChart'

const UPDATE_INTERVAL = 30 * 1000 // ms

export default {
  components: {
    AppLoading,
    ThePriceChart
  },

  computed: {
    price () {
      const { btcPrice } = this
      const [dollars, cents] = Number(btcPrice)
        .toFixed(2)
        .split('.')
        .map((n) => Number(n).toLocaleString())

      return {
        dollars,
        cents: Number(cents) < 10 ? `${cents}0` : cents
      }
    },
    loading () {
      return !this.btcPrice
    },
    ...mapGetters(['btcPrice'])
  },

  methods: {
    getPrice () {
      this.$store.dispatch('getBtcPrice')
      setTimeout(this.getPrice, UPDATE_INTERVAL)
    }
  },

  created () {
    this.getPrice()
  }
}
</script>

<style lang="stylus" module>
@require "../styles/config.styl"

.ThePrice
  margin-bottom: spacingLarge
  text-align: center
  padding: spacingBase
  background: #fff
  border-radius: borderRadiusBase
  border: colorPrimary solid 1px
  position: relative
  min-height: 10rem
  display: flex
  align-items: center
  justify-content: center
  overflow: hidden
  color: colorPrimary

  &__Content
    position: relative
    z-index: 2

  &__Label
    caps()
    margin-bottom: 0.25rem

  &__Value
    font-size: 2rem
    font-weight: 600
    margin: 0

  &__Symbol
  &__Cents
    font-size: 1.125rem
    vertical-align: baseline
    transform: translateY(-0.45em)
    display: inline-block
    opacity: .7

  &__Symbol
    margin-right: 2px

  &__Cents
    margin-left: 2px
</style>
