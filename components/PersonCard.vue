<template>
  <v-card class="mx-auto my-12" max-width="374">
    <v-card-title>
      <slot name="name"></slot>
    </v-card-title>
    <v-card-text>
      <v-icon color="primary darken-1">mdi-briefcase</v-icon>
      <slot name="partyStatus"></slot> <br />
      <v-icon color="primary darken-1">mdi-map-marker</v-icon>
      <slot name="constituency"></slot>
    </v-card-text>
    <v-card-text>
      <strong>Gender:</strong>
      <span v-if="gender === 'kvinna'">
        <v-icon
          color="primary darken-1"
          aria-label="My Account"
          aria-hidden="false"
        >
          mdi-gender-female
        </v-icon>
      </span>
      <span v-else-if="gender === 'man'">
        <v-icon
          color="primary darken-1"
          aria-label="My Account"
          aria-hidden="false"
        >
          mdi-gender-male
        </v-icon>
      </span>
      <span v-else> <slot name="gender"></slot> </span> <br />
      <strong>Born:</strong> <slot name="born"></slot>
    </v-card-text>
    <v-card-actions class="flex-column flex-md-row">
      <v-btn
        color="primary"
        class="black--text mb-4 mb-md-0"
        :block="$vuetify.breakpoint.smAndDown"
        @click="$vuetify.goTo('#assignements')"
      >
        Assignements
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        color="primary"
        class="black--text"
        :block="$vuetify.breakpoint.smAndDown"
        @click="$vuetify.goTo('#information')"
      >
        Information
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    gender: {
      type: String,
      default: '',
    },
  },
}
</script>
