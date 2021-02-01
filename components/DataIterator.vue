<template>
  <v-data-iterator :items="information" hide-default-footer>
    <template v-slot:header>
      <v-toolbar class="mb-2" color="primary">
        <v-toolbar-title><slot name="title"></slot></v-toolbar-title>
      </v-toolbar>
    </template>

    <template v-slot:default="props">
      <v-row v-if="props.items">
        <v-col
          v-for="(uppgift, index) in props.items"
          :key="index"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card v-if="uppgift">
            <v-list dense>
              <v-list-item v-if="showCode">
                <v-list-item-content>
                  <strong>{{ uppgift.kod }}:</strong>
                </v-list-item-content>
              </v-list-item>

              <v-list-item>
                <v-list-item-content
                  v-for="(task, index) in uppgift.uppgift"
                  :key="index"
                >
                  <div v-if="task === 'true'">Yes</div>
                  <div v-else v-html="splitJoin(task)"></div>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-data-iterator>
</template>

<script>
export default {
  props: {
    information: {
      type: Array,
      default() {
        return []
      },
    },
    showCode: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    emailRegex(string) {
      const regex = new RegExp(
        "([a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)"
      )

      const webRegex = RegExp(
        '(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+@]*)*(\\?[;&a-z\\d%_.~+=-@]*)?(\\#[-a-z\\d_@]*)?$',
        'i'
      )

      if (typeof string === 'string') {
        // Check if a part of the text is including [på].
        // If so, replace it with an @ symbol and wrap the text in an a tag with a mailto href.
        if (string.includes('[på]')) {
          const email = string.replace('[på]', '@')
          return email.replace(regex, "<a href='mailto:$1'>$1</a>")
        }

        // Check if text is a url .
        // If so, replace it with an a tag and with the URL in href.
        if (string.match(webRegex)) {
          return string.replace(webRegex, (url) => {
            return '<a href="' + url + '" target="_blank">' + url + '</a>'
          })
        }
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
