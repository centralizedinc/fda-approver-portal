<template>
  <v-dialog v-model="show" max-width="900px" persistent transition="dialog-transition">
    <v-card>
      <v-toolbar
        color="fdaGreen"
        style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)"
      >
        <span class="font-weight-light headline">Application Overview</span>
        <v-spacer></v-spacer>
        <v-tooltip top>
          <v-btn slot="activator" flat icon color="black" @click="$emit('close')">
            <v-icon>fas fa-times</v-icon>
          </v-btn>Close
        </v-tooltip>
      </v-toolbar>
      <v-card-text>
        <v-layout align-left>
          <v-flex xs2 mr-5 mt-3 pt-3 pr-5>
            <v-item-group v-model="window" class="shrink mr-5" mandatory tag="v-flex">
              <v-item v-for="(tab, i) in tabs" :key="i">
                <div class="mr-5 pr-5" left slot-scope="{ active, toggle }">
                  <v-btn class="text-align: left" ripple flat @click="toggle">
                    <v-icon>mdi-record</v-icon>
                    {{tab.title}}
                  </v-btn>
                </div>
              </v-item>
            </v-item-group>
          </v-flex>

          <v-flex xs10>
            <v-window v-model="window" class="elevation-5 mt-3" style="border-radius: 8px" vertical>
              <v-window-item v-for="(tab, i) in tabs" :key="i">
                <v-card>
                  <v-card-text>
                    <v-layout align-center mb-3>
                      <v-avatar class="mr-3" color="grey">
                        <img src="https://i.postimg.cc/L6Z0cZk3/vue-logo.png" alt="FDA">
                      </v-avatar>

                      <strong class="title text-transform: uppercase">{{ tab.title }}</strong>
                      <v-spacer></v-spacer>
                      <v-btn icon>
                        <v-icon>mdi-account</v-icon>
                      </v-btn>
                    </v-layout>

                    <!-- Window Items -->
                    <v-card flat v-show="window===i">
                      <v-container grid-list-md text-xs-left>
                        <v-layout row wrap>
                          <slot :name="tab.name"></slot>
                        </v-layout>
                      </v-container>
                      <!-- </v-card-title> -->
                    </v-card>
                  </v-card-text>
                </v-card>
              </v-window-item>
            </v-window>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-divider></v-divider>

      <v-card-actions>
        <v-btn flat v-if="canclaim" block color="success" :loading="loading" :disabled="loading" @click="$emit('claim')">Claim</v-btn>
        <v-btn v-else color="error" flat block @click="$emit('close')">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      // required: true,
      default: false
    },
    canclaim: {
      type: Boolean,
      default: false
      /**
       * 0 - unassigned
       * 1 - inbox
       * 2 - participated
       */
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    window: 0,
    tabs: [
      { title: "Summary", name: "appsummary" },
      { title: "Application Data", name: "appdata" },
      { title: "Uploaded Files", name: "uploadedfiles" },
      { title: "Output Documents", name: "outputdocs" },
      { title: "History", name: "apphistory" },
      { title: "Payment Details", name: "paymentdetails" }
    ]
  })
};
</script>

<style>
</style>
