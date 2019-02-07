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
            item.value === 'application_type' ? getAppType(props.item, item.value) : 
            item.value === 'current_task' ? getTaskName(props.item, item.value) :
            item.value === 'current_user' ? getCurrentUser(props.item, item.value) : 
            item.value.indexOf('.') > -1 ? getNestedField(props.item, item.value) : 
            item.value.indexOf('/') > -1 ? getFields(props.item, item.value) : checkValue(props.item[item.value])
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
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getAppType(item, value) {
      var type = item[value];
      if (!type) {
        return "N/A";
      } else if (type.toUpperCase() === "V") {
        return "Variation";
      } else if (type.toUpperCase() === "R") {
        return "Renewal";
      } else if (type.toUpperCase() === "I") {
        return "Initial";
      } else {
        if (value.indexOf(".") > -1) {
          return this.getNestedField(item, value);
        } else {
          return item[value];
        }
      }
    },
    getTaskName(item, value) {
      var task_name = null;
      if (item && item.current_task && item.tasks) {
        for (let i = 0; i < item.tasks.length; i++) {
          if (item.current_task === item.tasks[i].task_id) {
            task_name = item.tasks[i].task_name;
            break;
          }
        }
      }
      if (!task_name) {
        if (value.indexOf(".") > -1) {
          return this.getNestedField(item, value);
        } else {
          return item[value];
        }
      } else {
        return task_name;
      }
    },
    getCurrentUser(item, value) {
      var user = null;
      if (item && item.current_task && item.tasks) {
        for (let i = 0; i < item.tasks.length; i++) {
          if (item.current_task === item.tasks[i].task_id) {
            if (
              item.tasks[i].assigned_user &&
              item.tasks[i].assigned_user.name &&
              item.tasks[i].assigned_user.name !== ""
            ) {
              user = item.tasks[i].assigned_user.name;
            } else {
              user = "Unassign";
            }
            break;
          }
        }
      }

      if (!user) {
        if (value.indexOf(".") > -1) {
          return this.getNestedField(item, value);
        } else {
          return item[value];
        }
      } else {
        return user;
      }
    },
    getNestedField(item, field) {
      var fields = field.split(".");
      var result = item[fields[0]];
      for (let i = 1; i < fields.length; i++) {
        if (!result) {
          return "N/A";
        }
        result = result[fields[i]];
      }
      return result;
    },
    getFields(item, field) {
      var fields = field.split("/");
      for (let i = 0; i < fields.length; i++) {
        if (item[fields[i]]) {
          return item[fields[i]];
        }
      }
      return "N/A";
    },
    checkValue(field) {
      if (!field) {
        return "N/A";
      }
      return field;
    }
  }
};
</script>

<style>
.data-item:hover {
  cursor: pointer;
}
</style>
