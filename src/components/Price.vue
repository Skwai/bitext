<template>
  <div class="Price">
    <div class="Price__Label">Current Price</div>
    <Loading v-if="loading" />
    <h2 v-else-if="btcPrice" class="Price__Value">
      <span>{{btcPrice.toFixed(2).toLocaleString()}}</span>
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
  border-top: rgba(colorPrimary, .2) solid 2px
  padding: spacingBase
  border-bottom: rgba(colorPrimary, .2) solid 2px

  &__Label
    caps()
    margin-bottom: 0.5rem

  &__Value
    font-weight: 600

  &__Currency
    font-weight: 400
    letter-spacing: 0.05em
    opacity: .6
    display: inline-block
</style>
