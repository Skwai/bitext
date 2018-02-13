<template>
  <div class="ThePriceChart"></div>
</template>

<script lang="ts">
import Chartist from 'chartist'
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

const CHARTIST_OPTIONS: Chartist.ILineChartOptions = {
  axisX: {
    offset: 0,
    showGrid: false,
    showLabel: false
  },
  axisY: {
    offset: 0,
    showGrid: false,
    showLabel: false
  },
  chartPadding: { top: 0, left: 0, bottom: 0, right: 0 },
  fullWidth: true,
  low: 0,
  showArea: true,
  showPoint: false
}

@Component
export default class ThePriceChart extends Vue {
  private chart: Chartist.IChartistLineChart | null = null

  @Getter private historicalBtcPrices: any

  @Action private getHistoricalBtcPrices: () => Promise<void>

  private async created() {
    await this.getHistoricalBtcPrices()
    await this.$nextTick()
    this.renderChart()
  }

  get priceData(): number[] {
    return Object.values(this.historicalBtcPrices)
  }

  private renderChart() {
    this.chart = new Chartist.Line(
      this.$el,
      {
        series: [this.priceData]
      },
      CHARTIST_OPTIONS
    )
  }
}
</script>

<style lang="stylus">
.ThePriceChart {
  line-height: 0;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;

  .ct-area {
    fill: #499AFF;
    fill-opacity: 0.15;
  }

  .ct-line {
    stroke: #499AFF;
    stroke-width: 1px;
    stroke-opacity: 0.5;
    fill: none;
  }
}
</style>
