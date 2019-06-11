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
        <v-data-table :headers="headers" :items="models" :search="search" :loading="loading">
          <template slot="items" slot-scope="props">
            <td class="text-xs-center">Batch #{{ props.item.batch_count }}</td>
            <td class="text-xs-center">{{ props.item.case_no }}</td>
            <td class="text-xs-center">{{ getCaseType(props.item.case_type) }}</td>
            <td class="text-xs-center">{{ print_type[props.item.type] }}</td>
            <td class="text-xs-center">{{ props.item.doc_no }}</td>
            <td class="text-xs-center">{{ props.item.created_by }}</td>
            <td class="text-xs-center">{{ formatDate(props.item.date_created) }}</td>
            <td>
              <v-tooltip bottom>
                <v-btn slot="activator" flat icon @click="confirmation(props.item)">
                  <v-icon color="info">print</v-icon>
                </v-btn>
                <span>Print Again</span>
              </v-tooltip>
            </td>
          </template>
          <v-alert
            slot="no-results"
            :value="true"
            color="error"
            icon="warning"
          >Your search for "{{ search }}" found no results.</v-alert>
        </v-data-table>
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
                  Do you want to print again this application with case no.: <b>{{selected.case_no}}</b> ?
              </v-card-text>
              <v-card-actions>
                <v-btn class="font-weight-light" color="secondary" outline @click="cancel" :disabled="loading">Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn class="font-weight-light" color="success" @click="rePrint" :loading="loading">Continue</v-btn>
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
      loading: false,
      search: "",
      headers: [
        {
          text: "Batch",
          value: "batch_count"
        },
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
          value: "type"
        },
        {
          text: "Document No",
          value: "doc_no"
        },
        {
          text: "Created By",
          value: "created_by"
        },
        {
          text: "Date Created",
          value: "date_created"
        },
        {
          text: "Action",
          value: "action"
        }
      ],
      selected: {},
      dialog: false,
      print_type: ["Initial", "Reprint"],
      users: []
    };
  },
  created() {
    this.init();
  },
  computed: {
    models() {
      return this.$store.state.reference.prints;
    }
  },
  methods: {
    init(refresh) {
      this.loading = true;
      this.$store
        .dispatch("GET_PRINTS", refresh)
        .then(result => {
          this.loading = false;
        })
        .catch(err => {
          console.log("getting prints err :", err);
          this.loading = false;
        });
    },
    confirmation(item) {
      this.selected = item;
      this.dialog = true;
    },
    cancel() {
      this.selected = {};
      this.dialog = false;
      this.loading = false;
    },
    rePrint() {
      this.loading = true;
      this.$store
        .dispatch("GET_ACCOUNTS_INFO", this.selected.client)
        .then(result => {
          if (result.data.success) this.users = result.data.model;
          return this.$store.dispatch("RE_PRINT", this.selected);
        })
        .then(result => {
          console.log("this.selected :", this.selected);
          console.log("result :", result);
          var case_app = ["license", "certificate"][this.selected.case_type];
          if (this.selected.case_type === 0 && result[0][case_app].status === 1)
            this.processApprovedLicense(result[0]);
          else if (
            this.selected.case_type === 0 &&
            result[0][case_app].status === 3
          )
            this.processDeniedLicense(result[0]);
          else if (
            this.selected.case_type === 1 &&
            result[0][case_app].status === 1
          )
            this.processApprovedCertificate(result[0]);
          else if (
            this.selected.case_type === 1 &&
            result[0][case_app].status === 3
          )
            this.processDeniedCertificate(result[0]);
          this.init(true);
          this.cancel();
        })
        .catch(err => {
          console.log("getting prints err :", err);
          this.cancel();
        });
    },
    processApprovedLicense(data) {
      var app = data.license;
      app.general_info.primary_activity = this.getPrimaryActivity(
        app.general_info.primary_activity
      ).name;
      app.license_expiry = this.formatDate(app.license_expiry);
      app.application_type = this.getAppType(app.application_type, 0);

      this.$print(app, "LIC");
    },
    processDeniedLicense(data) {
      var address = "";
      var app = data.license;
      if (app.address_list)
        app.address_list.forEach(elem => {
          if (elem.type === 0) {
            address = elem.address;
          }
        });

      var details = {
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
      };
      this.$print(details, "DENIED");
    },
    processApprovedCertificate(data) {
      var app = data.certificate;

      var certificate = {
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
      };
      this.$print(certificate, "CERT");
    },
    processDeniedCertificate(data) {
      var app = data.certificate;
      var details = {
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
      };

      this.$print(details, "DENIED");
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
</style>
