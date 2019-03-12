<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-data-table :headers="headers" :items="models" :search="search" :loading="loading">
        <template slot="items" slot-scope="props">
          <td class="text-xs-center">Batch #{{ props.item.batch_count }}</td>
          <td class="text-xs-center">{{ props.item.case_no }}</td>
          <td class="text-xs-center">{{ getAppType(props.item.case_type) }}</td>
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
      <v-dialog v-model="dialog" persistent max-width="500px" transition="dialog-transition">
        <v-card>
          <v-card-title class="title">Do you want to print again this application?</v-card-title>
          <v-card-actions>
            <v-btn class="font-weight-light" color="error" @click="cancel">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="font-weight-light" color="success" @click="rePrint">Continue</v-btn>
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
      models: [],
      selected: null,
      dialog: false,
      print_type: ["Initial", "Reprint"]
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.loading = true;
      this.models = this.$store.state.reference.prints;
      this.$store
        .dispatch("GET_PRINTS")
        .then(result => {
          console.log(
            "this.$store.state.reference.prints :",
            JSON.stringify(this.$store.state.reference.prints)
          );
          this.models = this.$store.state.reference.prints;
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
      this.selected = null;
      this.dialog = false;
    },
    rePrint() {
      this.$store
        .dispatch("RE_PRINT", this.selected)
        .then(result => {
          console.log("success reprint");
          this.init();
          this.cancel();
          var app = result;
          app.general_info.primary_activity = this.getPrimaryActivity(
            app.general_info.primary_activity
          ).name;
          app.license_expiry = this.formatDate(app.license_expiry);
          app.application_type = this.getAppType(app.application_type);
          this.$print(app, "LIC");
        })
        .catch(err => {
          console.log("getting prints err :", err);
          this.cancel();
        });
    }
  }
};
</script>

<style>
</style>
