<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card>
        <v-card-title>
          <v-btn color="success" @click="init(true)">REFRESH 
            <v-icon dark right>refresh</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-text-field
            label="Search"
            v-model="search">
          </v-text-field>
        </v-card-title>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="models"
          :pagination.sync="pagination"
          select-all
          :search="search"
          item-key="case_no"
          class="elevation-1"
          :loading="loading">
          <template slot="headers" slot-scope="props">
            <tr>
              <th>
                <v-checkbox
                  color="primary"
                  :input-value="props.all"
                  :indeterminate="props.indeterminate"
                  primary
                  hide-details
                  @click.stop="toggleAll"
                ></v-checkbox>
              </th>
              <th
                v-for="header in props.headers"
                :key="header.text"
                :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                @click="changeSort(header.value)"
              >
                <v-icon small>arrow_upward</v-icon>
                {{ header.text }}
              </th>
            </tr>
          </template>
          <template slot="items" slot-scope="props">
            <tr
              :active="props.selected"
              @click="props.selected = !props.selected"
              class="data-item"
            >
              <td>
                <v-checkbox color="primary" :input-value="props.selected" primary hide-details></v-checkbox>
              </td>
              <td class="text-xs-center">{{ props.item.case_no }}</td>
              <td class="text-xs-center">{{ getCaseType(props.item.case_type) }}</td>
              <td class="text-xs-center">{{ getAppType(props.item.application_type, props.item.case_type) }}</td>
              <td class="text-xs-center">{{ getAppStatus(props.item.status) }}</td>
              <td class="text-xs-center">{{ getPrimaryActivity(props.item.primary_activity).name }}</td>
              <td class="text-xs-center">{{ formatDate(props.item.date_created) }}</td>
            </tr>
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning">
            Your search for "{{ search }}" found no results.
          </v-alert>
        </v-data-table>
        <v-card-actions v-if="selected.length > 0">
          <v-btn class="font-weight-light" color="success" block @click="dialog=true" :loading="loading">Print</v-btn>
        </v-card-actions>
      </v-card>
      <v-dialog
          v-model="dialog"
          max-width="300px"
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
                  Do you want to print the selected case(s)?
              </v-card-text>
              <v-card-actions>
                <v-btn class="font-weight-light" color="secondary" outline @click="dialog = false" :disabled="loading">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn class="font-weight-light" color="success" @click="print" :loading="loading">Continue</v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      search: "",
      loading: false,
      pagination: {
        sortBy: "date_created"
      },
      headers: [
        {
          text: "Case No",
          value: "case_no"
        },
        {
          text: "Application",
          value: "case_type"
        },
        {
          text: "Type",
          value: "application_type"
        },
        {
          text: "Status",
          value: "status"
        },
        {
          text: "Primary Activity",
          value: "primary_activity"
        },
        {
          text: "Date Created",
          value: "date_created"
        }
      ],
      selected: [],
      users: []
    };
  },
  created() {
    // Print temporarily for License only
    this.init();
  },
  computed: {
    models() {
      return this.$store.state.unassigned.unassigned;
    }
  },
  methods: {
    //   @click="$emit('view', props.item)"  ?
    init(refresh) {
      this.loading = true;
      this.$store
        .dispatch("GET_UNASSIGNED", refresh)
        .then(result => {
          this.loading = false;
          // this.$store.dispatch("GET_PRINTS", refresh);
        })
        .catch(err => {
          console.log("err init: ", err);
          this.loading = false;
        });
    },
    print() {
      this.loading = true;
      var selected_licenses = [];
      var selected_certificates = [];
      var clients = [];
      this.selected.forEach(_case => {
        clients.push(_case.client);
      });
      this.$store
        .dispatch("GET_ACCOUNTS_INFO", clients)
        .then(result => {
          if (result.data.success) this.users = result.data.model;
          return this.$store.dispatch("ADD_BATCH", this.selected);
        })
        .then(result => {
          this.selected.forEach(element => {
            if (element.case_type === 0)
              selected_licenses.push(element.case_no);
            else if (element.case_type === 1)
              selected_certificates.push(element.case_no);
          });
          if (selected_licenses.length)
            return this.$store.dispatch(
              "GET_MANY_LICENSE_BY_CASE",
              selected_licenses
            );
          else if (selected_certificates.length)
            return this.$store.dispatch(
              "GET_MANY_CERTIFICATE_BY_CASE",
              selected_certificates
            );
          else {
            this.dialog = false;
            this.loading = false;
            this.init(true);
          }
        })
        .then(results => {
          if (selected_licenses.length) {
            this.processApplication(results, 0, 0);
            return this.$store.dispatch(
              "GET_MANY_CERTIFICATE_BY_CASE",
              selected_certificates
            );
          } else if (selected_certificates.length) {
            this.processApplication(results, 1, 0);
            this.dialog = false;
            this.loading = false;
            this.init(true);
          } else {
            this.dialog = false;
            this.loading = false;
            this.init(true);
          }
        })
        .then(results => {
          this.processApplication(results, 1, 0);
          this.dialog = false;
          this.loading = false;
          this.init(true);
        })
        .catch(err => {
          console.log("err :", err);
          this.dialog = false;
          this.loading = false;
          this.init(true);
        });
    },
    processApprovedLicense(results, type) {
      if (!results) return null;
      var applications = [];
      // this.dialog = false;
      results.forEach(data => {
        var app = data.license;
        app.general_info.primary_activity = this.getPrimaryActivity(
          app.general_info.primary_activity
        ).name;
        app.license_expiry = this.formatDate(app.license_expiry);
        app.application_type = this.getAppType(app.application_type, 0);
        applications.push(app);
        // set app type by license by default
        //
      });
      if (type === 0) return this.$print(applications, "LIC");
      else if (type === 1) return this.$download(applications, "LIC");
      else return null;
      // this.init(true);
    },
    processDeniedLicense(results, type) {
      if (!results) return null;
      var applications = [];
      results.forEach(data => {
        var app = data.license;
        var address = "";
        app.address_list.forEach(elem => {
          if (elem.type === 0) {
            address = elem.address;
          }
        });

        applications.push({
          date_created: this.formatDate(data.date),
          name: `${this.getClientUser(data.case_details.client).name.first} ${
            this.getClientUser(data.case_details.client).name.last
          }`,
          establishment_name: app.estab_details.establishment_name,
          establishment_address: address,
          application_type:
            this.getAppType(app.application_type, data.case_details.case_type) +
            " Application",
          case_no: data.case_details.case_no,
          reasons: data.reason
        });
      });
      if (type === 0) return this.$print(applications, "DENIED");
      else if (type === 1) return this.$download(applications, "DENIED");
      else return null;
    },
    processApplication(applications, case_type, type) {
      var approved_application = [];
      var denied_application = [];
      var case_app = ["license", "certificate"][case_type];
      applications.forEach(application => {
        console.log("application :", application);
        if (application[case_app].status === 1)
          approved_application.push(application);
        else if (application[case_app].status === 3)
          denied_application.push(application);
      });
      console.log("approved_application.length :", approved_application.length);
      console.log("denied_application.length :", denied_application.length);
      if (case_type === 0 && approved_application.length)
        this.processApprovedLicense(approved_application, type);
      if (case_type === 0 && denied_application.length)
        this.processDeniedLicense(denied_application, type);
      if (case_type === 1 && approved_application.length)
        this.processApprovedCertificate(approved_application, type);
      if (case_type === 1 && denied_application.length)
        this.processDeniedCertificate(denied_application, type);
      // var approved_action =
      //   case_type === 0
      //     ? this.processApprovedLicense(approved_application, type)
      //     : case_type === 1
      //       ? this.processApprovedCertificate(approved_application, type)
      //       : null;
      // var denied_action =
      //   case_type === 0
      //     ? this.processDeniedLicense(denied_application, type)
      //     : case_type === 1
      //       ? this.processDeniedCertificate(denied_application, type)
      //       : null;
      // console.log("approved_action :", approved_action);
      // console.log("denied_action :", denied_action);
      // if (approved_action) {
      //   approved_action
      //     .then(result => {
      //       if (denied_action) return denied_action;
      //       else resolve();
      //     })
      //     .then(result => {
      //       console.log('last action');
      //       resolve();
      //     })
      //     .catch(err => {
      //       reject(err);
      //     });
      // } else if (denied_action) {
      //   denied_action
      //     .then(result => {
      //       resolve();
      //     })
      //     .catch(err => {
      //       reject();
      //     });
      // } else resolve();
    },
    processApprovedCertificate(results, type) {
      if (!results) return null;
      var applications = [];
      results.forEach(data => {
        var app = data.certificate;
        applications.push({
          certificate_no: app.certificate_no,
          product_name: app.food_product.product_name,
          active_ingredients: "",
          intended_use: "",
          packaging: app.shelf.packaging_material,
          manufacturer: app.establishment_info.manufacturer_name,
          repacker_source: "",
          client_name: "",
          client_address: "",
          validity: app.date_validity,
          date_approved: app.date_approved
        });
      });
      if (type === 0) return this.$print(applications, "CERT");
      else if (type === 1) return this.$download(applications, "CERT");
      else return null;
    },
    processDeniedCertificate(results, type) {
      if (!results) return null;
      var applications = [];
      results.forEach(data => {
        var app = data.certificate;
        applications.push({
          date_created: this.formatDate(data.date),
          name: `${this.getClientUser(data.case_details.client).name.first} ${
            this.getClientUser(data.case_details.client).name.last
          }`,
          establishment_name: "",
          establishment_address: "",
          application_type:
            this.getAppType(
              app.general_info.application_type,
              data.case_details.case_type
            ) + " Application",
          case_no: data.case_details.case_no,
          reasons: data.reason
        });
      });
      console.log("applications :", applications);
      if (type === 0) return this.$print(applications, "DENIED");
      else if (type === 1) return this.$download(applications, "DENIED");
      else return null;
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.models;
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    },
    getClientUser(user_id) {
      var account =
        this.users && this.users.length
          ? this.users.find(x => x._id.toString() === user_id)
          : null;
      return account ? account : {};
    }
  }
};
</script>

<style>
.data-item:hover {
  cursor: pointer;
}
</style>
