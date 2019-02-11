<template>
    <div>
        <application-table :models="participated" :headers="headers" :loading="loading"></application-table>
    </div>
</template>

<script>
export default {
  components: {
    ApplicationTable: () => import("@/components/ApplicationTable")
  },
  data() {
    return {
      participated: [],
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
        .dispatch("GET_PARTICIPATED")
        .then(result => {
          console.log("test: " + JSON.stringify(result));
          this.participated = this.$store.state.participated.participated;
          this.loading = false;
        })
        .catch(err => {
          console.log(JSON.stringify(err));
          this.loading = false;
        });
    }
  }
};
</script>

<style>
</style>
