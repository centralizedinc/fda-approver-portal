<template>
    <div>
      <application-table :models="unassigned" :headers="headers" :loading="loading" @view="viewApp"></application-table>
      <application-overview v-if="show_overview" :show="show_overview" :canclaim="true" :loading="loading_btn" @claim="claim" @close="close">
        <app-summary :form="form" :form_case="selected_case" slot="appsummary"></app-summary>
        <app-data :form="form" slot="appdata"></app-data>
        <uploaded-files :form="form" slot="uploadedfiles"></uploaded-files>
        <output-docs :form="form" slot="outputdocs"></output-docs>
        <app-history :form="form" slot="apphistory"></app-history>
        <payment-details :form="form" :charges="charges" :form_case="selected_case" slot="paymentdetails"></payment-details>
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
      show_overview: false,
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
        charges: {},
        qualified: {}
      },
      loading_btn: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.loading = true;
      this.unassigned = this.$store.state.unassigned.unassigned;
      this.$store
        .dispatch("GET_UNASSIGNED")
        .then(result => {
          this.unassigned = this.$store.state.unassigned.unassigned;
          this.loading = false;

          var details = {
            productType: this.form.general_info.product_type,
            primaryActivity: this.form.general_info.primary_activity,
            declaredCapital: this.form.general_info.declared_capital,
            appType: this.form.application_type
          };
          return this.$store.dispatch("GET_FEES", details);
        })
        .then(result => {
          this.charges = result;
        })
        .catch(err => {
          console.log("err init: ", err);
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
    },
    claim() {
      this.loading = true;
      this.loading_btn = true;
      this.$store
        .dispatch("CLAIM", this.selected_case)
        .then(result => {
          this.loading = false;
          this.loading_btn = true;
          this.$store.commit("SET_CASE", {
            _case: this.selected_case,
            prev_module: "/app/unassigned"
          });
          this.$router.push("/app/evaluation");
        })
        .catch(err => {
          this.loading = false;
          this.loading_btn = true;
          console.log("err claim: ", err);
        });
    }
  }
};
</script>

<style>
</style>
