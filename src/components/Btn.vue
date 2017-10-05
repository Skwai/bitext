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
  padding: 0.75rem 2rem
  background: colorPrimary
  color: #fff
  border-radius: borderRadiusBase
  cursor: pointer
  transition: 0.2s
  caps()

  &[disabled]
    cursor: not-allowed
    color: rgba(255,255,255,.7)

  &:hover,
  &:focus
    &:not([disabled])
      background: darken(colorPrimary, 5)
</style>
