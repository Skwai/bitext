<template>
  <div id="App">
    <h1>Bitcoin SMS Notifications</h1>

    <AppForm />
  </div>
</template>

<script>
import AppForm from '@/components/AppForm'

export default {
  components: {
    AppForm
  }
}
</script>

<style lang="stylus">
@require "./styles/reset.styl"
@require "./styles/config.styl"

html
  font-size: fontSizeRoot

body
  background: colorDarkBlue
  padding: spacingBase
  font-family: fontFamilyBase
  line-height: lineHeightBase
  color: #fff
  min-height: 100vh
  display: flex
  align-items: center
  justify-content: center

button, input, textarea
  font-size: 1rem
  line-height: lineHeightBase
  font-family: inherit

#App
  max-width: 400px
</style>
