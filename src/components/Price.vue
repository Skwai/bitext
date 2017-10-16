<template>
  <div class="Price">
    <div class="Price__Label">Current Price (USD)</div>
    <Loading v-if="loading" />
    <h2 v-else-if="btcPrice" class="Price__Value">
      <small class="Price__Symbol">$</small><span class="Price__Dollars">{{price.dollars}}</span><small class="Price__Cents">.{{price.cents}}</small>
    </h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loading from '@/components/Loading'

const UPDATE_INTERVAL = 30 * 1000 // ms

export default {
  components: {
    Loading
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

<style lang="stylus">
@require "../styles/config.styl"

.Price
  margin-bottom: spacingLarge
  text-align: center
  padding: spacingBase
  background: rgba(colorPrimary, 0.1)
  border-radius: borderRadiusBase
  border: currentColor solid 1px

  &__Label
    caps()
    margin-bottom: 0.25rem

  &__Value
    font-size: 2rem
    font-weight: 600

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
