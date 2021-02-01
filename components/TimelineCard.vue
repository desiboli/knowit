<template>
  <div>
    <v-toolbar class="mb-2" color="primary">
      <v-toolbar-title><slot name="title"></slot></v-toolbar-title>
    </v-toolbar>
    <v-card class="mx-auto mb-12 overflow-hidden">
      <v-timeline align-top dense>
        <v-timeline-item
          v-for="(uppdrag, index) in assignements.slice(0, 3)"
          :key="index"
          small
        >
          <div>
            <div class="font-weight-normal">
              <strong>{{ uppdrag.from }} - {{ uppdrag.tom }}</strong>
            </div>
            <div>{{ uppdrag.roll_kod }}</div>
          </div>
        </v-timeline-item>
      </v-timeline>

      <v-card-actions
        v-if="assignements.slice(3).length > 0"
        class="d-flex mx-0 pa-0"
      >
        <v-btn
          color="primary"
          class="black--text"
          depressed
          block
          tile
          @click="show = !show"
        >
          Show more
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-timeline align-top dense>
            <v-timeline-item
              v-for="(uppdrag, index) in assignements.slice(3)"
              :key="index"
              small
            >
              <div>
                <div class="font-weight-normal">
                  <strong>{{ uppdrag.from }} - {{ uppdrag.tom }}</strong>
                </div>
                <div>{{ uppdrag.roll_kod }}</div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    assignements: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      show: false,
    }
  },
}
</script>
