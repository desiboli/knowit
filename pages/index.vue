<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-card class="mt-12 mb-16">
        <v-card-title>
          The Swedish Parliament
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="persons"
          :search="search"
          :loading="loading"
          :sort-by="['parti']"
          loading-text="Loading... Please wait"
          @click:row="goToPerson"
        >
          <template v-slot:top>
            <v-select
              v-model="partyFilterValue"
              class="mx-4"
              label="Filter by party"
              :items="partyList"
              clearable
            ></v-select>
          </template>
          <template v-slot:[`item.bild_url_80`]="{ item }">
            <v-avatar class="my-2">
              <v-img alt="Avatar" :src="item.bild_url_80" />
            </v-avatar>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  components: {},
  async fetch() {
    this.loading = true
    this.persons = await this.$axios
      .$get('http://data.riksdagen.se/personlista/?utformat=json')
      .then((res) => {
        console.log(res.personlista.person)
        this.loading = false
        this.partyList = res.personlista.person.map((item) => {
          return item.parti
        })
        this.personId = res.personlista.person.map((item) => {
          return item.intressent_id
        })
        return res.personlista.person
      })
  },
  data() {
    return {
      loading: false,
      search: '',
      partyList: [],
      partyFilterValue: null,
      persons: [],
      personId: null,
    }
  },
  computed: {
    headers() {
      return [
        {
          text: 'Photo',
          class: 'text-no-wrap',
          align: 'start',
          sortable: false,
          value: 'bild_url_80',
        },
        { text: 'Lastname', class: 'text-no-wrap', value: 'efternamn' },
        { text: 'Firstname', class: 'text-no-wrap', value: 'tilltalsnamn' },
        {
          text: 'Party',
          class: 'text-no-wrap',
          value: 'parti',
          filter: this.partyFilter,
        },
        { text: 'Status', class: 'text-no-wrap', value: 'status' },
        { text: 'Constituency', class: 'text-no-wrap', value: 'valkrets' },
        { text: 'Year born', class: 'text-no-wrap', value: 'fodd_ar' },
      ]
    },
  },
  methods: {
    goToPerson(id) {
      this.$router.push(`/person/${id.sourceid}`)
    },
    partyFilter(value) {
      // If this filter has no value we just skip the entire filter.
      if (!this.partyFilterValue) {
        return true
      }
      // Check if the current loop value (The party value)
      // equals to the selected value at the <v-select>.
      return value === this.partyFilterValue
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep tbody {
  tr {
    cursor: pointer;
  }
}
</style>
