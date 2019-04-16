<template>
  <v-layout row wrap fill-height>
    <v-layout row wrap fill-height v-show="!details">
      <v-flex xs4>
        <span class="headline font-weight-bold">Case Number:</span>
      </v-flex>
      <v-flex xs8>
        <span class="headline font-weight-bold">{{form.case_no}}</span>
      </v-flex>
      <v-flex xs4>
        <span class="headline font-weight-bold">Total Payment: </span>
      </v-flex>
      <v-flex xs8>
        <span class="headline font-weight-bold">₱ {{numberWithCommas(charges.total)}}</span>
      </v-flex>
      <v-flex xs4 >
        <span class="headline font-weight-bold">Application Status: </span>
      </v-flex>
      <v-flex xs8 >
        <!-- <v-chip class="font-weight-bold" label color="fdaYellow" text-color="black">PENDING</v-chip> -->
        <v-chip class="headline font-weight-bold" label color="fdaYellow" text-color="black">{{getPaymentStatus(form_case.payment_status)}}</v-chip>
      </v-flex>
      <v-flex xs4 v-show="form_case.payment_status === 2">
        <span class="headline font-weight-bold">Date of Payment</span>
      </v-flex>
      <v-flex xs8 v-show="payment_status === 2" class="headline font-weight-bold">{{formatDate(form_case.payment_date)}}</v-flex>
      <v-flex xs12>
        <v-divider></v-divider>
      </v-flex>
      <v-btn block color="success" @click="details=true">Show Full Details</v-btn>
    </v-layout>
    <v-layout row wrap v-show="details">
      <v-flex xs8 class="subheading">Application Fee:</v-flex>
      <v-flex xs4>₱ {{numberWithCommas(charges.fee)}}</v-flex>
      <v-flex xs8 class="subheading">No. of year/s applied:</v-flex>
      <v-flex xs4>{{charges.yearsApplied}} years</v-flex>
      <v-flex xs8 class="subheading">Surcharge:</v-flex>
      <v-flex xs4>₱ {{numberWithCommas(charges.surcharge)}}</v-flex>
      <v-flex xs8 class="subheading">Legal Research Fund (LRF):</v-flex>
      <v-flex xs4>₱ {{numberWithCommas(charges.lrf)}}</v-flex>
      <v-flex xs8 class="title" mt-1 mb-1>Total Payment Due:</v-flex>
      <v-flex xs4>₱ {{numberWithCommas(charges.total)}}</v-flex>
      <v-flex xs12>
        <v-divider></v-divider>
      </v-flex>
      <v-btn block color="success" @click="details=false">Back</v-btn>
      <!-- <v-flex xs8 class="subheading">Payment Receipt:</v-flex>
      <v-flex xs4 class="body-2">
        <a href="#">Receipt</a>
      </v-flex> -->
    </v-layout>
  </v-layout>
</template>

<script>
export default {
  props: ["form", "form_case", "charges"],
  data() {
    return {
      details: false
    };
  }
};
</script>

<style>
</style>
