<template>
  <div class="ThePriceChart"></div>
</template>

<script>
import Chartist from 'chartist'
import { mapGetters } from 'vuex'

export default {
  async created () {
    await this.$store.dispatch('getHistoricalBtcPrices')
    await this.$nextTick()
    this.renderChart()
  },

  computed: {
    priceData () {
      return Object.values(this.historicalBtcPrices)
    },
    ...mapGetters(['historicalBtcPrices'])
  },

  methods: {
    renderChart () {
      /* eslint-disable no-new */
      new Chartist.Line(this.$el, {
        series: [ this.priceData ]
      }, {
        chartPadding: 0,
        fullWidth: true,
        low: 0,
        showArea: true,
        showPoint: false,
        axisX: {
          showLabel: false,
          showGrid: false,
          offset: 0
        },
        axisY: {
          showLabel: false,
          showGrid: false,
          offset: 0
        }
      })
    }
  }
}
</script>

<style lang="stylus">
@import "../styles/config.styl"

.ThePriceChart
  line-height: 0
  position: absolute
  left: 0
  top: 0
  bottom: 0
  right: 0

  .ct-area
    fill: colorPrimary
    fill-opacity: .15

  .ct-line
    stroke: colorPrimary
    stroke-width: 1px
    stroke-opacity: 1
    fill: none
</style>
