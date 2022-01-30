import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from './lang.json'

Vue.use( VueI18n )

const i18n = new VueI18n({
  locale: 'en',
  messages
})

function setI18nLanguage( lang ) {
  i18n.locale = lang
  document.querySelector( 'html' ).setAttribute( 'lang', lang )
}

export { i18n, setI18nLanguage }