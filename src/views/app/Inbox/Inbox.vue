<template>
    <div>
      <application-table :models="inboxes" :headers="headers" :loading="loading" @view="viewApp"></application-table>
      <application-summary :show="showAppView" @close="showAppView=false" :tabs="3">
        <template slot="header-1">Header 1</template>
        <template slot="content-1">
          <v-card>
            <v-card-title primary-title>
              title 1
            </v-card-title>
            <v-card-text>
              Content 1
            </v-card-text>
          </v-card>
        </template>
        <template slot="header-2">Header 2</template>
        <template slot="content-2">Content 2</template>
        <template slot="header-3">Header 3</template>
        <template slot="content-3">Content 3</template>
      </application-summary>
    </div>
</template>

<script>
export default {
  components: {
    ApplicationTable: () => import("@/components/ApplicationTable"),
    ApplicationSummary: () => import("@/components/ApplicationSummary")
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
          text: "Type",
          value: "application_type"
        },
        {
          text: "Product Type",
          value: "general_info.product_type"
        },
        {
          text: "Current Task",
          value: "current_task"
        },
        {
          text: "Current User",
          value: "current_user"
        },
        {
          text: "Remarks",
          value: "remarks"
        }
      ],
      items: [],
      loading: false,
      showAppView: false
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
      this.showAppView = true;
      console.log(JSON.stringify(app));
    }
  }
};
</script>

<style>
</style>
