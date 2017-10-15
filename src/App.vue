<template>
  <main id="App">
    <AppHeader />
    <Price />
    <Submitted v-if="submitted" />
    <AppForm v-else />
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import AppHeader from '@/components/AppHeader'
import AppForm from '@/components/AppForm'
import Price from '@/components/Price'
import Submitted from '@/components/Submitted'

export default {
  components: {
    AppHeader,
    AppForm,
    Price,
    Submitted
  },

  computed: {
    ...mapGetters(['submitted'])
  }
}
</script>

<style lang="stylus">
@require "./styles/reset.styl"
@require "./styles/config.styl"

html
  font-size: (fontSizeRoot - 2px)

  @media (min-width: 768px)
    font-size: (fontSizeRoot - 1px)

  @media (min-width: 1024px)
    font-size: (fontSizeRoot)

body
  padding: spacingBase
  font-family: fontFamilyBase
  color: colorPrimary

body,
button,
input,
textarea,
select
  line-height: lineHeightBase
  font-size: 1rem

button,
input,
textarea,
select
  font-family: inherit
  color: inherit

*
  box-sizing: border-box

#App
  width: 28rem
  max-width: 100%
  margin: 5vh auto 5vh
</style>
