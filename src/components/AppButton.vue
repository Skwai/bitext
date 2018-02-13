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
class AppButton extends Vue {
  @Prop({ required: false, default: false })
  private disabled: boolean
}

export default AppButton
</script>

<style lang="stylus" module>
.AppButton {
  border: 0;
  background: #499AFF;
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 3px;
  font-size: 87.5%;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: 0.2s;
  width: 100%;

  &[disabled] {
    cursor: not-allowed;
    background: rgba(#499AFF, 0.5);
    color: rgba(255, 255, 255, 0.7);
  }

  &:hover, &:focus {
    &:not([disabled]) {
      background: darken(#499AFF, 5);
    }
  }
}
</style>
