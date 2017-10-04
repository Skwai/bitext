<template>
  <button type="submit" class="Btn"><slot /></button>
</template>

<style lang="stylus">
@require "../styles/config.styl"

.Btn
  border: 0
  background: transparent
  padding: 0.65rem 2rem
  background: colorPrimary
  color: #fff
  border-radius: borderRadiusBase
</style>
