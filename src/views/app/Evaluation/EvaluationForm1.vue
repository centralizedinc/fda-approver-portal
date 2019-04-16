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
                  <td>{{ getTask(selected_case.case_type, props.item.task_id).name }}</td>
                  <td
                    :class="['text--approved', 'text--recommend', 'text--disapproved'][props.item.status]"
                  >{{ getActivityStatus(props.item.status) }}</td>
                  <td
                    :class="getClientUser(props.item.assigned_user).last_name ? 'text--fdaBlueGreen' : ''"
                  >
                    {{
                    getAdminUser(props.item.assigned_user).last_name ||
                    (getClientUser(props.item.assigned_user).last_name ? 'Client' : "")
                    }}
                  </td>
                  <td>{{ props.item.remarks }}</td>
                  <td>{{ formatDate(props.item.date_started) }}</td>
                  <td>{{ formatDate(props.item.date_completed) }}</td>
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
          
          <v-flex xs5 v-if="is_payment">
            <v-autocomplete
              :items="mode_of_payments"
              item-text="description"
              item-value="code"
              label="Mode of Payment"
              outline
              v-model="transaction.payment_details.mode_of_payment"
            ></v-autocomplete>
          </v-flex>

          <v-flex xs6 offset-xs1 v-if="is_payment">
            <v-text-field
              name="amount"
              label="Amount"
              id="amount" outline 
              prefix="₱"
              type="number"
              placeholder="0.00"
              v-model="transaction.payment_details.total_amount"
            ></v-text-field>
          </v-flex>

          <!-- Remarks -->
          <v-flex xs12>
            <v-textarea outline label="Remarks" v-model="evaluated_case.remarks"></v-textarea>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn class="font-weight-light" color="error" @click="decision(2)" :loading="loading">Disapprove</v-btn>
        <v-spacer></v-spacer>

        <v-btn 
          class="font-weight-light" 
          color="success" 
          @click="decision(0)" 
          :disabled="is_payment&&transaction.payment_details.mode_of_payment&&transaction.payment_details.total_amount<1"
          :loading="loading">
          {{ is_payment ? 'Submit Payment' : 'Approve'}}
        </v-btn>
        <v-spacer v-if="recommended_tasks.length > 0"></v-spacer>
        <v-btn
          class="font-weight-light"
          color="info"
          :loading="loading"
          v-if="recommended_tasks.length > 0"
          @click="show_recommend=true"
        >Recommend</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="show_recommend" persistent width="400px" transition="dialog-transition">
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
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn class="font-weight-light" outline color="error" @click="cancel">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn class="font-weight-light" :loading="loading" :disabled="loading" color="success" @click="decision(1)">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="show_confirmation"
      :max-width="is_payment ? '700px' : '300px'"
      height="300px"
      persistent
      transition="dialog-transition">
      <v-card>
        <v-toolbar
          height="80px"
          color="fdaGreen"
          dark class="headline"
          style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)">
          {{is_payment ? 'Transaction Details' : 'Confirmation'}}
        </v-toolbar>
        <v-card-text>
          <div v-if="is_payment">
            <v-container grid-list-xl>
              <v-layout row wrap>
                <v-flex xs5 class="subheading">Application Fee:</v-flex>
                <v-flex xs4>₱ {{numberWithCommas(charges.fee)}}</v-flex>
                <v-flex xs3></v-flex>
                <v-flex xs5 class="subheading">No. of year/s applied:</v-flex>
                <v-flex xs4>{{charges.yearsApplied}} years</v-flex>
                <v-flex xs3></v-flex>
                <v-flex xs5 class="subheading">Surcharge:</v-flex>
                <v-flex xs4>₱ {{numberWithCommas(charges.surcharge)}}</v-flex>
                <v-flex xs3></v-flex>
                <v-flex xs5 class="subheading">Legal Research Fund (LRF):</v-flex>
                <v-flex xs4>₱ {{numberWithCommas(charges.lrf)}}</v-flex>
                <v-flex xs3></v-flex>
                <v-flex xs9 class="title" mt-1 mb-1>Total Payment Due:</v-flex>
                <v-flex xs3>₱ {{numberWithCommas(charges.total)}}</v-flex>
                <v-flex xs12>
                  <v-divider></v-divider>
                </v-flex>
                <v-flex xs12>
                  Previous Transactions
                </v-flex>
                <v-flex xs12 v-if="history_transactions && history_transactions.length > 0">
                  <v-layout row wrap>
                    <template v-for="(item, index) in history_transactions">
                      <v-flex xs5 class="subheading" mt-1 mb-1 :key="index">
                        <i>{{formatDate(item.date_created)}}</i>
                      </v-flex>
                      <v-flex xs4 :key="index">₱ {{numberWithCommas(item.payment_details.total_amount)}}</v-flex>
                      <v-flex xs3 :key="index"></v-flex>
                    </template>
                  </v-layout>
                </v-flex>
                <v-flex xs11 offset-xs1 class="body-2" v-else>
                  <i>No Previous Transaction</i>
                </v-flex>
                <v-flex xs9 class="title" mt-1 mb-1>Total Previous Amount:</v-flex>
                <v-flex xs3>₱ {{numberWithCommas(total_previous)}}</v-flex>
                <v-flex xs12>
                  <v-divider></v-divider>
                </v-flex>
                <v-flex xs9 class="title" mt-1 mb-1>Total:</v-flex>
                <v-flex xs3>₱ {{numberWithCommas(total_remaining)}}</v-flex>
                <v-flex xs9 class="title" mt-1 mb-1>Amount Due ({{modeOfPayment.description}}):</v-flex>
                <v-flex xs3>₱ {{numberWithCommas(transaction.payment_details.total_amount)}}</v-flex>
                <v-flex xs9 class="title" mt-1 mb-1>Remaining Balance:</v-flex>
                <v-flex xs3>₱ {{numberWithCommas(remaining_balance)}}</v-flex>
              </v-layout>
            </v-container>
          </div>
          <div v-else>
            Do you want to proceed?
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="font-weight-light"
            color="error"
            flat
            @click="show_confirmation=false"
          >Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn class="font-weight-light" color="success" :loading="loading" :disabled="loading" @click="submit">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <application-overview v-if="show_overview" :show="show_overview" @close="show_overview=false">
      <app-summary :form="form" :form_case="selected_case" slot="appsummary"></app-summary>
      <app-data :form="form" slot="appdata"></app-data>
      <uploaded-files :form="form" slot="uploadedfiles"></uploaded-files>
      <output-docs :form="form" slot="outputdocs"></output-docs>
      <app-history :form="form" slot="apphistory"></app-history>
      <payment-details
        :form="form"
        :charges="charges"
        :form_case="selected_case"
        slot="paymentdetails"
      ></payment-details>
    </application-overview>
  </v-layout>
</template>

<script>
import tabscomponents from "../../../components/ApplicationOverview/index.js";
// const tabscomponents = Object.assign(
//   {
//     ApplicationTable: () => import("@/components/ApplicationTable")
//   },
//   overview_components
// );
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
          text: "Assigned User",
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
      case_holder: null,
      is_payment: false,
      transaction: {
        payment_details: {
          total_amount: null,
          mode_of_payment: ""
        },
        transaction_details: {
          application_type: "",
          application: "",
          case_no: "",
          order_payment: {
            fee: 0,
            lrf: 0,
            penalty: 0,
            total_amount: 0
          }
        }
      },
      mode_of_payments: [
        {
          description: "Cash",
          code: 1
        },
        {
          description: "Credit Card",
          code: 2
        },
        {
          description: "Cheque",
          code: 3
        }
      ],
      history_transactions: []
    };
  },
  created() {
    this.init();
  },
  computed: {
    total_previous() {
      var total = 0;
      this.history_transactions.forEach(trans => {
        total += trans.payment_details.total_amount;
      });
      return total;
    },
    total_remaining() {
      return this.charges.total - this.total_previous;
    },
    remaining_balance() {
      var total =
        this.total_remaining - this.transaction.payment_details.total_amount;
      if (total < 1) {
        return 0;
      }
      return total;
    },
    modeOfPayment() {
      if (this.transaction.payment_details.mode_of_payment) {
        return this.mode_of_payments.find(
          x => x.code === this.transaction.payment_details.mode_of_payment
        );
      } else return {};
    }
  },
  methods: {
    init() {
      this.loading = true;
      this.selected_case = this.$store.state.evaluate.selected_case;
      this.evaluated_case.case_id = this.selected_case._id;
      this.transaction.transaction_details.application_type = this.selected_case.application_type;
      this.transaction.transaction_details.application = this.selected_case.case_type;
      this.transaction.transaction_details.case_no = this.selected_case.case_no;
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
          var details = {
            productType: this.form.general_info.product_type,
            primaryActivity: this.form.general_info.primary_activity,
            declaredCapital: this.form.general_info.declared_capital,
            appType: this.form.application_type
          };
          return this.$store.dispatch("GET_COMPUTED_FEES", {
            details,
            case_no: this.selected_case.case_no
          });
        })
        .then(result => {
          this.charges = result.model.fees;
          this.history_transactions = result.model.transactions;
          if (this.charges) {
            this.transaction.transaction_details.order_payment = {
              fee: this.charges.fee,
              lrf: this.charges.lrf,
              penalty:
                parseInt(this.charges.surcharge) +
                parseInt(this.charges.interest),
              total_amount: this.charges.total
            };
          }
          return this.$store.dispatch("SET_USER");
        })
        .then(result => {
          return this.$store.dispatch(
            "GET_TASK_BY_ID",
            this.selected_case.current_task
          );
        })
        .then(result => {
          this.is_payment =
            result.data.model.start_process && this.selected_case.payment_status !== 2;
          this.loading = false;
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
        primary_activity: this.getPrimaryActivity(
          this.selected_case.primary_activity
        ).name,
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
      this.loading = true;
      this.evaluated_case.case_type = this.selected_case.case_type;
      if (this.is_payment) {
        var transaction = {};
        this.$store
          .dispatch("SAVE_TRANSACTION", this.transaction)
          .then(result => {
            transaction = result.data.model.transaction;
            if (result.data.isFullyPaid) {
              return this.$store.dispatch("EVALUATE", this.evaluated_case);
            }
          })
          .then(result => {
            this.loading = false;

            var details = {
              case_no: this.selected_case.case_no,
              fee: this.charges.fee,
              lrf: this.charges.lrf,
              penalty:
                parseFloat(this.charges.surcharge) +
                parseFloat(this.charges.interest),
              total: this.charges.total,
              amount: this.transaction.payment_details.total_amount,
              remaining_balance: this.remaining_balance
            };
            this.$print(details, "RCPT");

            this.$store.commit("CLEAR_CASE");
            this.$router.go(-1);
          })
          .catch(err => {
            this.loading = false;
            console.log("err decision: ", err);
          });
      } else {
        this.$store
          .dispatch("EVALUATE", this.evaluated_case)
          .then(result => {
            this.loading = false;
            this.$store.commit("CLEAR_CASE");
            this.$router.go(-1);
          })
          .catch(err => {
            this.loading = false;
            console.log("err decision: ", err);
          });
      }
    }
  }
};
</script>

<style>
.text--fdaBlueGreen {
  color: #f58555;
}

.text--approved {
  color: #38c73c;
}

.text--disapproved {
  color: #ff5252;
}

.text--recommend {
  color: blue;
}
</style>
