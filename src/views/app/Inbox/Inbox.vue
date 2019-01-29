<template>
    <div>
        <application-table :models="inboxes" :loading="loading" @view="viewApp"></application-table>
    </div>
</template>

<script>
export default {
  components: {
    ApplicationTable: () => import("@/components/ApplicationTable")
  },
  data() {
    return {
      inboxes: [],
      headers: [],
      loading: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.loading = true;
      this.$store
        .dispatch("GET_INBOX")
        .then(result => {
          this.inboxes = this.$store.state.inbox.inboxes;
          this.loading = false;
        })
        .catch(err => {
          console.log(JSON.stringify(err));
          this.loading = false;
        });
    },
    viewApp(app) {
      console.log(JSON.stringify(app));
    }
  }
};
</script>

<style>
</style>
