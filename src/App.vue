<template>
  <div id="app">
    <LangSwitcher />
    <Counter />
  </div>
</template>

<script>

import LangSwitcher from '@/components/LangSwitcher'
import Counter from '@/components/Counter'

export default {
  name: 'App',
  components: {
    LangSwitcher,
    Counter
  }
}
</script>

<style lang="scss">
  @import './assets/style';
</style>
