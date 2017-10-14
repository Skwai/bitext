<template>
  <div class="Price">
    <div class="Price__Label">Current Price (USD)</div>
    <Loading v-if="loading" />
    <h2 v-else-if="btcPriceDollars" class="Price__Value">
      <small class="Price__Symbol">$</small><span class="Price__Dollars">{{btcPriceDollars}}</span>
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
    loading () {
      return !this.btcPriceDollars
    },
    ...mapGetters(['btcPriceDollars'])
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

  &__Symbol
    font-weight: 500
    letter-spacing: 0.05em
    font-size: 1rem
    vertical-align: baseline
    transform: translateY(-0.65rem)
    display: inline-block
</style>
