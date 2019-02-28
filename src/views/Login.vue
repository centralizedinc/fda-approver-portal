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
            <v-form v-model="valid" ref="form">
              <v-text-field 
                v-model="user.username" 
                label="Email/Username" 
                :rules="[v => !!v || 'Username is required']"
                required
                @keypress.enter="login">
              </v-text-field>
              <v-text-field
                v-model="user.password"
                label="Enter your password"
                :rules="[v => !!v || 'Password is required']"
                min="8"
                @keypress.enter="login"
                required
                :append-icon="value ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (value = !value)"
                :type="value ? 'password' : 'text'"
              ></v-text-field>
            </v-form>
          <v-divider></v-divider>
          <v-card-actions transparent>
            <v-spacer></v-spacer>
            <v-btn 
              color="primary" 
              @click="login" 
              :disabled="!valid"
              class="caption font-weight-light">
              Login
            </v-btn>
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
      valid: false,
      value: true,
      user: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      if (this.validate()) {
        console.log('JSON.stringify(this.user) :', JSON.stringify(this.user));
        this.$store.dispatch("LOGIN", this.user).then(isMatch => {
          if (isMatch) {
            console.log('test');
            this.$notify({
              message:
                "Welcome to FDA Portal. You are logged in as " +
                this.user.username,
              icon: "check_circle_outline",
              color: "success"
            });
            this.$router.push("/app");
          } else {
            console.log(
              "Invalid Credentials. Please check your Username and Password."
            );
            this.$notify({
              message:
                "Invalid Credentials. Please check your Username and Password.",
              color: "warning",
              icon: "error_outline"
            });
          }
        });
      }
    },
    validate() {
      if (!this.user.username) {
        console.log("Username is required");
        return false;
      } else if (!this.user.password) {
        console.log("Password is required");
        return false;
      }
      return true;
    }
  }
};
</script>

<style>
</style>
