<template>
  <div id="App">
    <AppHeader />
    <AppForm />
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import AppForm from '@/components/AppForm'

export default {
  components: {
    AppHeader,
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
