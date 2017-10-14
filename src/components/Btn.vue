<template>
  <button type="submit" class="Btn" :disabled="!!disabled"><slot /></button>
</template>

<script>
export default {
  props: ['disabled']
}
</script>

<style lang="stylus">
@require "../styles/config.styl"

.Btn
  border: 0
  background: transparent
  background: colorPrimary
  color: #fff
  padding: 1rem 2rem
  border-radius: borderRadiusBase
  caps()
  cursor: pointer
  transition: 0.2s
  width: 100%

  &[disabled]
    cursor: not-allowed
    color: rgba(255,255,255,.7)

  &:hover,
  &:focus
    &:not([disabled])
      background: darken(colorPrimary, 5)
</style>
