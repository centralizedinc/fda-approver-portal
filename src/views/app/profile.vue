<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card color="rgb(230, 230, 230, 0.2)">
          <v-card-text>
            <v-layout row align-center justify-center mt-5>
              <v-flex xs8>
                <v-text-field
                  label="First Name"
                  v-model="admin.first_name"
                  required
                  :rules="[() => !!admin.first_name || 'This field is required']"
                ></v-text-field>
                <v-text-field
                  label="Last Name"
                  v-model="admin.last_name"
                  required
                  :rules="[() => !!admin.last_name || 'This field is required']"
                ></v-text-field>
                <v-text-field
                  label="Username"
                  v-model="admin.username"
                  required
                  :rules="[() => !!admin.username || 'This field is required']"
                ></v-text-field>
                <v-text-field
                  label="Email Address"
                  v-model="admin.email"
                  required
                  :rules="[() => !!admin.email || 'This field is required']"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider class="mt-5"></v-divider>
          <v-card-actions>
            <v-btn class="font-weight-light" @click="close">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="font-weight-light" color="success" @click="submit">Submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  data: () => ({
    admin: {},
    first_name: null,
    last_name: null,
    username: null,
    email: null
  }),

  created() {
    this.init();
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    init() {
      this.admin = this.$store.state.user_session.account.user;
      // console.log("##########STORE" + this.$store.state.user_session.user._id);
      // this.$store
      //   .dispatch("GET_PROFILE", this.$store.state.user_session.account.user._id)
      //   .then(result => {
      //     this.admin = result;
      //     console.log("LOGS GET PROFILE" + JSON.stringify(this.admin));
      //   });
    },
    close() {
      this.new_admin = {};
    },
    submit() {
      this.new_admin = this.admin;
      console.log(
        "###########edited:ADMIN PROFILE: " + JSON.stringify(this.new_admin)
      );
      this.$store
        .dispatch("EDIT_PROFILE", this.new_admin)
        .then(result => {
          console.log("edited:profile: " + JSON.stringify(result));
          this.$notify({
            message: "Your Profile is successfuly updated",
            color: "success",
            icon: "check_box"
          });
          this.$router.push("/app");
        })
        .catch(err => {
          console.log(err);
          this.$notifyError(err);
        });
    }
  }
};
</script>
<style>
</style>
