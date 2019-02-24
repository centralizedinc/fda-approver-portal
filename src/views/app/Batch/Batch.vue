<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-data-table
                :headers="headers"
                :items="models"
                :search="search"
                :loading="loading">
                <template slot="items" slot-scope="props">
                    <td class="text-xs-center">{{ props.item._id }}</td>
                    <td class="text-xs-center">{{ props.item.applications.length }}</td>
                    <td class="text-xs-center">{{ props.item.copies }}</td>
                    <td class="text-xs-center">{{ formatDate(props.item.date_created) }}</td>
                </template>
                <v-alert slot="no-results" :value="true" color="error" icon="warning">
                    Your search for "{{ search }}" found no results.
                </v-alert>
                </v-data-table>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Batch ID",
          value: "_id"
        },
        {
          text: "Applications",
          value: "applications"
        },
        {
          text: "Copies",
          value: "copies"
        },
        {
          text: "Date Created",
          value: "date_created"
        }
      ],
      models: []
    };
  },
  created() {
      this.init()
  },
  methods: {
      init(){
          this.loading = true;
          this.models = this.$store.state.reference.batch;
          this.$store.dispatch('GET_BATCH').then((result) => {
              this.models = this.$store.state.reference.batch;
              this.loading = false;
          }).catch((err) => {
              console.log('getting batch err :', err);
              this.loading = false;
          });
      }
  }
};
</script>

<style>
</style>
