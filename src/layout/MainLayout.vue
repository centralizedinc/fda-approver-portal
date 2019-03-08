<template>
  <v-app>
    <v-toolbar dark style="background: linear-gradient(45deg, #104b2a 0%, #b5c25a 100%)"></v-toolbar>
    <notification></notification>
    <v-container fluid class="bg">
      <router-view></router-view>
    </v-container>
    <v-footer dark style="background: linear-gradient(45deg, #b5c25a 0%, #104b2a 100%)">
      <span class="caption">Copyright © 2019 FDA All rights reserved.</span>
      <v-spacer></v-spacer>
      <span class="caption">Food And Drug Administration of the Philippines</span>
    </v-footer>
  </v-app>
</template>

<script>
import notification from "@/components/Notification";
export default {
  components: { notification }
};
</script>

<style>
.bg {
  /* The image used */
  background-image: url("https://i.postimg.cc/c4jZYszr/FDASlider1-1920x675.png");

  /* Full height */
  height: 100%;

  /* Center and scale the image nicely */
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
