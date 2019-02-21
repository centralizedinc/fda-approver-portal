<template>
  <v-layout row wrap>
    <v-flex xs8 class="subheading">Application Fee:</v-flex>
    <v-flex xs4>dd</v-flex>
    <v-flex xs8 class="subheading">No. of year/s applied:</v-flex>
    <v-flex xs4>dd</v-flex>
    <v-flex xs8 class="subheading">Surcharge:</v-flex>
    <v-flex xs4>dd</v-flex>
    <v-flex xs8 class="subheading">Legal Research Fund (LRF):</v-flex>
    <v-flex xs4>dd</v-flex>
    <v-flex xs8 class="title" mt-1 mb-1>Total Payment Due:</v-flex>
    <v-flex xs4>dd</v-flex>
    <!-- <v-flex xs8 class="subheading">Payment Receipt:</v-flex>
    <v-flex xs4 class="body-2">
      <a href="#">Receipt</a>
    </v-flex>-->
  </v-layout>
</template>

<script>
export default {
  props: ["form"]
};
</script>

<style>
</style>
