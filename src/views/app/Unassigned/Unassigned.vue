<template>
    <div>
      <application-table @refresh="init(true)" :models="unassigned" :loading="loading" @view="viewApp"></application-table>
  
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
import ApplicationSummary from "@/components/ApplicationSummary";
import ApplicationTable from "@/components/ApplicationTable";

export default {
  components: { ApplicationSummary, ApplicationTable },
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
    unassigned() {
      return this.$store.state.unassigned.unassigned;
    }
  },
  methods: {
    init(refresh) {
      this.loading = true;
      this.$store
        .dispatch("GET_UNASSIGNED", refresh)
        .then(result => {
          this.loading = false;
        })
        .catch(err => {
          console.log("err init: ", err);
          this.loading = false;
        });
    },
    viewApp(selected_case) {
      this.$store.commit("SET_CASE", selected_case);
      this.$store.commit("SET_REVIEW_ACCESS", 0);
      this.show_overview = true;
    }
  }
};
</script>

<style>
</style>
