<template>
  <main :class="$style.App" id="App">
    <TheHeader />
    <ThePrice />
    <TheSubmitted v-if="submitted" />
    <TheForm v-else />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

import TheForm from './components/TheForm.vue'
import TheHeader from './components/TheHeader.vue'
import ThePrice from './components/ThePrice.vue'
import TheSubmitted from './components/TheSubmitted.vue'

@Component({
  components: {
    TheForm,
    TheHeader,
    ThePrice,
    TheSubmitted
  }
})
export default class App extends Vue {
  @Getter private submitted: boolean
}
</script>

<style lang="stylus" module>
html {
  font-size: 14px;

  @media (min-width: 768px) {
    font-size: 15px;
  }

  @media (min-width: 1024px) {
    font-size: 16px;
  }
}

button, input, textarea, select {
  line-height: inherit;
  font-size: inherit;
}

button, input, textarea, select {
  font-family: inherit;
  color: inherit;
}

.App {
  width: 28rem;
  max-width: 100%;
  margin: 5vh auto 5vh;
  font-family: medium-ui-sans-serif-text-font, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #499AFF;
  line-height: (20 / 14);
  font-size: 1rem;

  * {
    box-sizing: border-box;
  }
}
</style>
