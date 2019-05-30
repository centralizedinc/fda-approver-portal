<template>
    <div>
        <v-dialog
            v-model="show"
            scrollable max-width="" 
            persistent :overlay="false"
            transition="dialog-transition">
            <v-card>
                <v-toolbar class="title-bg headline white--text" dark>
                    <span class="headline font-weight-light">Case No.: {{case_details.case_no}} ({{getAppType(case_details.application_type, case_details.case_type)}})</span>
                    <!-- <v-btn color="primary">accept & submit</v-btn> -->
                    <v-spacer></v-spacer>
                    <!-- <v-btn outline color="primary" @click="close()">Cancel</v-btn> -->
                    
                    <v-btn flat icon color="primary" @click="close()">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-layout row wrap>
                        <v-scroll-x-transition>
                            <v-flex v-bind="{ [`xs${claimed?7:12}`]: true }">
                                <v-container 
                                    grid-list-md 
                                    id="summary-layout" 
                                    :style="claimed?'max-height: 500px':''" 
                                    class="scroll-y">
                                    <v-layout row wrap v-scroll:#summary-layout>
                                        
                                        <!-- Activities -->
                                        <v-flex v-bind="{ [`xs${claimed?12:6}`]: true }">
                                            <v-card>
                                                <v-card-title class="title-bg title white--text" dark>
                                                    Activities
                                                    <v-spacer></v-spacer>
                                                    <v-btn @click="show_tab1=!show_tab1" flat icon>
                                                        <v-icon>{{show_tab1?'expand_less':'expand_more'}}</v-icon>
                                                    </v-btn>
                                                </v-card-title>
                                                <v-divider v-show="show_tab1"></v-divider>
                                                <v-card-text v-show="show_tab1">
                                                    
                                                    <v-flex xs12 v-if="!case_details.activities || case_details.activities.length <= 0" class="subheading">
                                                        <i>No Activities</i>
                                                    </v-flex>
                                                    <v-flex xs12 
                                                        v-else
                                                        v-for="(item, index) in case_details.activities" 
                                                        :key="`a${index}`">
                                                        <span class="subheading" ma-1>
                                                            <span class="font-weight-bold">{{
                                                                getAdminUser(item.assigned_user).last_name ||
                                                                (getClientUser(item.assigned_user).name.last ? 'Client' : "")
                                                            }}/{{
                                                                getTask(case_details.case_type, item.task_id).name
                                                            }} ({{
                                                                getActivityStatus(item.status)
                                                            }})</span> - <i>{{
                                                                formatDate(item.date_completed, {month: '2-digit', day: '2-digit', year: '2-digit'})
                                                            }}</i>
                                                        </span>
                                                        <p class="body-1" style="text-indent: 50px;">{{item.remarks}}</p>
                                                        <p v-if="item.files && item.files.length > 0">
                                                            <span class="body-2" style="margin-left: 50px;">Attachment(s): </span>
                                                            <span class="body-1">
                                                                <template v-for="(file, i) in item.files">
                                                                    <v-menu offset-y top open-on-hover :key="`f${i}`" @>
                                                                        <a slot="activator" :href="file.location">{{file.originalname}}</a>
                                                                        <v-card tile class="d-flex" width="250px" @click="viewFile(file.location)" style="cursor:zoom-in">
                                                                            <pdf
                                                                                v-show="file.loaded"
                                                                                @loaded="file.loaded=true"
                                                                                :src="'https://cors-anywhere.herokuapp.com/' + file.location"
                                                                            ></pdf>
                                                                            <v-progress-circular v-show="!file.loaded" indeterminate color="primary"></v-progress-circular>
                                                                        </v-card>
                                                                    </v-menu> /
                                                                </template>
                                                            </span>
                                                        </p>
                                                        <v-divider></v-divider>
                                                    </v-flex>
                                                </v-card-text>
                                            </v-card>
                                        </v-flex>

                                        <!-- Payments Summary -->
                                        <v-flex v-bind="{ [`xs${claimed?12:6}`]: true }">
                                            <v-card>
                                                <v-card-title class="title-bg title white--text" dark>
                                                    Payments Summary
                                                    <v-spacer></v-spacer>
                                                    <v-btn @click="show_tab2=!show_tab2" flat icon>
                                                        <v-icon>{{show_tab2?'expand_less':'expand_more'}}</v-icon>
                                                    </v-btn>
                                                </v-card-title>
                                                <v-divider v-show="show_tab2"></v-divider>
                                                <v-card-text v-show="show_tab2">
                                                    <v-layout row wrap>
                                                        <v-flex xs12 class="body-2">
                                                            Payment Status: <v-chip class="body-2 font-weight-bold" style="float: right" label :color="getPaymentStatusColor(case_details.payment_status)" text-color="white">{{getPaymentStatus(case_details.payment_status)}}</v-chip>
                                                        </v-flex>
                                                        <v-flex xs12 v-if="case_details.payment_status">
                                                            Date of Last Payment: <span style="float: right">{{formatDate(case_details.payment_date)}}</span>
                                                        </v-flex>
                                                        <v-flex xs12>
                                                            <v-divider></v-divider>
                                                        </v-flex>
                                                        <v-flex xs12>
                                                            Application Fee: <span style="float: right">₱ {{numberWithCommas(charges.fee)}}</span>
                                                        </v-flex>
                                                        <v-flex xs12>
                                                            No. of year(s) applied: <span style="float: right">{{charges.yearsApplied}} years</span>
                                                        </v-flex>
                                                        <v-flex xs12>
                                                            Surcharge: <span style="float: right">₱ {{numberWithCommas(charges.surcharge)}}</span>
                                                        </v-flex>
                                                        <v-flex xs12>
                                                            Legal Research Fund(LRF): <span style="float: right">₱ {{numberWithCommas(charges.lrf)}}</span>
                                                        </v-flex>
                                                        <v-flex xs12>
                                                            <v-divider></v-divider>
                                                        </v-flex>
                                                        <v-flex xs12 class="body-2 font-weight-bold">
                                                            Total Payment: <span style="float: right">₱ {{numberWithCommas(charges.total)}}</span>
                                                        </v-flex>
                                                        <template v-if="history_transactions && history_transactions.length > 0">
                                                            <v-flex xs12>
                                                                <v-divider></v-divider>
                                                            </v-flex>
                                                            <v-flex xs12 class="body-2">
                                                                Transaction history
                                                            </v-flex>
                                                            <v-flex xs12 v-for="(item, index) in history_transactions" :key="`e${index}`">
                                                                <span class="body-1">{{getModeOfPayments(item.payment_details.mode_of_payment)}}</span> - 
                                                                <i class="caption">
                                                                    {{
                                                                        formatDate(item.date_created, {
                                                                            month: "2-digit", 
                                                                            day: "2-digit",
                                                                            year: "2-digit"
                                                                        })
                                                                    }}
                                                                </i> 
                                                                <span class="body-1" style="float: right">₱ {{numberWithCommas(item.payment_details.total_amount)}}</span>
                                                            </v-flex>
                                                            <v-flex xs12 class="body-2 font-weight-bold">
                                                                Total Amount Paid: <span style="float: right">₱ {{numberWithCommas(total_amount_paid)}}</span>
                                                            </v-flex>
                                                            <v-flex xs12>
                                                                <v-divider></v-divider>
                                                            </v-flex>
                                                            <v-flex xs12 class="body-2 font-weight-bold">
                                                                Total Remaining Balance: <span style="float: right">₱ {{numberWithCommas(current_remaining_balance)}}</span>
                                                            </v-flex>
                                                        </template>
                                                    </v-layout>
                                                </v-card-text>
                                            </v-card>
                                        </v-flex>
                                        
                                        <review-license-application 
                                            v-if="case_details.case_type === 0"
                                            :claimed="claimed"
                                            :show_tabs_ext="show_tabs_ext"
                                            :form_details="form_details">
                                        </review-license-application>
                                        
                                        <review-certificate-application 
                                            v-if="case_details.case_type === 1"
                                            :claimed="claimed"
                                            :show_tabs_ext="show_tabs_ext"
                                            :form_details="form_details">
                                        </review-certificate-application>

                                        <!-- Documents -->
                                        <v-flex xs12>
                                            <v-card>
                                                <v-card-title class="title-bg title white--text" dark>
                                                    Uploaded Documents
                                                    <v-spacer></v-spacer>
                                                    <v-btn @click="show_tab9=!show_tab9" flat icon>
                                                        <v-icon>{{show_tab9?'expand_less':'expand_more'}}</v-icon>
                                                    </v-btn>
                                                </v-card-title>
                                                <v-divider v-show="show_tab9"></v-divider>
                                                <v-card-text v-show="show_tab9">
                                                    <v-layout row wrap>
                                                        <!-- {{form_details.uploaded_files}} -->
                                                        <v-flex v-bind="{ [`xs${claimed?6:3}`]: true }"
                                                            v-for="(item, index) in form_details.uploaded_files" 
                                                            :key="`d${index}`" pa-2>
                                                            <v-card max-width="200" @click="viewFile(item.location)" style="cursor:zoom-in">
                                                                <v-tooltip top>
                                                                    <pdf
                                                                        slot="activator"
                                                                        v-show="load_uploaded"
                                                                        @loaded="load_uploaded=true"
                                                                        :src="'https://cors-anywhere.herokuapp.com/' + item.location"
                                                                    ></pdf>
                                                                    {{item.originalname}}
                                                                </v-tooltip>
                                                                <v-progress-circular v-show="!load_uploaded" indeterminate color="primary"></v-progress-circular>
                                                            </v-card>
                                                        </v-flex>
                                                    </v-layout>
                                                </v-card-text>
                                            </v-card>
                                        </v-flex>

                                        <!-- Output Documents -->
                                        <v-flex xs12>
                                            <v-card>
                                                <v-card-title class="title-bg title white--text" dark>
                                                    Output Documents
                                                    <v-spacer></v-spacer>
                                                    <v-btn @click="show_tab10=!show_tab10" flat icon>
                                                        <v-icon>{{show_tab10?'expand_less':'expand_more'}}</v-icon>
                                                    </v-btn>
                                                </v-card-title>
                                                <v-divider v-show="show_tab10"></v-divider>
                                                <v-card-text v-show="show_tab10">
                                                    <v-layout row wrap>
                                                        <!-- {{form_details.uploaded_files}} -->
                                                        <v-flex v-bind="{ [`xs${claimed?6:3}`]: true }"
                                                            v-for="(item, index) in form_details.output_files" 
                                                            :key="`d${index}`" pa-2 d-flex>
                                                            <v-card max-width="200" @click="viewFile(item.location)" style="cursor:zoom-in" class="d-flex">
                                                                <v-tooltip top>
                                                                    <pdf
                                                                        slot="activator"
                                                                        v-show="load_output"
                                                                        @loaded="load_output=true"
                                                                        :src="'https://cors-anywhere.herokuapp.com/' + item.location"
                                                                    ></pdf>
                                                                    {{item.originalname}}
                                                                </v-tooltip>
                                                                <v-progress-circular v-show="!load_output" indeterminate color="primary"></v-progress-circular>
                                                            </v-card>
                                                        </v-flex>
                                                    </v-layout>
                                                </v-card-text>
                                            </v-card>
                                        </v-flex>

                                    </v-layout>
                                </v-container>
                            </v-flex>
                        </v-scroll-x-transition>
                        <v-scroll-x-reverse-transition>
                            <v-flex xs4 ml-5 v-if="claimed">
                                <evaluation-form></evaluation-form>
                            </v-flex>
                        </v-scroll-x-reverse-transition>
                    </v-layout>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions v-if="for_unassigned">
                    <v-btn 
                        color="primary" 
                        @click="show_confirmation=true" 
                        :loading="loading" 
                        block>
                        CLAIM <v-icon>bookmark</v-icon>
                    </v-btn>
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
                    Do you want to claim an application with case no.: <b>{{case_details.case_no}}</b> ?
                </v-card-text>
                <v-card-actions>
                <v-btn
                    class="font-weight-light"
                    color="error"
                    flat :disabled="loading"
                    @click="show_confirmation=false"
                >Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn class="font-weight-light" color="success" :loading="loading" @click="claim">Continue</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import EvaluationForm from "./EvaluationForm";
import pdf from "vue-pdf";
import ReviewLicenseApplication from "./ReviewLicenseApplication"
import ReviewCertificateApplication from "./ReviewCertificateApplication"

export default {
  components: {
    EvaluationForm,
    pdf,
    ReviewLicenseApplication,
    ReviewCertificateApplication
  },
  data() {
    return {
      show_tab1: false, //Activities
      show_tab2: false, //Payments Summary
      show_tab9: false, //Upload Documents
      show_tab10: false, //Output Documents
      loading: false,
      show_confirmation: false,
      load_uploaded: false,
      load_output: false,
      show_tabs_ext: false
    };
  },
  computed: {
    show() {
      return this.$store.state.case.review;
    },
    claimed() {
      if (this.$store.state.case.review_access === 1) {
        if (this.is_payment) this.show_tabs(false, "show_tab2");
        else this.show_tabs(false, "show_tab1");
      } else this.show_tabs(true);
      return this.$store.state.case.review_access === 1;
    },
    for_unassigned() {
      return this.$store.state.case.review_access === 0;
    },
    case_details() {
      return this.$store.state.case.case_details;
    },
    form_details() {
      return this.$store.state.case.form_details;
    },
    charges() {
      return this.$store.state.payments.fee || {};
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
    is_payment() {
      var task = this.getTask(
        this.case_details.case_type,
        this.case_details.current_task
      );
      return task.start_process && this.case_details.payment_status !== 2;
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.claimed) {
        if (this.is_payment) this.show_tabs(false, "show_tab2");
        else this.show_tabs(false, "show_tab1");
      } else this.show_tabs(true);
      this.$store.dispatch("CHECK_REVIEW_ACCESS");
    },
    claim() {
      this.loading = true;
      this.$store
        .dispatch("CLAIM", this.case_details)
        .then(result => {
          this.$notify({
            message:
              "Successfully claimed an application with case no.: " +
              this.case_details.case_no,
            icon: "check_circle",
            color: "success"
          });

          this.show_confirmation = false;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          console.log("err claim: ", err);
          this.$notifyError(err);
        });
    },
    close() {
      this.$store.commit("CLOSE_REVIEW");
    },
    show_tabs(is_all, except) {
      this.show_tab1 = is_all;
      this.show_tab2 = is_all;
      this.show_tabs_ext = is_all;
      this.show_tab9 = is_all;
      this.show_tab10 = is_all;

      if (except) this[except] = !is_all;
    },
    viewFile(url) {
      window.open(url, "_blank");
    }
  }
};
</script>

<style>
.title-bg {
  background: linear-gradient(45deg, #104b2a 0%, #b5c25a 100%);
  padding: 0 0 0 15px;
}
</style>
