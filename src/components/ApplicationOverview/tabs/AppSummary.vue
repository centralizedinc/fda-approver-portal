<template>
  <v-layout row wrap>
    <v-flex xs12 md4 class="subheading">Case Number</v-flex>
    <v-flex xs12 md8>{{form.case_no}}</v-flex>
    <v-flex xs12 md4 class="subheading">Application Type</v-flex>
    <v-flex xs12 md8>{{form.application_type}}</v-flex>
    <v-flex xs12 md4 class="subheading">Name of Establishment</v-flex>
    <v-flex xs12 md8>{{form.estab_details.establishment_name}}</v-flex>
    <v-flex xs12 md4 class="subheading">Product Type</v-flex>
    <v-flex xs12 md8>{{form.general_info.product_type}}</v-flex>
    <v-flex xs12 md4 class="subheading">Primary Activity</v-flex>
    <v-flex xs12 md8>{{form.general_info.primary_activity}}</v-flex>
    <v-flex xs12 md4 class="subheading">Current Task</v-flex>
    <v-flex xs12 md8>{{form.current_task}}</v-flex>
    <v-flex xs12 md4 class="subheading">Current User</v-flex>
    <v-flex xs12 md8>{{form.user}}</v-flex>
    <v-flex xs12 md4 class="subheading">Required Action</v-flex>
    <v-flex xs12 md8>{{form.action}}</v-flex>
    <v-flex xs12 md4 class="subheading">Created by</v-flex>
    <v-flex xs12 md8>{{form.created_by}}</v-flex>
    <v-flex xs12 md4 class="subheading">Created Date</v-flex>
    <v-flex xs12 md8>{{form.date_created}}</v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["form"]
};
</script>

<style>
</style>
