<template>
  <main id="App">
    <TheHeader />
    <ThePrice />
    <TheSubmitted v-if="submitted" />
    <TheForm v-else />
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import TheForm from '@/components/TheForm'
import TheHeader from '@/components/TheHeader'
import ThePrice from '@/components/ThePrice'
import TheSubmitted from '@/components/TheSubmitted'

export default {
  components: {
    TheForm,
    TheHeader,
    ThePrice,
    TheSubmitted
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
