<template>
    <v-data-table
      :headers="headers"
      :items="models"
      class="elevation-1"
      :loading="loading">
      <template slot="items" slot-scope="props">
        <tr @click="$emit('view', props.item)" class="data-item">
          <template v-for="(item, index) in headers">
            <td :class="item.class" :key="index">{{
              item.value === 'application_type' ? getAppType(props.item[item.value]) : 
              item.value === 'current_task' ? getTaskName(props.item) :
              item.value === 'current_user' ? getCurrentUser(props.item) : 
              item.value.indexOf('.') > -1 ? getNestedField(props.item, item.value) : props.item[item.value]
            }}</td>
          </template>
        </tr>
      </template>
    </v-data-table>
</template>

<script>
export default {
  props: {
    models: {
      type: Array,
      default: () => []
    },
    headers: {
      type: Array,
      default: () => [
        {
          text: "Case No",
          value: "case_no"
        },
        {
          text: "Type",
          value: "application_type"
        },
        {
          text: "Product Type",
          value: "general_info.product_type"
        },
        {
          text: "Current Task",
          value: "current_task"
        },
        {
          text: "Current User",
          value: "current_user"
        },
        {
          text: "Remarks",
          value: "remarks"
        }
      ]
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getAppType(type) {
      if (type.toUpperCase() === "V") {
        return "Variation";
      } else if (type.toUpperCase() === "R") {
        return "Renewal";
      } else {
        return "Initial";
      }
    },
    getTaskName(app) {
      var task_name = "";
      if (app) {
        for (let i = 0; i < app.tasks.length; i++) {
          if (app.current_task === app.tasks[i].task_id) {
            task_name = app.tasks[i].task_name;
            break;
          }
        }
      }
      return task_name;
    },
    getCurrentUser(app) {
      var user = "Unassign";
      if (app) {
        for (let i = 0; i < app.tasks.length; i++) {
          if (app.current_task === app.tasks[i].task_id) {
            if (
              app.tasks[i].assigned_user &&
              app.tasks[i].assigned_user.name &&
              app.tasks[i].assigned_user.name !== ""
            ) {
              user = app.tasks[i].assigned_user.name;
            }
            break;
          }
        }
      }
      return user;
    },
    getNestedField(item, field) {
      var fields = field.split(".");
      var result = item[fields[0]];
      console.log(JSON.stringify(result));
      for (let i = 1; i < fields.length; i++) {
        if (!result) {
          return "";
        }
        result = result[fields[i]];
      }
      return result;
    }
  }
};
</script>

<style>
.data-item:hover {
  cursor: pointer;
}
</style>
