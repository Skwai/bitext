<template>
  <div class="Submitted">
    <svg class="Submitted__Icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
    <span class="Submitted__Message">Done</span>
    <button
      @click.prevent="resetSubmitted"
      class="Submitted__Reset"
    >Add another</button>
  </div>
</template>

<script>
export default {
  methods: {
    resetSubmitted () {
      this.$store.dispatch('resetSubmitted')
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"

.Submitted
  text-align: center

  &__Icon
    width: 3rem
    height: 3rem
    fill: currentColor

  &__Message
    display: block
    caps()
    margin-bottom: spacingBase
    font-size: 1.25rem

  &__Reset
    background: transparent
    border: 0
    padding: 0.25rem 0
    caps()
    cursor: pointer
    opacity: .5

    &:hover,
    &:focus
      opacity: 1
</style>
