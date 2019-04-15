<template>
    <div>
      <application-table @refresh="init(true)" :models="inboxes" :loading="loading" @view="viewApp"></application-table>

      <v-navigation-drawer
        right
        v-model="show_overview"
        app
        temporary>
        <application-summary @close="show_overview=false"></application-summary>
      </v-navigation-drawer>
    </div>
</template>

<script>
import ApplicationTable from "@/components/ApplicationTable"
import ApplicationSummary from "@/components/ApplicationSummary"

export default {
  components: {
    ApplicationTable,
    ApplicationSummary
  },
  data() {
    return {
      loading: false,
      show_overview: null
    };
  },
  created() {
    this.init();
  },
  computed: {
    inboxes(){
      return this.$store.state.inbox.inboxes;
    }
  },
  methods: {
    init(refresh) {
      this.loading = true;
      this.$store
        .dispatch("GET_INBOX", refresh)
        .then(result => {
          this.loading = false;
        })
        .catch(err => {
          console.log(JSON.stringify(err));
          this.loading = false;
        });
    },
    viewApp(selected_case){
      this.$store.commit("SET_CASE", selected_case);
      this.show_overview = true;
    }
  }
};
</script>

<style>
</style>
