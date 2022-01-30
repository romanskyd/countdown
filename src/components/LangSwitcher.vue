<template>
  <div class="lang-switcher">
    <label
      v-for="lang in $i18n.availableLocales"
      :key="lang"
      :class="{'active': currentLang === lang }"
    >
      <input type="radio" :id="lang" :value="lang" v-model="currentLang">{{lang}}
    </label>
  </div>
</template>

<script>

import { setI18nLanguage } from '@/plugins/i18n'

export default {
  name: 'LangSwitcher',
  components: {},
  data() {
    return {
      currentLang: ''
    }
  },
  watch: {
    currentLang: function( lang ) {
      setI18nLanguage( lang )
    }
  },
  beforeMount() {
    this.currentLang = this.$i18n.locale
  },
  methods: {}
}
</script>

<style lang="scss">
  .lang-switcher {
    display: flex;
    justify-content: flex-end;
    padding: 0 1rem;
    position: fixed;
    right: 0;
    input {
      margin-right: 0.5rem;
      display: none;
    }
    label {
      padding: 1rem 0.5rem;
      display: flex;
      align-items: center;
      text-transform: uppercase;
      &.active {
        font-weight: bold;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
</style>