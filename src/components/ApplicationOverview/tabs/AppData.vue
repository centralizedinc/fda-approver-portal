<template>
  <v-layout row wrap>
    <v-flex
      xs12
      class="headline mt-2 mb-4 pt-3 font-weight-thin"
      style="padding: 2px"
    >Application Information</v-flex>
    <v-flex xs12 md4 class="subheading">Product Type</v-flex>
    <v-flex xs12 md8>{{getProduct(form.general_info.product_type)}}</v-flex>
    <v-flex xs12 md4 class="subheading">Primary Activity</v-flex>
    <v-flex xs12 md8>{{getPrimary(form.general_info.primary_activity)}}</v-flex>
    <v-flex xs12 md4 class="subheading">Declared Capital</v-flex>
    <v-flex xs12 md8>{{getDeclared(form.general_info.declared_capital)}}</v-flex>
    <!-- Establishment Info -->
    <v-flex
      xs12
      class="headline mt-2 mb-4 pt-3 font-weight-thin"
      style="padding: 2px"
    >Establishment Information</v-flex>
    <v-flex xs12 md4 class="subheading">Name of Establishment</v-flex>
    <v-flex xs12 md8>{{form.estab_details.establishment_name}}</v-flex>
    <v-flex xs12 md4 class="subheading">Establishment Owner</v-flex>
    <v-flex xs12 md8>{{form.estab_details.establishment_owner}}</v-flex>
    <v-flex xs12 md4 class="subheading">TIN</v-flex>
    <v-flex xs12 md8>{{form.estab_details.tin}}</v-flex>
    <v-flex xs12 md4 class="subheading">Contact Information</v-flex>
    <v-flex xs12 md8>Email: {{form.estab_details.email}}</v-flex>
    <v-flex xs12 md4></v-flex>
    <v-flex xs12 md8>Landline: {{form.estab_details.landline}}</v-flex>
    <v-flex xs12 md4></v-flex>
    <v-flex xs12 md8>Fax: {{form.estab_details.fax}}</v-flex>
    <v-flex xs12 md4></v-flex>
    <v-flex xs12 md8>Mobile: {{form.estab_details.mobile}}</v-flex>
    <!-- Product Line -->
    <v-flex xs12 class="headline mt-2 mb-4 pt-3 font-weight-thin" style="padding: 2px">Product Line</v-flex>
    <v-container
      grid-list-md
      text-xs-left
      v-for="(item, index) in form.estab_details.products"
      :key="index"
    >
      <v-layout row wrap>
        <v-flex xs12 md8 class="subheading">{{getProductLine(item.prod_line)}}</v-flex>
        <v-flex xs12 md4>{{item.remarks}}</v-flex>
      </v-layout>
    </v-container>
    <!-- Office Address -->
    <v-flex
      xs12
      class="headline mt-2 mb-4 pt-3 font-weight-thin"
      style="padding: 2px"
    >Office Address</v-flex>
    <v-container grid-list-md text-xs-left>
      <v-layout row wrap>
        <v-flex xs12 md4 class="subheading">Mailing Address</v-flex>
        <v-flex
          xs12
          md8
        >{{form.addresses.office.address + " " + form.addresses.office.region + " " + form.addresses.office.province + " " + form.addresses.office.city + " " + form.addresses.office.zipcode}}</v-flex>
      </v-layout>
    </v-container>
    <!-- Authorized Officer -->
    <v-flex
      xs12
      class="headline mt-2 mb-4 pt-3 font-weight-thin"
      style="padding: 2px"
    >Authorized Officer</v-flex>
    <v-container grid-list-md text-xs-left>
      <v-layout row wrap>
        <v-flex xs12 md4 class="subheading">Name</v-flex>
        <v-flex
          xs12
          md8
        >{{form.auth_officer.lastname + ", " + form.auth_officer.firstname + " " + form.auth_officer.middlename }}</v-flex>
        <v-flex xs12 md4 class="subheading">Designation</v-flex>
        <v-flex xs12 md8>{{form.auth_officer.designation}}</v-flex>
        <v-flex xs12 md4 class="subheading">TIN</v-flex>
        <v-flex xs12 md8>{{form.auth_officer.tin}}</v-flex>
        <v-flex xs12 md4 class="subheading">Birthday</v-flex>
        <v-flex xs12 md8>{{form.auth_officer.birthday}}</v-flex>
        <v-flex xs12 md4 class="subheading">Government ID</v-flex>
        <v-flex xs12 md8>{{form.auth_officer.id_type + " - " + form.auth_officer.id_no}}</v-flex>
        <v-flex xs12 md4 class="subheading">Address</v-flex>
        <v-flex
          xs12
          md8
        >{{form.auth_officer.mail_add.address + " " + form.auth_officer.mail_add.region + " " + form.auth_officer.mail_add.province + " " + form.auth_officer.mail_add.city + " " + form.auth_officer.mail_add.zipcode}}</v-flex>
      </v-layout>
    </v-container>
    <!-- Qualified Personnel -->
    <v-flex
      xs12
      class="headline mt-2 mb-4 pt-3 font-weight-thin"
      style="padding: 2px"
    >Qualified Personnel</v-flex>
    <v-container grid-list-md text-xs-left>
      <v-layout row wrap>
        <v-flex xs12>
          <v-data-table :headers="headers" :items="form.qualified_personnel" class="elevation-1">
            <template slot="items" slot-scope="props">
              <td>{{props.item.firstname + " " + props.item.lastname }}</td>
              <td>{{props.item.designation}}</td>
              <td>{{props.item.birthday}}</td>
              <td>{{props.item.tin}}</td>
              <td>{{props.item.id_type + "-" + props.item.id_no}}</td>
              <td></td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  props: ["form"],
  data: () => ({
    headers: [
      {
        text: "Name",
        value: "",
        sortable: false
      },
      {
        text: "Designation",
        value: "",
        sortable: false
      },
      {
        text: "Birthdate",
        value: "",
        sortable: false
      },
      {
        text: "TIN",
        value: "",
        sortable: false
      },
      {
        text: "Government ID",
        value: "",
        sortable: false
      }
    ]
  })
};
</script>

<style>
</style>
