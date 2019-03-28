<template>
  <div>
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 offset-sm1 pa-5>
        <v-card class="mt-4">
          <v-layout align-center justify-center>
            <v-flex xs10>
              <input
                name="avatar"
                type="file"
                style="display: none"
                ref="image"
                @change="onFilePicked"
                accept="image/*"
              >
              <div v-if="admin.avatar && admin.avatar.location">
                <a @click="$refs.image.click()">
                  <v-avatar size="120" style="top: -50px ;left:40%; z-index:1" color="teal">
                    <v-img :src="avatar()" alt="alt"></v-img>
                  </v-avatar>
                </a>
              </div>
              <div v-else>
                <a @click="$refs.image.click()">
                  <v-avatar size="120" color="teal" style="top: -50px ;left:40%; z-index:1">
                    <span
                      class="headline white--text "
                    >{{admin.first_name.substring(0,1) + admin.last_name.substring(0,1)}}</span>
                  </v-avatar>
                </a>
              </div>
              <v-card-text>
                <v-form ref="form" v-model="valid">
                  <v-text-field
                    outline
                    label="First Name"
                    v-model="admin.first_name"
                    required
                    :rules="[() => !!admin.first_name || 'This field is required']"
                  ></v-text-field>
                  <v-text-field
                    outline
                    label="Last Name"
                    v-model="admin.last_name"
                    required
                    :rules="[() => !!admin.last_name || 'This field is required']"
                  ></v-text-field>
                  <v-text-field
                    outline
                    label="Username"
                    v-model="admin.username"
                    required
                    :rules="[() => !!admin.username || 'This field is required']"
                  ></v-text-field>
                  <v-text-field
                    outline
                    label="Email Address"
                    v-model="admin.email"
                    required
                    :rules="[() => !!admin.email || 'This field is required']"
                  ></v-text-field>
                </v-form>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-divider class="mt-5"></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="showProfile">Submit</v-btn>
          </v-card-actions>
        </v-card>
        <v-dialog v-model="show_profile" persistent max-width="400" transition="dialog-transition">
          <v-card>
            <v-toolbar
              dark
              color="fdaGreen"
              style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
            >
              <span class="title font-weight-thin">My Profile</span>
            </v-toolbar>
            <v-card-text>
              <span class="font-weight-light">Are you sure you want to Update your Details?</span>
              <v-divider></v-divider>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                class="font-weight-light"
                outline
                color="primary"
                dark
                @click.native="show_profile = false"
              >No</v-btn>
              <v-btn
                class="font-weight-light"
                color="success"
                @click="submit()"
                :loading="isLoading"
              >Yes</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  data: () => ({
    valid: null,
    admin: {},
    first_name: null,
    last_name: null,
    username: null,
    show_profile: false,
    email: null,
    formData: null,
    isLoading: false
  }),

  created() {
    this.init();
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  computed: {},
  methods: {
    init() {
      console.log(JSON.stringify(this.$store.state.user_session.account))
      this.admin = JSON.parse(JSON.stringify(this.$store.state.user_session.account));
    },
    showProfile() {
      this.$refs.form.validate();
      if (this.valid) {
        this.show_profile = true;
      } else {
        this.$notifyError([{ message: "Please fill-up required fields" }]);
      }
    },
    close() {
      this.new_admin = {};
    },
    submit() {
      this.isLoading = true;
      this.new_admin = this.admin;
      this.$store
        .dispatch("EDIT_PROFILE", {account:this.new_admin, avatar:this.formData})
        .then(result=>{
                this.isLoading = false;
                this.show_profile = false
                if(result.success){
                  this.$notify({message:'Your account has been updated!', color: 'primary'})
                  // this.$store.dispatch('LOGOUT')
                  this.$router.push('/app')
                }else{
                  this.$notifyError(result.errors)
                }                
            })
            .catch(error=>{
              console.log(error)
                this.isLoading = false;
                 this.$notifyError(error)
            })        
    },
    onFilePicked(event) {
      this.formData = new FormData();
      this.formData.append(
        event.target.name,
        event.target.files[0],
        event.target.files[0].name
      );
      this.$store.commit(
        "SET_AVATAR",
        URL.createObjectURL(event.target.files[0])
      );
      // this.init();
      this.$forceUpdate();
    },
    avatar() {
      if (this.admin.avatar && this.admin.avatar.location)
        return this.admin.avatar.location;
      else return "";
    }
  }
};
</script>
<style>
</style>
