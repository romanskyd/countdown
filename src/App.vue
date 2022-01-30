<template>
  <div id="app">
   <Counter />
  </div>
</template>

<script>

import Counter from '@/components/Counter.vue'

export default {
  name: 'App',
  components: {
    Counter
  }
}
</script>

<style lang="scss">
  @import './assets/style';
</style>
