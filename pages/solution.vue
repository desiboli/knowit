<template>
  <v-container class="pb-16">
    <v-row>
      <v-col class="text-center">
        <Logo />
        <VuetifyLogo />
        <blockquote class="blockquote">
          &#8220;First, solve the problem. Then, write the code.&#8221;
          <footer>
            <small>
              <em>&mdash;John Johnson</em>
            </small>
          </footer>
        </blockquote>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="">
        <p>Hello!</p>
        <p>
          First of all I want to tell you that I really enjoyed this code test
          very much! Defenitely of the best I've done so far.
        </p>
        <p>To solve it I used the following tools & techniques:</p>
        <ul>
          <li>
            Nuxt.js (<a href="https://nuxtjs.org/">https://nuxtjs.org/</a>)
          </li>
          <li>Vuetify (<a href="https://vuetifyjs.com/">Vuetify</a>)</li>
          <li>
            Github (<a href="https://github.com/desiboli/knowit">Github repo</a
            >)
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo,
  },
}
</script>
