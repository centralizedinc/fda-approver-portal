<template>
  <v-card>
    <v-card-text>
        <v-layout row wrap mb-2>
            <v-spacer></v-spacer>
            <v-btn color="info" @click="show_checklist=true">Show Checklist</v-btn>
        </v-layout>
        <v-layout row wrap>
            <template v-if="is_payment">
              <v-flex xs12>
                <v-autocomplete
                  :items="mode_of_payments"
                  item-text="description"
                  item-value="code"
                  label="Mode of Payment"
                  outline
                  v-model="transaction.payment_details.mode_of_payment"
                ></v-autocomplete>
              </v-flex>

              <v-flex xs12>
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
            </template>
            <!-- Remarks -->
            <v-flex xs12>
                <v-textarea outline label="Remarks" v-model="evaluated_case.remarks"></v-textarea>
            </v-flex>
        </v-layout>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <template v-if="is_payment">
        <v-btn color="success" @click="show_confirmation=true" :disabled="loading">Submit Payment</v-btn>
        <v-btn color="warning" @click="decision(3)" :disabled="loading">UNCLAIM</v-btn>
      </template>
      
      <template v-else>
        <v-speed-dial v-model="fab" direction="right" open-on-hover transition="slide-x-transition" block>
          <template v-slot:activator>
            <v-btn slot="activator" v-model="fab" fab flat icon outline color="primary">
              <v-icon>send</v-icon>
            </v-btn>
          </template>
          <v-tooltip top class="pa-1">
              <v-btn slot="activator" flat fab icon outline color="success" @click="decision(0)" :disabled="loading">
                <v-icon>thumb_up</v-icon>
              </v-btn>
              APPROVE
          </v-tooltip>
          <v-tooltip top class="pa-1">
            <v-btn slot="activator" flat fab icon outline color="error" @click="decision(2)" :disabled="loading">
              <v-icon>thumb_down</v-icon>
            </v-btn>
            DISAPPROVE
          </v-tooltip>
          <v-tooltip top class="pa-1">
              <v-btn slot="activator" flat fab icon
                class="font-weight-light" outline
                color="info" :disabled="loading"
                v-if="recommended_tasks.length > 0"
                @click="show_recommend=true">
                <v-icon>share</v-icon>
              </v-btn>
              RECOMMEND
          </v-tooltip>
          <v-tooltip top class="pa-1">
            <v-btn slot="activator" flat fab icon outline color="#9F4242" @click="decision(3)" :disabled="loading">
              <v-icon>remove_circle</v-icon>
            </v-btn>
            UNCLAIM
          </v-tooltip>
        </v-speed-dial>
      </template>
    </v-card-actions>
    <v-dialog
        v-model="show_checklist" 
        persistent :overlay="false"
        max-width="500px"
        transition="dialog-transition">
        <v-card>
            <v-toolbar
                height="80px"
                color="fdaGreen"
                dark class="headline"
                style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)">
                Checklist
            </v-toolbar>
            <v-card-text>
                <span v-if="checklist.length === 0">
                    <i>No checklist</i>
                </span>
                <template v-else v-for="(item, index) in checklist">
                    <v-layout row wrap :key="`b${index}`" 
                        class="checklist-layout"
                        @click="selectChecklist(item._id)">
                        <v-checkbox 
                            :label="item.description"
                            v-model="evaluated_case.checklist"
                            :value="item._id">
                        </v-checkbox>
                    </v-layout>
                    <v-divider :key="`c${index}`"></v-divider>
                </template>
            </v-card-text>
            <v-card-actions>
                <v-btn color="success" @click="show_checklist=false">Done</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog 
      v-model="show_recommend" 
      persistent width="400px" 
      transition="dialog-transition">
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
          <v-btn class="font-weight-light" :disabled="loading" outline color="error" @click="show_recommend=false">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn class="font-weight-light" :loading="loading" color="success" @click="decision(1)">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="show_confirmation"
      max-width="300px"
      height="300px"
      persistent
      transition="dialog-transition">
      <v-card>
        <v-toolbar
          height="80px"
          color="fdaGreen"
          dark class="headline"
          style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)">
          Confirmation
        </v-toolbar>
        <v-card-text>
          <span v-if="is_unclaim">Do you want to unclaim an application with case no.: <b>{{case_details.case_no}}</b> ?</span>
          <span v-else-if="is_payment">Do you want to proceed with an amount of <b>₱ {{numberWithCommas(transaction.payment_details.total_amount)}}</b> thru <b>{{getModeOfPayments(transaction.payment_details.mode_of_payment)}}</b>?</span>
          <span v-else>Do you want to proceed?</span>
        </v-card-text>
        <v-card-actions>
          <v-btn
            class="font-weight-light"
            color="error"
            flat :disabled="loading"
            @click="show_confirmation=false"
          >Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn class="font-weight-light" color="success" :loading="loading" @click="unclaim" v-if="is_unclaim">Continue</v-btn>
          <v-btn class="font-weight-light" color="success" :loading="loading" @click="submit_payment" v-else-if="is_payment">Continue and Submit</v-btn>
          <v-btn class="font-weight-light" color="success" :loading="loading" @click="submit" v-else>Continue and Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      fab: false,
      evaluated_case: {
        case_id: "",
        status: null,
        recommend_to: "",
        checklist: [],
        remarks: ""
      },
      is_unclaim: false,
      show_recommend: false,
      loading: false,
      show_confirmation: false,
      show_checklist: false,
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
      transaction: {
        payment_details: {
          total_amount: 0,
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
      }
    };
  },
  created() {
    this.init();
  },
  computed: {
    case_details() {
      return this.$store.state.case.case_details;
    },
    checklist() {
      return this.$store.state.license.checklist;
    },
    recommended_tasks() {
      return this.$store.state.license.recommended_tasks;
    },
    is_payment() {
      var task = this.getTask(
        this.case_details.case_type,
        this.case_details.current_task
      );
      return task.start_process && this.case_details.payment_status !== 2;
    },
    history_transactions() {
      var history = this.$store.state.payments.history_transactions;
      if (!history) return [];
      var hist_trans = [];
      history.forEach(hist => {
        if (hist.payment_details.status !== 0) hist_trans.push(hist);
      });
      return hist_trans;
    },
    charges() {
      return this.$store.state.payments.fee || {};
    },
    total_amount_paid() {
      var total = 0;
      this.history_transactions.forEach(trans => {
        total += trans.payment_details.total_amount;
      });
      return total;
    },
    current_remaining_balance() {
      return this.charges.total - this.total_amount_paid;
    },
    remaining_balance() {
      var total =
        this.current_remaining_balance -
        this.transaction.payment_details.total_amount;
      if (total < 1) {
        return 0;
      }
      return total;
    }
  },
  methods: {
    init() {
      this.evaluated_case.case_id = this.case_details._id;
      this.transaction.transaction_details.application_type = this.case_details.application_type;
      this.transaction.transaction_details.application = this.case_details.case_type;
      this.transaction.transaction_details.case_no = this.case_details.case_no;
      this.$store
        .dispatch("GET_CHECKLIST_BY_TASK", this.case_details.current_task)
        .then(result => {
          return this.$store.dispatch(
            "GET_RECOMMENDED_TASKS",
            this.case_details.current_task
          );
        })
        .catch(err => {
          console.log("err :", err);
          this.$notifyError(err);
        });
    },
    selectChecklist(checklist_id) {
      var index = this.evaluated_case.checklist.findIndex(
        x => x === checklist_id.toString()
      );
      console.log("checklist index :", index);
      if (index > -1) {
        this.evaluated_case.checklist.splice(index, 1);
      } else {
        this.evaluated_case.checklist.push(checklist_id);
      }
    },
    decision(status) {
      if (status === 3) {
        this.is_unclaim = true;
      } else {
        this.evaluated_case.status = status;
        this.show_recommend = false;
      }
      this.show_confirmation = true;
    },
    submit_payment() {
      this.loading = true;
      this.evaluated_case.status = 0;
      this.evaluated_case.case_type = this.case_details.case_type;

      this.transaction.transaction_details.order_payment = {
        fee: this.charges.fee,
        lrf: this.charges.lrf,
        surcharge: this.charges.surcharge,
        interest: this.charges.interest,
        total_amount: this.charges.total
      };
      console.log("this.evaluated_case :", this.evaluated_case);
      console.log("this.transaction :", this.transaction);
      this.$store
        .dispatch("SAVE_TRANSACTION", this.transaction)
        .then(result => {
          console.log("result payments :", result);
          if (result.payment_status === 2) {
            return this.$store.dispatch("EVALUATE", this.evaluated_case);
          }
        })
        .then(result => {
          console.log("evaluate data form form: " + JSON.stringify(result))
          this.loading = false;
          this.show_confirmation = false;
          var details = {
            case_no: this.case_details.case_no,
            fee: this.formatCurrency(this.charges.fee),
            lrf: this.formatCurrency(this.charges.lrf),
            penalty: this.formatCurrency(
              parseFloat(this.charges.surcharge) +
                parseFloat(this.charges.interest)
            ),
            total: this.formatCurrency(this.charges.total),
            amount: this.formatCurrency(
              this.transaction.payment_details.total_amount
            ),
            remaining_balance: this.formatCurrency(this.remaining_balance)
          };
          this.$notify({
            message:
              "Successfully transaction of an application with case no.: " +
              this.case_details.case_no,
            icon: "check_circle",
            color: "success"
          });
          this.$print(details, "RCPT");

          this.$store.dispatch("GET_UNASSIGNED", true);
          this.$store.dispatch("GET_INBOX", true);
          this.$store.dispatch("GET_PARTICIPATED", true);

          this.$store.dispatch("CLOSE_REVIEW_DATA");
          this.resetTransaction();
        })
        .catch(err => {
          this.loading = false;
          console.log("err decision: ", err);
        });
    },
    submit() {
      this.loading = true;
      this.evaluated_case.case_type = this.case_details.case_type;
      console.log("this.evaluated_case :", this.evaluated_case);
      this.$store
        .dispatch("EVALUATE", this.evaluated_case)
        .then(result => {
          this.loading = false;
          this.show_confirmation = false;
          this.$store.dispatch("CLOSE_REVIEW_DATA");
          this.$notify({
            message:
              "Successfully evaluate an application with case no.: " +
              this.case_details.case_no,
            icon: "check_circle",
            color: "success"
          });
          // this.$router.go(-1);
        })
        .catch(err => {
          this.loading = false;
          console.log("err decision: ", err);
        });
    },
    unclaim() {
      this.loading = true;
      this.$store
        .dispatch("UNCLAIM", this.case_details)
        .then(result => {
          this.$notify({
            message:
              "Unclaim an application with case no.: " +
              this.case_details.case_no,
            icon: "check_circle",
            color: "success"
          });
          this.is_unclaim = false;
          this.show_confirmation = false;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          console.log("err claim: ", err);
          this.$notifyError(err);
        });
    },
    resetTransaction() {
      this.evaluated_case = {
        case_id: "",
        status: null,
        recommend_to: "",
        checklist: [],
        remarks: ""
      };
      this.transaction = {
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
      };
    }
  },
  watch: {
    show_confirmation(val) {
      if (!val) {
        this.is_unclaim = false;
      }
    }
  }
};
</script>

<style>
.checklist-layout {
  cursor: pointer;
}
</style>
