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
          <!-- <v-divider></v-divider>
          <v-btn color="info" block @click="download">Download</v-btn>-->
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
          text: "Primary Activity",
          value: "primary_activity"
        },
        {
          text: "Date Created",
          value: "date_created"
        }
      ],
      selected: []
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
          this.$store.dispatch("GET_PRINTS", refresh);
        })
        .catch(err => {
          console.log("err init: ", err);
          this.loading = false;
        });
    },
    print() {
      this.loading = true;
      this.$store
        .dispatch("ADD_BATCH", this.selected)
        .then(result => {
          var selected_ids = [];
          this.selected.forEach(element => {
            selected_ids.push(element._id);
          });
          return this.$store.dispatch("GET_MANY_LICENSE_BY_CASE", selected_ids);
        })
        // this.$store
        //   .dispatch("GET_MANY_LICENSE_BY_CASE", selected_ids)
        .then(result => {
          var applications = [];
          this.dialog = false;
          result.forEach(app => {
            app.general_info.primary_activity = this.getPrimaryActivity(
              app.general_info.primary_activity
            ).name;
            app.license_expiry = this.formatDate(app.license_expiry);
            app.application_type = this.getAppType(app.application_type, 0);
            applications.push(app);
            // set app type by license by default
            //
          });
          this.$print(applications, "LIC");
          this.init(true);
        })
        .catch(err => {
          console.log("err :", err);
          this.dialog = false;
          this.loading = false;
        });
    },
    download() {
      this.loading = true;
      var selected_ids = [];
      this.selected.forEach(element => {
        selected_ids.push(element._id);
      });
      this.$store
        .dispatch("GET_MANY_LICENSE_BY_CASE", selected_ids)
        .then(result => {
          var applications = [];
          result.forEach(app => {
            app.general_info.primary_activity = this.getPrimaryActivity(
              app.general_info.primary_activity
            ).name;
            app.license_expiry = this.formatDate(app.license_expiry);
            app.application_type = this.getAppType(app.application_type);
            applications.push(app);
          });
          return this.$download(result, "LIC");
        })
        .then(result => {
          this.loading = false;
        })
        .catch(err => {
          console.log("err :", err);
          this.loading = false;
        });
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
    }
  }
};
</script>

<style>
.data-item:hover {
  cursor: pointer;
}
</style>
