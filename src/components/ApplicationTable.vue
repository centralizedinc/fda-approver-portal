<template>
  <v-data-table
    :headers="headers"
    :items="models"
    class="elevation-1"
    :loading="loading">
    <template slot="items" slot-scope="props">
      <tr @click="$emit('view', props.item)" class="data-item">
        <template v-for="(item, index) in headers">
          <td v-if="item.value === 'action'" :class="item.class" :key="index">
            <v-btn color="success" icon flat @click="$emit('view', props.item)">
              <v-icon>search</v-icon>
            </v-btn>
          </td>
          <td v-else :class="item.class" :key="index">{{
            item.value === 'case_type' ? getCaseType(props.item, item.value) : 
            item.value === 'application_type' ? getAppType(props.item, item.value) : 
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
      console.log(type);
      if (type === 0) {
        return "Initial";
      } else if (type === 1) {
        return "Variation";
      } else if (type === 2) {
        return "Renewal";
      } else {
        if (value.indexOf(".") > -1) {
          return this.getNestedField(item, value);
        } else {
          return item[value];
        }
      }
    },
    getCaseType(item, value) {
      switch (item[value]) {
        case 0:
          return "License";
        case 1:
          return "Certificate";
        case 2:
          return "Registration";
      }
      return "N/A";
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
