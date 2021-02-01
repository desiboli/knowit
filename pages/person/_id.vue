<template>
  <div v-if="$fetchState.pending">
    <Loading>Loading politician</Loading>
  </div>
  <p v-else-if="$fetchState.error">An error occurred :(</p>
  <v-container v-else class="pb-16">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6">
        <PhotoCard :alt="person.efternamn" :src="person.bild_url_max" />
      </v-col>
      <v-col cols="12" sm="6">
        <PersonCard :gender="person.kon">
          <template #name>
            {{ person.tilltalsnamn }} {{ person.efternamn }}
          </template>
          <template #partyStatus>
            {{ person.parti }}, {{ person.status }}
          </template>
          <template #constituency>
            {{ person.valkrets }}
          </template>
          <template #gender>
            {{ person.kon }}
          </template>
          <template #born>
            {{ person.fodd_ar }}
          </template>
        </PersonCard>
      </v-col>
    </v-row>
    <v-row id="assignements" justify="center" align="center">
      <v-col cols="12">
        <TimelineCard :assignements="personuppdrag">
          <template #title>Personal assignments</template>
        </TimelineCard>
      </v-col>
    </v-row>
    <v-row
      v-if="biografiPersonuppgifter.length"
      id="information"
      justify="center"
      align="center"
    >
      <v-col cols="12">
        <DataIterator :information="biografiPersonuppgifter" show-code>
          <template #title>Biography</template>
        </DataIterator>
      </v-col>
    </v-row>
    <v-row v-if="eadressPersonuppgifter.length" justify="center" align="center">
      <v-col cols="12">
        <DataIterator :information="eadressPersonuppgifter">
          <template #title>Addresses</template>
        </DataIterator>
      </v-col>
    </v-row>
    <v-row v-if="titlarPersonuppgifter.length" justify="center" align="center">
      <v-col cols="12">
        <DataIterator :information="titlarPersonuppgifter">
          <template #title>Titles</template>
        </DataIterator>
      </v-col>
    </v-row>
    <v-row v-if="valPersonuppgifter.length" justify="center" align="center">
      <v-col cols="12">
        <DataIterator :information="valPersonuppgifter">
          <template #title>Candidate for the next election</template>
        </DataIterator>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DataIterator from '~/components/DataIterator'
import TimelineCard from '~/components/TimelineCard'
import PhotoCard from '~/components/PhotoCard'
import PersonCard from '~/components/PersonCard'
import Loading from '~/components/Loading'

export default {
  components: {
    DataIterator,
    TimelineCard,
    PhotoCard,
    PersonCard,
    Loading,
  },
  async fetch() {
    this.loading = true
    this.person = await this.$axios
      .$get(
        `https://data.riksdagen.se/personlista/?iid=${this.id}&utformat=json`
      )
      .then((res) => {
        this.loading = false
        this.personuppdrag = res.personlista.person.personuppdrag.uppdrag
        this.biografiPersonuppgift = res.personlista.person.personuppgift.uppgift.map(
          (item) => {
            return item.typ === 'biografi' ? item : ''
          }
        )
        this.eadressPersonuppgift = res.personlista.person.personuppgift.uppgift.map(
          (item) => {
            return item.typ === 'eadress' ? item : null
          }
        )
        this.titlarPersonuppgift = res.personlista.person.personuppgift.uppgift.map(
          (item) => {
            return item.typ === 'titlar' ? item : null
          }
        )
        this.valPersonuppgift = res.personlista.person.personuppgift.uppgift.map(
          (item) => {
            return item.typ === 'val' ? item : null
          }
        )

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
      biografiPersonuppgift: [],
      eadressPersonuppgift: [],
      titlarPersonuppgift: [],
      valPersonuppgift: [],
    }
  },
  computed: {
    biografiPersonuppgifter() {
      return this.biografiPersonuppgift.filter((u) => {
        return u
      })
    },
    eadressPersonuppgifter() {
      return this.eadressPersonuppgift.filter((u) => {
        return u
      })
    },
    titlarPersonuppgifter() {
      return this.titlarPersonuppgift.filter((u) => {
        if (u && u.kod === 'en') {
          return u
        }
      })
    },
    valPersonuppgifter() {
      return this.valPersonuppgift.filter((u) => {
        return u
      })
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  },
}
</script>
