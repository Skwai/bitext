<template>
  <main :class="$style.App">
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

<style lang="stylus" module>
@require "./styles/config.styl"

html
  font-size: 14px

  @media (min-width: 768px)
    font-size: 15px

  @media (min-width: 1024px)
    font-size: 16px

button,
input,
textarea,
select
  line-height: inherit
  font-size: inherit

button,
input,
textarea,
select
  font-family: inherit
  color: inherit

.App
  width: 28rem
  max-width: 100%
  margin: 5vh auto 5vh
  font-family: fontFamilyBase
  color: colorPrimary
  line-height: lineHeightBase
  font-size: 1rem

  *
    box-sizing: border-box
</style>
