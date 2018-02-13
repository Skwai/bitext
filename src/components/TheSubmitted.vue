<template>
  <div :class="$style.TheSubmitted">
    <svg :class="$style.TheSubmitted__Icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
    <span :class="$style.TheSubmitted__Message">Done</span>
    <button
      @click.prevent="reset"
      :class="$style.TheSubmitted__Reset"
    >Add another</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'

@Component
export default class TheSubmitted extends Vue {
  @Action private resetSubmitted: () => void

  private reset() {
    this.resetSubmitted()
  }
}
</script>

<style lang="stylus" module>
.TheSubmitted {
  text-align: center;

  &__Icon {
    width: 3rem;
    height: 3rem;
    fill: currentColor;
  }

  &__Message {
    display: block;
    font-size: 87.5%;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.05em;
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
  }

  &__Reset {
    border: 0;
    padding: 0.25rem 0;
    font-size: 87.5%;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.05em;
    cursor: pointer;
    border-radius: 3px;
    background: transparent;
    border: currentColor solid 1px;
    padding: 1rem 2rem;
    transition: 0.2s;

    &:hover, &:focus {
      outline: 0;
      color: #499AFF;
      background: rgba(#499AFF, 0.1);
    }
  }
}
</style>
