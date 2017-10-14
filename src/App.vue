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
  font-size: fontSizeMobile

  @media (min-width: 768px)
    font-size: fontSizeTablet

  @media (min-width: 1024px)
    font-size: fontSizeDesktop

  @media (min-width: 1280px)
    font-size: fontSizeBase

body
  padding: spacingBase
  font-family: fontFamilyBase
  line-height: lineHeightBase
  color: colorFont

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
  margin: 5vh auto 5vh
</style>
