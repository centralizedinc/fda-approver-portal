<template>
  <!-- <v-layout row wrap>
  <v-flex xs12 sm12 md6 lg3>-->
  <v-card dark :style="style">
    <v-card-title primary-title>
      <v-avatar size="50" color="rgba(0, 0, 0, 0.18)">
        <v-icon>{{icon}}</v-icon>
      </v-avatar>
      <v-spacer></v-spacer>
      <h3 class="title font-weight-light">{{title}}</h3>
    </v-card-title>
    <v-card-text>
      <v-divider></v-divider>
      <v-layout row wrap v-for="(item, index) in details" :key="index">
        <v-flex xs6>
          <h4 class="subheading">{{item.description}}</h4>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs6 style="text-align: right">
          <span class="subheading">{{item.count}}</span>
        </v-flex>
      </v-layout>
    </v-card-text>
  </v-card>
  <!-- </v-flex>
  </v-layout>-->
</template>

<script>
export default {
  props: ["icon", "title", "details", "color"],
  computed: {
    style() {
      if (this.color === "fdaBlueGreen") {
        return "background:linear-gradient(360deg, #297373 0%, #5FA391 100%); box-shadow: 0 6px 20px rgba(101, 198, 187, 1); ";
      } else if (this.color === "fdaOrange") {
        return "background: linear-gradient(360deg, #F1961D 0%, #F58555  100%); box-shadow: 0 6px 20px 0 rgba(228, 120, 51, 1) ";
      } else if (this.color === "fdaGold") {
        return "background: linear-gradient(360deg, #95A523 0%, #B5C25A  100%); box-shadow: 0 6px 20px 0 rgba(200, 247, 197, 1)";
      } else {
        return "background:linear-gradient(360deg, #0F901A 0%, #97C76E 100%); box-shadow:0 6px 20px 0 rgba(38, 198, 218, 0.5)";
      }
    }
  }
};
</script>

<style>
</style>
