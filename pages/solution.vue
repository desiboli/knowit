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
          very much! Definitely of the best I've done so far.
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
          <li>
            Netlify (<a href="https://knowit-musse.netlify.app/"
              >Yes! It's live on Netlify </a
            >)<v-icon color="brown">mdi-emoticon-wink-outline</v-icon>
          </li>
        </ul>
        <p>
          The reason for choosing Nuxt.js is because I'm a big fan of
          <a href="https://vuejs.org/">Vue.js</a>.
        </p>
        <p>
          Nuxt.js is an open source framework for building both SSR, PWA and
          static sites. <br />
          I choosed it to simply setup a static site quickly.
        </p>
        <p>
          With the Nuxt.js CLI I could choose a UI framework, and I choosed
          <a href="https://vuetifyjs.com/">Vuetify</a> which is a Vue UI library
          with handcrafted Material Components. This is because you get some
          very nice components out of the box to use in my web application like
          e.g. the
          <a href="https://vuetifyjs.com/en/components/data-tables/"
            >Data table</a
          >
          component. I wanted to present the Swedish parliament data in a nice
          way!
        </p>
        <p>
          I setup a Github repo for the project so that I have a version control
          of it and also for being able to show you my workflow. If you want to
          you could take a look on my commits over
          <a href="https://github.com/desiboli/knowit/commits/main">here</a>.
        </p>
        <p>
          I gave you a live URL
          <a href="https://knowit-musse.netlify.app/"
            >https://knowit-musse.netlify.app/</a
          >
          with Netlify so that you could look at the project without the hassle
          for having to download it and run it locally.
        </p>
        <p>
          I sincerely hope that you like my work.
          <v-icon color="red">mdi-hand-heart-outline</v-icon>
        </p>
        <p>
          Best regards! <br />
          <span class="font-italic">– Mustafa Adam Alshammaa</span>
        </p>
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
