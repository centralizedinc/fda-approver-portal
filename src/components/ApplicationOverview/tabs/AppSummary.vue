<template>
  <v-layout row wrap>
    <v-flex xs12 md4 class="subheading">Case Number</v-flex>
    <v-flex xs12 md8>{{form.case_no}}</v-flex>
    <v-flex xs12 md4 class="subheading">Application Type</v-flex>
    <v-flex xs12 md8>{{getAppType(form.application_type)}}</v-flex>
    <v-flex xs12 md4 class="subheading">Name of Establishment</v-flex>
    <v-flex xs12 md8>{{form.estab_details.establishment_name}}</v-flex>
    <v-flex xs12 md4 class="subheading">Product Type</v-flex>
    <v-flex xs12 md8>{{getProduct(form.general_info.product_type).name}}</v-flex>
    <v-flex xs12 md4 class="subheading">Primary Activity</v-flex>
    <v-flex xs12 md8>{{getPrimary(form.general_info.primary_activity)}}</v-flex>
    <v-flex xs12 md4 class="subheading">Current Task</v-flex>
    <v-flex xs12 md8>{{getTask(form_case.case_type, form_case.current_task).name}}</v-flex>
    <v-flex xs12 md4 class="subheading">Current User</v-flex>
    <v-flex xs12 md8>{{getAdminUser(form_case.current_assigned_user).last_name}}</v-flex>
    <!-- <v-flex xs12 md4 class="subheading">Required Action</v-flex>
    <v-flex xs12 md8>{{}}</v-flex> -->
    <v-flex xs12 md4 class="subheading">Previous Task</v-flex>
    <v-flex xs12 md8>{{getTask(form_case.case_type, form_case.previous_task).name}}</v-flex>
    <v-flex xs12 md4 class="subheading">Previous Task Action</v-flex>
    <v-flex xs12 md8>{{getActivityStatus(getActivity(form_case).status)}}</v-flex>
    <v-flex xs12 md4 class="subheading">Created by</v-flex>
    <v-flex xs12 md8>{{getClientUser(form.created_by).first_name}} {{getClientUser(form.created_by).last_name}}</v-flex>
    <v-flex xs12 md4 class="subheading">Created Date</v-flex>
    <v-flex xs12 md8>{{formatDate(form_case.date_created)}}</v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["form", "form_case"]
};
</script>

<style>
</style>
