<template>
  <div id="App">
    <AppHeader />
    <Price />
    <AppForm />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import AppForm from '@/components/AppForm'
import Price from '@/components/Price'

export default {
  components: {
    AppHeader,
    AppForm,
    Price
  }
}
</script>

<style lang="stylus">
@require "./styles/reset.styl"
@require "./styles/config.styl"

html
  font-size: fontSizeRoot

body
  padding: spacingBase
  font-family: fontFamilyBase
  line-height: lineHeightBase
  color: colorFont
  min-height: 100vh
  display: flex
  align-items: center
  justify-content: center
  color: #4A90E2

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

*
  box-sizing: border-box

#App
  width: 28rem
  max-width: 100%
</style>
