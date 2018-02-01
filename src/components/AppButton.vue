<template>
  <button
    type="submit"
    :class="$style.AppButton"
    :disabled="!!disabled"
  ><slot /></button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class AppButton extends Vue {
  @Prop({ required: true })
  private disabled: boolean
}
</script>

<style lang="stylus" module>
@require "../styles/config.styl"

.AppButton
  border: 0
  background: colorPrimary
  color: #fff
  padding: 1rem 2rem
  border-radius: borderRadiusBase
  caps()
  cursor: pointer
  transition: transitionBase
  width: 100%

  &[disabled]
    cursor: not-allowed
    background: rgba(colorPrimary, .5)
    color: rgba(255,255,255,.7)

  &:hover,
  &:focus
    &:not([disabled])
      background: darken(colorPrimary, 5)
</style>
