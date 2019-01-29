<template>
  <v-layout align-center justify-center>
    <v-flex xs4 pa-2 mt-4>
      <v-card pa-5>
        <v-toolbar
          color="primary"
          style="background: linear-gradient(45deg, #b5c25a 0%, #104b2a 100%); box-shadow: 0 6px 20px 0 rgba(77, 182, 172, 0.5)"
        >
          <span class="font-weight-light title">Login</span>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text transparent>
          <v-text-field name="name" label="Email/Username" @keypress.enter="login" id="id"></v-text-field>
          <v-text-field
            name="name"
            label="Enter your password"
            min="8"
            @keypress.enter="login"
            :append-icon="value ? 'visibility' : 'visibility_off'"
            :append-icon-cb="() => (value = !value)"
            :type="value ? 'password' : 'text'"
          ></v-text-field>
          <v-divider></v-divider>
          <v-card-actions transparent>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="login" class="caption font-weight-light">Login</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      value: true
    };
  },
  methods: {
    login() {
      // :rules="[() => ('The email and password you entered don\'t match')]"
      this.$store.commit("API_INSTANCE", "my_sample_api_token");
      this.$router.push("/app");
    }
  }
};
</script>

<style>
</style>
