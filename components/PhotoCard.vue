<template>
  <v-card class="my-md-12 mx-auto" max-width="374" elevation="24">
    <v-img :alt="alt" :src="src" />
  </v-card>
</template>

<script>
export default {
  props: {
    alt: {
      type: String,
      default: '',
    },
    src: {
      type: String,
      default: '',
    },
  },
}
</script>
