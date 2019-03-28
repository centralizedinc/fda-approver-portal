<template>
  <v-app>
    <v-container fluid class="bg">
      <v-navigation-drawer app :mini-variant="mini" width="250" v-model="showNav">
        <v-toolbar dark style="height:100px" class="toolbarStyle">
          <v-list class="pa-0">
            <v-list-tile
              class="pa-1"
              avatar
              style=" height: 100px; background:url('https://i.postimg.cc/YCbD5mHP/image.png') repeat center center"
            >
              <v-list-tile-avatar class="mt-4">
                <v-avatar size="40" color="teal">
                  <img v-if="admin.avatar" :src="admin.avatar.location" alt="alt">
                  <span v-else>{{admin.first_name.substring(0,1) + admin.last_name.substring(0,1)}}</span>
                </v-avatar>
              </v-list-tile-avatar>
              <v-spacer></v-spacer>
              <v-list-tile-content class="mt-4">
                <v-list-tile-title class="body-2">abalita</v-list-tile-title>
                <v-list-tile-sub-title class="caption">Last Logged in:</v-list-tile-sub-title>
                <v-list-tile-sub-title class="caption">01/02/2019 2:19PM</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <v-list>
          <v-list-tile ripple @click="goTo('/app')" class="ma-1" :style="activeRoute('Dashboard')">
            <v-list-tile-action>
              <v-icon color="primary">dashboard</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="body-1 font-weight-light">Dashboard</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <template v-if="isForPrinting">
            <v-list-tile @click="goTo('/app/print')" class="ma-1" :style="activeRoute('Print')">
              <v-list-tile-action>
                <v-icon color="primary">print</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="body-1 font-weight-light">For Printing</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              @click="goTo('/app/print/history')"
              class="ma-1"
              :style="activeRoute('Batch')"
            >
              <v-list-tile-action>
                <v-icon color="primary">history</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="body-1 font-weight-light">Print History</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <template v-else>
            <v-list-tile
              ripple
              @click="goTo('/app/inbox')"
              class="ma-1"
              :style="activeRoute('Inbox')"
            >
              <v-list-tile-action>
                <v-icon color="primary">mail</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="body-1 font-weight-light">Inbox</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              ripple
              @click="goTo('/app/participated')"
              class="ma-1"
              :style="activeRoute('Participated Cases')"
            >
              <v-list-tile-action>
                <v-icon color="primary">book</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="body-1 font-weight-light">Participated</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              ripple
              @click="goTo('/app/unassigned')"
              class="ma-1"
              :style="activeRoute('Unassigned Cases')"
            >
              <v-list-tile-action>
                <v-icon color="primary">drafts</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="body-1 font-weight-light">Unassigned</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <!-- <v-list-tile
            @click="goTo('/app/payments')"
            class="ma-1"
            :style="activeRoute('Notifications')"
          >
            <v-list-tile-action>
              <v-icon color="success">notifications</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="body-1 font-weight-light">Notifications</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>-->
          <v-divider></v-divider>

          <v-list-tile
            ripple
            @click="goTo('/app/profile')"
            class="ma-1"
            :style="activeRoute('Profile Management')"
          >
            <v-list-tile-action>
              <v-icon color="primary">far fa-user-circle</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="body-1 font-weight-light">My Profile</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            ripple
            @click="goTo('/app/password')"
            class="ma-1"
            :style="activeRoute('Password Management')"
          >
            <v-list-tile-action>
              <v-icon color="primary">lock_open</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="body-1 font-weight-light">Password Settings</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile
            ripple
            @click="showLogout = true"
            class="ma-1"
            :style="activeRoute('logout')"
          >
            <v-list-tile-action>
              <v-icon color="primary">fas fa-sign-out-alt</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="body-1 font-weight-light">Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar app dark class="toolbarStyle">
        <v-btn icon color="rgba(0, 0, 0, 0.18)" @click.stop="mini = !mini" v-if="!isMiniView">
          <v-icon v-if="mini">menu</v-icon>
          <v-icon v-else>chevron_left</v-icon>
        </v-btn>
        <span class="headline font-weight-light">FDA Approver Portal</span>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon small>far fa-bell</v-icon>
        </v-btn>
        <v-btn icon>
         <v-avatar size="40" color="teal">
            <img v-if="admin.avatar" :src="admin.avatar.location" alt="alt">
            <span v-else>{{admin.first_name.substring(0,1) + admin.last_name.substring(0,1)}}</span>
          </v-avatar>
        </v-btn>
        <v-btn icon>
          <v-icon small>fas fa-indent</v-icon>
        </v-btn>
        <v-btn flat icon v-if="isMiniView" @click="showNav=!showNav">
          <v-icon>menu</v-icon>
        </v-btn>
      </v-toolbar>
      <notification></notification>
      <!-- <v-content> -->
      <v-container fluid>
        <!-- <span class="headline font-weight-thin">{{page_name}}</span>
        <v-breadcrumbs divider="/">
        <v-breadcrumbs-item>
          <v-icon color="primary">home</v-icon><span class="caption font-weight-light">Home</span>
        </v-breadcrumbs-item> 
        <v-breadcrumbs-item>
          <v-icon>book</v-icon><span class="caption font-weight-light">Certficates</span>
        </v-breadcrumbs-item>
        <v-breadcrumbs-item>
          <v-icon>edit</v-icon><span class="caption font-weight-light">New Application</span>
        </v-breadcrumbs-item>  
        </v-breadcrumbs>
        <v-divider></v-divider>-->
        <v-card class="mt-3 mx-auto" color="fdaSilver">
          <v-layout row wrap ml-3>
            <v-sheet
              class="v-sheet--offset pa-3"
              color="fdaSilver"
              elevation="4"
              width="calc(100% - 15px)"
            >
              <span class="title font-weight-light">{{page_name}}</span>
              <v-breadcrumbs divider="/">
                <v-breadcrumbs-item
                  v-for="(item, index) in breadcrumbs"
                  :key="index"
                  @click="goTo(item.href)"
                >
                  <v-icon color="fdaGreen">{{item.icon}}</v-icon>
                  <span class="caption font-weight-light">{{item.name}}</span>
                </v-breadcrumbs-item>
              </v-breadcrumbs>
            </v-sheet>

            <v-spacer></v-spacer>
          </v-layout>
        </v-card>
        <v-divider></v-divider>
        <!-- <transition name="fade"> -->
        <router-view></router-view>
        <!-- </transition> -->
      </v-container>
    </v-container>
    <v-footer app dark style="background: linear-gradient(45deg, #b5c25a 0%, #104b2a 100%)">
      <span class="caption">Copyright © 2019 FDA All rights reserved. v{{app_version}}</span>
      <v-spacer></v-spacer>
      <span class="caption">Food And Drug Administration of the Philippines</span>
    </v-footer>
    <!-- LOGOUT DIALOG -->
    <v-dialog v-model="showLogout" persistent max-width="300" transition="dialog-transition">
      <v-card>
        <v-toolbar
          dark
          color="fdaGreen"
          style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
        >
          <span class="title font-weight-light">Logout</span>
        </v-toolbar>
        <v-card-text>
          <span class="font-weight-light">Are you sure you want to logout?</span>
          <v-divider></v-divider>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="font-weight-light"
            outline
            color="primary"
            dark
            @click.native="showLogout = false"
          >No</v-btn>
          <v-btn class="font-weight-light" color="success" @click="logout">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import notification from "@/components/Notification";
export default {
  components: { notification },
  //#########################
  // variables
  //#########################
  data() {
    return {
      showNav:true,
      showLogout: false,
      mini: false,
      route_name: "",
      isForPrinting: false,
      admin:{}
    };
  },
  //#########################
  // init
  //#########################
  created() {
    this.init();
  },
  //#########################
  // methods
  //#########################
  methods: {
    init() {
      this.admin = this.$store.state.user_session.account;
      this.$store
        .dispatch("IS_FOR_PRINTING")
        .then(result => {
          this.isForPrinting = result;
        })
        .catch(err => {
          console.log("err :", err);
        });
    },
    goTo(router) {
      this.$router.push(router);
    },
    activeRoute(route) {
      console.log("ROUTER_NAME: " + this.$route.name);
      if (this.$route.name === route) {
        return "background-color: rgb(2, 128, 0); color:white";
      } else {
        return;
      }
    },
    logout() {
      this.$store.commit("LOGOUT");
      this.$router.push("/");
    }
  },
  //#########################
  // computed
  //#########################
  computed: {
    page_name() {
      return this.$route.name;
    },
    app_version() {
      return process.env.VUE_APP_VERSION;
    },
    app_version(){
      return process.env.VUE_APP_VERSION
    },
    isMiniView(){
        return this.$vuetify.breakpoint.smAndDown
    },
    breadcrumbs() {
      return this.$store.state.breadcrumbs.navigation;
    }
  }
};
</script>

<style>
.toolbarStyle {
  background: linear-gradient(45deg, #b5c25a 0%, #104b2a 100%);
  box-shadow: 0 6px 20px 0 rgba(77, 182, 172, 0.5);
}
.v-sheet--offset {
  top: -24px;
  position: relative;
  border-radius: 2px 20px;
  /* transform: skew(-10deg) !important; */
}
#nprogress .bar {
  height: 2px;
}

#container {
  padding: 40px;
  background-color: grey;
  color: white;
}
#nprogress .bar {
  background: purple;
}

#nprogress .spinner-icon {
  border-top-color: purple;
  border-left-color: purple;
}
</style>
