<template>
  <v-layout row wrap>
    <v-layout row wrap>
      <v-flex xs12 md4 class="subheading">Task</v-flex>
      <v-flex xs12 md8>{{form.current_task}}</v-flex>
      <v-flex xs12 md4 class="subheading">Date Started</v-flex>
      <v-flex xs12 md8>{{form.date_created}}</v-flex>
      <v-flex xs12 md4 class="subheading">Date Completed</v-flex>
      <v-flex xs12 md8>{{form.date_created}}</v-flex>
      <v-flex xs12 md4 class="subheading">Days</v-flex>
      <v-flex xs12 md8>No. of days}</v-flex>
      <v-flex xs12 md4 class="subheading">Assigned User</v-flex>
      <v-flex xs12 md8>{{form.user}}</v-flex>
      <v-flex xs12 md4 class="subheading">Remarks</v-flex>
      <v-flex xs12 md8>Remarks</v-flex>
    </v-layout>
  </v-layout>
</template>

<script>
export default {
  props: ["form"]
};
</script>

<style>
</style>
