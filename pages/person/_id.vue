<template>
  <v-container class="pb-16">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6">
        <v-card
          :loading="loading"
          class="my-md-12 mx-auto"
          max-width="374"
          elevation="24"
        >
          <v-img :alt="person.efternamn" :src="person.bild_url_max" />
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card :loading="loading" class="mx-auto my-12" max-width="374">
          <v-card-title>
            {{ person.tilltalsnamn }} {{ person.efternamn }}
          </v-card-title>
          <v-card-text>
            <v-icon color="primary darken-1">mdi-briefcase</v-icon>
            {{ person.parti }}, {{ person.status }} <br />
            <v-icon color="primary darken-1">mdi-map-marker</v-icon>
            {{ person.valkrets }}
          </v-card-text>
          <v-card-text>
            <strong>Gender:</strong>
            <span v-if="person.kon === 'kvinna'">
              <v-icon
                color="primary darken-1"
                aria-label="My Account"
                aria-hidden="false"
              >
                mdi-gender-female
              </v-icon>
            </span>
            <span v-else-if="person.kon === 'man'">
              <v-icon
                color="primary darken-1"
                aria-label="My Account"
                aria-hidden="false"
              >
                mdi-gender-male
              </v-icon>
            </span>
            <span v-else> {{ person.kon }} </span> <br />
            <strong>Born:</strong> {{ person.fodd_ar }}
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
      </v-col>
    </v-row>
    <v-row id="assignements" justify="center" align="center">
      <v-col cols="12">
        <v-toolbar class="mb-2" color="primary">
          <v-toolbar-title>Personal assignments</v-toolbar-title>
        </v-toolbar>
        <v-card :loading="loading" class="mx-auto mb-12 overflow-hidden">
          <v-timeline align-top dense>
            <v-timeline-item
              v-for="(uppdrag, index) in personuppdrag.slice(0, 3)"
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
            v-if="personuppdrag.slice(3).length > 0"
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
              <v-icon>{{
                show ? 'mdi-chevron-up' : 'mdi-chevron-down'
              }}</v-icon>
            </v-btn>
          </v-card-actions>

          <v-expand-transition>
            <div v-show="show">
              <v-timeline align-top dense>
                <v-timeline-item
                  v-for="(uppdrag, index) in personuppdrag.slice(3)"
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
      </v-col>
    </v-row>
    <v-row id="information" justify="center" align="center">
      <v-col cols="12">
        <v-data-iterator :items="personuppgift" hide-default-footer>
          <template v-slot:header>
            <v-toolbar class="mb-2" color="primary">
              <v-toolbar-title>Personal information</v-toolbar-title>
            </v-toolbar>
          </template>

          <template v-slot:default="props">
            <v-row>
              <v-col
                v-for="(uppgift, index) in props.items"
                :key="index"
                cols="12"
                sm="6"
                md="4"
              >
                <v-card>
                  <v-card-title
                    class="subheading font-weight-bold text-capitalize"
                  >
                    {{ uppgift.typ }}
                  </v-card-title>

                  <v-divider></v-divider>

                  <v-list dense>
                    <v-list-item>
                      <v-list-item-content>
                        <strong>{{ uppgift.kod }}:</strong>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-content
                        v-for="(task, index) in uppgift.uppgift"
                        :key="index"
                      >
                        <div v-html="splitJoin(task)"></div>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {},
  async fetch() {
    this.loading = true
    this.person = await this.$axios
      .$get(
        `https://data.riksdagen.se/personlista/?iid=${this.id}&utformat=json`
      )
      .then((res) => {
        this.loading = false
        this.personuppdrag = res.personlista.person.personuppdrag.uppdrag
        this.personuppgift = res.personlista.person.personuppgift.uppgift
        return res.personlista.person
      })
      .catch(() => {
        this.$nuxt.error({ statusCode: 404 })
      })
  },
  data() {
    return {
      show: false,
      loading: false,
      id: this.$route.params.id,
      person: [],
      personuppdrag: [],
      personuppgift: [],
    }
  },
  methods: {
    emailRegex(string) {
      const regex = new RegExp(
        "([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)"
      )

      // Check if a part the text is including [på].
      // If so, replace it with an @ symbol and wrap the text in an a tag with a mailto href.
      if (typeof string === 'string' && string.includes('[på]')) {
        const email = string.replace('[på]', '@')
        return email.replace(regex, "<a href='mailto:$1'>$1</a>")
      }
      return string
    },
    splitJoin(theText) {
      // Make sure the text is of the type string.
      // Make the text nicer by wrapping every sentence in a <p> tag.
      const text =
        typeof theText === 'string'
          ? theText.split('. ').join('.</p><p>')
          : theText

      return '<p>' + this.emailRegex(text) + '</p>'
    },
  },
}
</script>
