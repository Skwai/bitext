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
  padding: 0.65rem 2rem
  background: colorPrimary
  color: #fff
  border-radius: borderRadiusBase
  text-transform: uppercase
  font-family: fontSizeSmall
  font-weight: 500
  letter-spacing: 0.05em
  cursor: pointer
  transition: 0.2s

  &:hover
    background: darken(colorPrimary, 5)
</style>
