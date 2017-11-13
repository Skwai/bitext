<template>
  <div class="ThePriceChart"></div>
</template>

<script>
import Chartist from 'chartist'

const data = JSON.parse(`{
  "bpi": {
    "2017-10-12": 5439.1338,
    "2017-10-13": 5640.1275,
    "2017-10-14": 5809.6938,
    "2017-10-15": 5697.3917,
    "2017-10-16": 5754.2213,
    "2017-10-17": 5595.235,
    "2017-10-18": 5572.1988,
    "2017-10-19": 5699.5838,
    "2017-10-20": 5984.0863,
    "2017-10-21": 6013.2288,
    "2017-10-22": 5984.9563,
    "2017-10-23": 5895.2988,
    "2017-10-24": 5518.85,
    "2017-10-25": 5733.9038,
    "2017-10-26": 5888.145,
    "2017-10-27": 5767.68,
    "2017-10-28": 5732.825,
    "2017-10-29": 6140.5313,
    "2017-10-30": 6121.8,
    "2017-10-31": 6447.6675,
    "2017-11-01": 6750.1725,
    "2017-11-02": 7030.0025,
    "2017-11-03": 7161.4513,
    "2017-11-04": 7386.9988,
    "2017-11-05": 7382.4488,
    "2017-11-06": 6958.2113,
    "2017-11-07": 7118.8013,
    "2017-11-08": 7458.795,
    "2017-11-09": 7146.7813,
    "2017-11-10": 6570.3125,
    "2017-11-11": 6337,
    "2017-11-12": 5857.3175
  },
  "disclaimer": "This data was produced from the CoinDesk Bitcoin Price Index. BPI value data returned as USD.",
  "time": {
    "updated": "Nov 13, 2017 00:03:00 UTC",
    "updatedISO": "2017-11-13T00:03:00+00:00"
  }
}`)

export default {
  mounted () {
    /* eslint-disable no-new */
    new Chartist.Line(this.$el, {
      series: [ Object.values(data.bpi) ]
    }, {
      chartPadding: 0,
      fullWidth: true,
      low: 0,
      showArea: true,
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
    fill-opacity: .2

  .ct-line
    stroke: colorPrimary
    stroke-width: 1px
    stroke-opacity: 1
    fill: none
</style>
