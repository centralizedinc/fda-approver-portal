<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-card>
                <v-data-table
                    v-model="selected"
                    :headers="headers"
                    :items="models"
                    :pagination.sync="pagination"
                    select-all
                    item-key="case_no"
                    class="elevation-1"
                    :loading="loading">
                    <template slot="headers" slot-scope="props">
                        <tr>
                            <th>
                            <v-checkbox
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
                        <tr :active="props.selected"
                            @click="props.selected = !props.selected"
                            class="data-item">
                            <td>
                                <v-checkbox 
                                    :input-value="props.selected"
                                    primary
                                    hide-details>
                                </v-checkbox>
                            </td>
                            <td class="text-xs-center">{{ props.item.case_no }}</td>
                            <td class="text-xs-center">{{ getCaseType(props.item.case_type) }}</td>
                            <td class="text-xs-center">{{ getAppType(props.item.application_type) }}</td>
                            <td class="text-xs-center">{{ getPrimaryActivity(props.item.primary_activity).name }}</td>
                            <td class="text-xs-center">{{ formatDate(props.item.date_created) }}</td>
                        </tr>
                    </template>
                </v-data-table>
                <v-card-actions v-if="selected.length > 0">
                    <v-btn color="success" block @click="print">Print</v-btn>
                    <v-divider></v-divider>
                    <v-btn color="info" block @click="download">Download</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
  data() {
    return {
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
      models: [],
      selected: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    //   @click="$emit('view', props.item)"  ?
    init() {
      this.loading = true;
      this.models = this.$store.state.unassigned.unassigned;
      this.$store
        .dispatch("GET_UNASSIGNED")
        .then(result => {
          this.models = this.$store.state.unassigned.unassigned;
          this.loading = false;
        })
        .catch(err => {
          console.log("err init: ", err);
          this.loading = false;
        });
    },
    print() {
      this.loading = true;
      var selected_ids = [];
      this.selected.forEach(element => {
        selected_ids.push(element._id);
      });
      this.$store
        .dispatch("GET_MANY_LICENSE_BY_CASE", selected_ids)
        .then(result => {
          return this.$print(result, "LIC");
        })
        .then(result => {
          console.log("result :", JSON.stringify(result));
          // return this.$store.dispatch("ADD_BATCH", {
          //   copies: 1,
          //   applications: this.selected
          // });
        })
        .then(result => {
          console.log("result in adding batch :", JSON.stringify(result));
          this.loading = false;
        })
        .catch(err => {
          console.log("err :", err);
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
          return this.$download(result, "LIC");
        })
        .then(result => {
          console.log("result :", JSON.stringify(result));
          // return this.$store.dispatch("ADD_BATCH", {
          //   copies: 1,
          //   applications: this.selected
          // });
        })
        .then(result => {
          console.log("result in adding batch :", JSON.stringify(result));
          this.loading = false;
        })
        .catch(err => {
          console.log("err :", err);
          this.loading = false;
        });
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.models.slice();
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
