<template>
  <div id="App">
    <h1>Bitcoin Notifications</h1>

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
  background: #eaebec
  padding: spacingBase
  font-family: fontFamilyBase
  line-height: lineHeightBase
  color: colorFont
  min-height: 100vh
  display: flex
  align-items: center
  justify-content: center

button,
input,
textarea,
select
  font-size: 1rem
  line-height: lineHeightBase
  font-family: inherit
  color: inherit

h1
  margin-bottom: spacingBase
  text-align: center

#App
  width: 100%
  max-width: 400px
</style>
