<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      disable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" dense fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn icon @click="toggleDarkMode">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <nuxt keep-alive />
      <v-btn
        v-show="fab"
        v-scroll="onScroll"
        fab
        dark
        fixed
        bottom
        right
        class="mb-6"
        @click="backToTop"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </v-main>
    <v-footer
      color="background darken-1"
      class="justify-center"
      :absolute="!fixed"
      app
    >
      <span class="text-caption pa-4">
        &copy; {{ new Date().getFullYear() }} Knowit - Crafting Web Frontend,
        <span class="d-block d-sm-inline"
          >made with <v-icon color="red">mdi-heart</v-icon> by Mustafa Adam
          Alshammaa</span
        >
      </span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      fab: false,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'solution',
          to: '/solution',
        },
      ],
      right: true,
      title: 'Knowit - Crafting Web Frontend',
    }
  },
  mounted() {
    const darkTheme = localStorage.getItem('dark_theme')
    if (darkTheme) {
      darkTheme === 'true'
        ? (this.$vuetify.theme.dark = true)
        : (this.$vuetify.theme.dark = false)
    } else if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      this.$vuetify.theme.dark = true
      localStorage.setItem('dark_theme', this.$vuetify.theme.dark.toString())
    }
  },
  methods: {
    toggleDarkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      localStorage.setItem('dark_theme', this.$vuetify.theme.dark.toString())
    },
    onScroll(e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      this.fab = top > 50
    },
    backToTop() {
      this.$vuetify.goTo(0)
    },
  },
}
</script>
