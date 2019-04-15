<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12 md3></v-flex>
      <v-flex xs12 md6>
        <v-card>
          <v-card-title class="headline title--header">
            Change Password Request
          </v-card-title>
          <v-card-text>
            <v-layout row wrap>
              <span class="red--text" ml-5>*</span><i>Change Password Request <b>link</b> will be send to your <b>registered email</b>.</i>
              <v-flex xs12 class="subheading">
                Username: {{account.username}}
              </v-flex>
              <v-flex xs12 class="subheading">
                Email: {{maskEmail(account.email)}}
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  outline
                  @keypress.enter="dialog=true"
                  :append-icon="show_password ? 'visibility' : 'visibility_off'"
                  :rules="[rules.required]"
                  :type="show_password ? 'text' : 'password'"
                  name="input-10-2"
                  label="Enter your Old Password"
                  @click:append="show_password = !show_password"
                  v-model="old_password"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <!-- <v-spacer></v-spacer> -->
            <v-btn
              block
              color="success"
              class="font-weight-light"
              @click="dialog=true"
            >Submit</v-btn>
            <!-- <v-spacer></v-spacer> -->
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 md3></v-flex>
    </v-layout>
    <v-dialog v-model="dialog" width="270">
      <v-card>
        <!-- <v-card-title
          primary-title
          class="headline title--header">
          Confirmation
        </v-card-title> -->
        <v-card-text class="title">Do you want to proceed?</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="error" flat @click="dialog=false">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="success" :loading="loading" :disabled="loading" @click="submit">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      account: {},
      old_password: "",
      show_password: "",
      dialog: false,
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.account = this.$store.state.user_session.account;
    },
    isEmpty(str) {
      return !str || str === null || str === "";
    },
    maskEmail(email) {
      var masked_email = "";
      if (email && email.indexOf("@") !== -1) {
        var end_index = email.indexOf("@");
        masked_email = email.substring(0, 1);
        var i = email.substring(1, end_index - 1).length;
        while (i > 0) {
          masked_email += "*";
          i--;
        }
        masked_email += email.substring(end_index - 1, email.length);
      }
      return masked_email;
    },
    submit() {
      this.loading = true;
      if (!this.isEmpty(this.old_password)) {
        this.account.password = this.old_password;
        this.$store
          .dispatch("REQUEST_RESET_PASSWORD", this.old_password)
          .then(result => {
            this.loading = false;
            this.dialog = false;
            if (result.data.success) {
              this.$notify({
                message: "Reset password request has been sent to your email.",
                color: "success",
                icon: "check_circle"
              });
              this.$store.dispatch("LOGOUT");
              this.$router.push("/");
            } else {
              this.$notifyError(result.data.errors);
            }
          })
          .catch(err => {
            this.dialog = false;
            this.loading = false;
            console.log(err);
            this.$notifyError(err);
          });
        // } else if (this.new_password !== this.confirm_password) {
        //   this.loading = false;
        //   this.$notify({
        //     message: "New password does not match the confirm password.",
        //     icon: "error_outline",
        //     color: "error"
        //   });
      } else {
        this.loading = false;
        this.dialog = false;
        this.$notify({
          message: "Please enter your old password.",
          icon: "error_outline",
          color: "error"
        });
      }
    }
  }
};
</script>

<style>
.title--header {
  background: linear-gradient(45deg, #104b2a 0%, #b5c25a 100%);
}
</style>