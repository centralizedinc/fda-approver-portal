<template>
  <v-layout row wrap>
    <v-card>
      <v-toolbar
        height="80px"
        color="fdaGreen"
        dark
        style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
      >
        <v-avatar class="mr-3" color="grey">
          <img src="https://i.postimg.cc/L6Z0cZk3/vue-logo.png" alt="FDA">
        </v-avatar>
        <v-spacer></v-spacer>
        <span class="font-weight-light headline">Case No.: {{selected_case.case_no}}</span>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-layout row wrap>
          <!-- Application Details -->
          <v-flex xs12>
            <v-layout row wrap>
              <span class="headline text-xs-center">Application Details</span>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click="show_overview = true">
                <v-icon>description</v-icon>View Application
              </v-btn>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-lg>
              <v-layout row wrap>
                <template v-for="(item, index) in items">
                  <v-flex xs12 md6 :key="index">
                    <v-layout row wrap>
                      <v-flex xs6>{{item.name}}</v-flex>
                      <v-flex xs6>{{getValue(item.key)}}</v-flex>
                    </v-layout>
                  </v-flex>
                </template>
              </v-layout>
            </v-container>
          </v-flex>
          <v-flex xs12 mb-4>
            <v-divider></v-divider>
          </v-flex>

          <!-- Activities -->
          <v-flex xs12>
            <span class="headline">Activities</span>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-lg>
              <v-data-table
                :headers="activities_headers"
                :items="selected_case.activities"
                class="elevation-1"
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.task_name }}</td>
                  <td>{{ props.item.status }}</td>
                  <td>{{ props.item.assigned_user }}</td>
                  <td>{{ props.item.remarks }}</td>
                  <td>{{ props.item.date_started }}</td>
                  <td>{{ props.item.date_completed }}</td>
                </template>
              </v-data-table>
            </v-container>
          </v-flex>
          <v-flex xs12 mb-4>
            <v-divider></v-divider>
          </v-flex>

          <!-- Checklist -->
          <v-flex xs12>
            <span class="headline">Checklist</span>
          </v-flex>
          <v-flex xs12 pl-5>
            <span v-if="checklist.length === 0">
              <i>No checklist</i>
            </span>
            <template v-else v-for="(item, index) in checklist">
              <v-layout row wrap :key="index">
                <v-checkbox
                  :label="item.description"
                  v-model="evaluated_case.checklist"
                  :value="item._id"
                ></v-checkbox>
              </v-layout>
            </template>
          </v-flex>

          <!-- Remarks -->
          <v-flex xs12 pa-3>
            <v-textarea outline label="Remarks" v-model="evaluated_case.remarks"></v-textarea>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn class="font-weight-light" color="error" @click="decision(2)">Disapprove</v-btn>
        <v-spacer></v-spacer>

        <v-btn class="font-weight-light" color="success" @click="decision(0)">Approve</v-btn>
        <v-spacer v-if="recommended_tasks.length > 0"></v-spacer>
        <v-btn
          class="font-weight-light"
          color="info"
          v-if="recommended_tasks.length > 0"
          @click="show_recommend=true"
        >Recommend</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="show_recommend" persistent transition="dialog-transition">
      <v-card>
        <v-card-title class="headline">Recommend to</v-card-title>
        <v-card-text>
          <v-autocomplete
            v-model="evaluated_case.recommend_to"
            :items="recommended_tasks"
            box
            color="blue-grey lighten-2"
            label="Recommend To"
            item-text="name"
            item-value="_id"
          ></v-autocomplete>
        </v-card-text>
        <v-card-actions>
          <v-btn class="font-weight-light" color="error" @click="cancel">Cancel</v-btn>
          <v-btn class="font-weight-light" color="success" @click="decision(1)">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="show_confirmation"
      max-width="300px"
      height="300px"
      persistent
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title class="title">Do you want to proceed?</v-card-title>
        <v-card-actions>
          <v-btn
            class="font-weight-light"
            color="error"
            flat
            @click="show_confirmation=false"
          >Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn class="font-weight-light" color="success" @click="submit">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <application-overview v-if="show_overview" :show="show_overview" @close="show_overview=false">
      <app-summary :form="form" :form_case="selected_case" slot="appsummary"></app-summary>
      <app-data :form="form" slot="appdata"></app-data>
      <uploaded-files :form="form" slot="uploadedfiles"></uploaded-files>
      <output-docs :form="form" slot="outputdocs"></output-docs>
      <app-history :form="form" slot="apphistory"></app-history>
      <payment-details :form="form" :charges="charges" slot="paymentdetails"></payment-details>
    </application-overview>
  </v-layout>
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
      items: [
        {
          name: "Application Type",
          key: "application_type"
        },
        {
          name: "Primary Activity",
          key: "primary_activity"
        },
        {
          name: "Current Task",
          key: "current_task"
        },
        {
          name: "Date Created",
          key: "date_created"
        }
      ],
      activities_headers: [
        {
          text: "Task",
          value: "task_name"
        },
        {
          text: "Status",
          value: "status"
        },
        {
          text: "Assigned Approver",
          value: "assigned_user"
        },
        {
          text: "Remarks",
          value: "remarks"
        },
        {
          text: "Date Started",
          value: "date_started"
        },
        {
          text: "Date Completed",
          value: "date_completed"
        }
      ],
      evaluated_case: {
        case_id: "",
        status: null,
        recommend_to: "",
        checklist: [],
        remarks: ""
      },
      show_recommend: false,
      show_overview: false,
      loading: false,
      show_confirmation: false,
      selected_case: {},
      form: {},
      checklist: [],
      recommended_tasks: [],
      charges: {},
      cases: null,
      case_holder: null
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.loading = true;
      this.selected_case = this.$store.state.evaluate.selected_case;
      this.evaluated_case.case_id = this.selected_case._id;
      console.log("case data: " + JSON.stringify(this.selected_case))
      this.$store
        .dispatch("GET_LICENSE_BY_CASE", this.selected_case._id)
        .then(result => {
          this.form = result;
          this.checkForm(result);
          return this.$store.dispatch(
            "GET_CHECKLIST_BY_TASK",
            this.selected_case.current_task
          );
        })
        .then(result => {
          this.checklist = result;
          return this.$store.dispatch(
            "GET_RECOMMENDED_TASKS",
            this.selected_case.current_task
          );
        })
        .then(result => {
          this.recommended_tasks = result;
          console.log(
            "this.recommended_tasks :",
            JSON.stringify(this.recommended_tasks)
          );
          this.loading = false;

          console.log("this is form data: " + JSON.stringify(this.form));
          var details = {
            productType: this.form.general_info.product_type,
            primaryActivity: this.form.general_info.primary_activity,
            declaredCapital: this.form.general_info.declared_capital,
            appType: this.form.application_type
          };
          console.log("load fees new license: " + JSON.stringify(details));
          return this.$store.dispatch("GET_FEES", details);
        })
        .then(result => {
          this.charges = result;
          console.log(
            "charges data payment details: " + JSON.stringify(this.charges)
          );
          return this.$store.dispatch("SET_USER");
        })
        .then(result => {
          console.log("set user: " + JSON.stringify(result))
          return this.$store.dispatch()
        })
        .catch(err => {
          console.log("err loadEvaluator:", err);
          this.loading = false;
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
    getValue(key) {
      var keys = {
        application_type: this.getAppType(this.selected_case.application_type),
        current_task: this.getTask(
          this.selected_case.case_type,
          this.selected_case.current_task
        ).name,
        primary_activity: this.getPrimaryActivity(this.selected_case.primary_activity).name,
        date_created: this.formatDate(this.selected_case.date_created)
      };
      var value = keys[key];
      return value ? value : this.selected_case[key];
    },
    cancel() {
      this.evaluated_case.recommend_to = "";
      this.show_recommend = false;
    },
    decision(status) {
      this.evaluated_case.status = status;
      this.show_recommend = false;
      this.show_confirmation = true;
    },
    submit() {
      this.evaluated_case.case_type = this.selected_case.case_type;
      console.log("evaluated_case :", JSON.stringify(this.evaluated_case));
      this.$store
        .dispatch("EVALUATE", this.evaluated_case)
        .then(result => {
          console.log("#######EVALUATE :", result);
          var prev_module = this.$store.state.evaluate.prev_module;
          this.$store.commit("CLEAR_CASE");
          console.log("prev_module :", prev_module);
          this.$router.push(prev_module);
        })
        .catch(err => {
          console.log("err decision: ", err);
        });
    }
  }
};
</script>

<style>
</style>
