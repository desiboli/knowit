import colors from 'vuetify/es5/util/colors'

export default {
  customVariables: ['~/assets/variables.scss'],
  treeShake: true,
  theme: {
    options: {
      customProperties: true,
    },
    // dark: true,
    themes: {
      dark: {
        background: {
          base: '#121212',
        },
        primary: '#4DA85B',
        anchor: '#67B973',
        accent: colors.grey.darken3,
        secondary: colors.amber.darken3,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3,
      },
      light: {
        background: {
          base: '#F1F0ED',
          darken1: '#E4E1DB',
        },
        primary: '#B7DEBD',
        anchor: '#67B973',
      },
    },
  },
}
