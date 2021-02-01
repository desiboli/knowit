<template>
  <v-app dark>
    <v-container class="pb-16">
      <v-row justify="center" align="center">
        <v-col cols="12">
          <div v-if="error.statusCode === 404" class="text-center">
            <h1>
              {{ pageNotFound }}
            </h1>
            <h3>
              Sorry! The page you were looking for could not be found <br />
              Please follow the link below.
            </h3>
          </div>
          <h1 v-else>
            {{ otherError }}
          </h1>
        </v-col>
        <v-col class="text-center" cols="12">
          <NuxtLink to="/"> Home page </NuxtLink>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred',
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped></style>
