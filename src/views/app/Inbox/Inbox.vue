<template>
    <div>
      <application-table :models="inboxes" :headers="headers" :loading="loading" @view="evaluate"></application-table>
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
          text: "Created By",
          value: "client_name.last"
        },
        {
          text: "Current Task",
          value: "current_task_name"
        },
        {
          text: "Current User",
          value: "current_assigned_user_name.last_name"
        },
        {
          text: "Remarks",
          value: "remarks"
        }
        // {
        //   text: "Actions",
        //   value: "actions"
        // }
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
    evaluate(_case){
      this.$store.commit('SET_CASE', {
        _case,
        prev_module: '/app/inbox'
      })
      this.$router.push('/app/evaluation')
    }
  }
};
</script>

<style>
</style>
