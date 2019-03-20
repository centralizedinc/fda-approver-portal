import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  theme: {
    // FDA Green
    primary: '#104B2A',
    // default
    secondary: '#424242',
    // FDA Orange
    accent: '#F58555',
    error: '#FF5252',
    // FDA Gold
    info: '#B5C25A',
    // FDA Light Green
    success: '#38C73C',
    // default
    warning: '#FFC107',

    // FDA Colors
    fdaGreen: '#104B2A',
    fdaMed: '#0F901A',
    fdaLight: '38C737',
    fdaGold: 'B5C25A',
    fdaTan: 'CAD0A0',
    fdaYellow: 'E9D758',
    fdaBlueGreen: '297373',
    fdaOrange: 'F58555',
    fdaSilver: 'E6E6E6',
    fdaGray: '58595B'
  },
  customProperties: true,
  iconfont: 'fa',
})