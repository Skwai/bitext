<template>
  <div class="Price">
    <div class="Price__Label">Current Price</div>
    <Loading v-if="loading" />
    <h2 v-else-if="btcPrice" class="Price__Value">
      <span><small class="Price__Symbol">$</small>{{btcPrice.toFixed(2).toLocaleString()}}</span>
      <small class="Price__Currency">USD</small>
    </h2>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loading from '@/components/Loading'

export default {
  components: {
    Loading
  },
  data () {
    return {
      loading: true
    }
  },
  computed: {
    ...mapGetters(['btcPrice'])
  },
  async created () {
    await this.$store.dispatch('getBtcPrice')
    this.loading = false
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"

.Price
  margin-bottom: spacingBase
  text-align: center
  padding: spacingBase
  border-top: rgba(colorPrimary, .2) solid 2px
  border-bottom: rgba(colorPrimary, .2) solid 2px

  &__Label
    caps()
    margin-bottom: 0.25rem
    opacity: .7

  &__Value
    font-weight: 600
    font-size: 2rem

  &__Symbol,
  &__Currency
    font-weight: 400
    letter-spacing: 0.05em
    opacity: .7
    font-size: 62.5%
    vertical-align: baseline
    transform: translateY(-0.5rem)
    display: inline-block
</style>
