<template>
    <div>
        <application-table :models="unassigned" :headers="headers" :loading="loading" @view="claim"></application-table>
    </div>
</template>

<script>
export default {
  components: {
    ApplicationTable: () => import("@/components/ApplicationTable")
  },
  data() {
    return {
      unassigned: [],
      headers: [
        {
          text: "Case No",
          value: "case_no"
        },
        {
          text: "Application",
          value: "case_type"
        },
        {
          text: "Type",
          value: "application_type"
        },
        {
          text: "Current Task",
          value: "current_task_name"
        },
        {
          text: "Current User",
          value: "current_assigned_user_name"
        },
        {
          text: "Remarks",
          value: "remarks"
        },
        {
          text: "Actions",
          value: "actions"
        }
      ],
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
        .dispatch("GET_UNASSIGNED")
        .then(result => {
          this.unassigned = this.$store.state.unassigned.unassigned;
          this.loading = false;
        })
        .catch(err => {
          console.log(JSON.stringify(err));
          this.loading = false;
        });
    },
    claim(app) {}
  }
};
</script>

<style>
</style>
