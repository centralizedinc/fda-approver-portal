<template>
    <div>
      <application-table :models="participated" :headers="headers" :loading="loading" @view="viewApp"></application-table>
      <application-overview :show="show_overview" @close="close">
        <app-summary :form="form" slot="appsummary"></app-summary>
        <app-data :form="form" slot="appdata"></app-data>
        <uploaded-files :form="form" slot="uploadedfiles"></uploaded-files>
        <output-docs :form="form" slot="outputdocs"></output-docs>
        <app-history :form="form" slot="apphistory"></app-history>
        <payment-details :form="form" slot="paymentdetails"></payment-details>
      </application-overview>
    </div>
</template>

<script>
import overview_components from "../../../components/ApplicationOverview/index.js";
const tabscomponents = Object.assign(
  {
    ApplicationTable: () => import("@/components/ApplicationTable")
  },
  overview_components
);
export default {
  components: tabscomponents,
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
      ],
      loading: false,
      selected_case: {},
      form: {
        general_info: {},
        estab_details: {},
        addresses: {
          office: {},
          warehouse: [],
          plant: {}
        },
        auth_officer: {
          mail_add: {}
        },
        qualified: {}
      },
      show_overview: false
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
    },

    viewApp(app) {
      this.selected_case = app;
      this.$store
        .dispatch("GET_LICENSE_BY_CASE", this.selected_case._id)
        .then(result => {
          this.form = result;
          this.checkForm(result);
          this.show_overview = true;
        })
        .catch(err => {
          console.log("err viewApp:", err);
        });
    },
    checkForm(result) {
      this.form.general_info = result.general_info ? result.general_info : {};
      this.form.estab_details = result.estab_details
        ? result.estab_details
        : {};

      if (this.form.addresses) {
        this.form.addresses.office = result.addresses.office
          ? result.addresses.office
          : {};
        this.form.addresses.warehouse = result.addresses.warehouse
          ? result.addresses.warehouse
          : [];
        this.form.addresses.plant = result.addresses.plant
          ? result.addresses.plant
          : {};
      } else {
        this.form.addresses = { office: {}, warehouse: [], plant: {} };
      }
      if (this.form.auth_officer) {
        this.form.auth_officer.mail_add = result.auth_officer.mail_add
          ? result.auth_officer.mail_add
          : {};
      } else {
        this.form.auth_officer = { mail_add: {} };
      }
      this.form.qualified = result.qualified ? result.qualified : {};
    },
    close() {
      this.show_overview = false;
      this.selected_case = {};
      this.form = {
        general_info: {},
        estab_details: {},
        addresses: {
          office: {},
          warehouse: [],
          plant: {}
        },
        auth_officer: {
          mail_add: {}
        },
        qualified: {}
      };
    }
  }
};
</script>

<style>
</style>
