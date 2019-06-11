<template>
  <v-card>
    <v-card-title>
      <v-btn color="success" @click="$emit('refresh')">REFRESH 
        <v-icon dark right>refresh</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-text-field
        label="Search"
        v-model="search">
      </v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="models"
      class="elevation-1"
      :search="search"
      :loading="loading">
      <template slot="items" slot-scope="props">
        <tr @click="$emit('view', props.item)" class="data-item">
          <td>{{ props.item.case_no }}</td>
          <td>{{ getCaseType(props.item.case_type) }}</td>
          <td>{{ getAppType(props.item.application_type, props.item.case_type) }}</td>
          <td>{{ getTask(props.item.case_type, props.item.current_task).name }}</td>
          <td v-if="props.item.show">{{ displayAssignedUser(props.item.current_assigned_user) }}</td>
          <td v-else-if="props.item.current_assigned_user" @click="props.item.show=true">{{ props.item.current_assigned_user }}</td>
          <td v-else>UNASSIGNED</td>
          <td :style="`color: ${getPaymentStatusColor(props.item.payment_status)}`">{{getPaymentStatus(props.item.payment_status)}}</td>
          <td>{{ props.item.remarks }}</td>
        </tr>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    models: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      search: "",
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
        // {
        //   text: "Created By",
        //   value: "client"
        // },
        {
          text: "Current Task",
          value: "current_task"
        },
        {
          text: "Current User",
          value: "current_assigned_user"
        },
        {
          text: "Payment Status",
          value: "payment_status"
        },
        {
          text: "Remarks",
          value: "remarks"
        }
      ],
      users: []
    };
  },
  created() {
    if (this.models && this.models.length) {
      var ids = [];
      this.models.forEach(app => {
        ids.push(app.client);
      });
      this.$store
        .dispatch("GET_ADMINS_INFO", ids)
        .then(result => {
          if (result.data.success) this.users = result.data.models;
        })
        .catch(err => console.log("Error:", err));
    }
  },
  methods: {
    displayAssignedUser(user_id) {
      if (user_id) {
        var user = this.users.find(x => x._id.toString() === user_id);
        return user && user.last_name ? user.last_name : "";
      } else return "UNASSIGNED";
    }
  }
};
</script>

<style>
.data-item:hover {
  cursor: pointer;
}
</style>
