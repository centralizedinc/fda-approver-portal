<template>
  <v-layout row wrap>
    <!-- sparkline for unassigned license -->
    <v-flex xs6 pa-2>
      <v-card
        class="mx-auto text-xs-center"
        color="fdaSilver"
        style="background: linear-gradient(360deg, #E9D758 0%, #E0C71C  100%); box-shadow: 0 6px 20px 0 rgba(200, 247, 197, 1)"
      >
        <v-card-text>
          <v-container fluid>
            <v-sparkline
              color="primary"
              :value="valueLic"
              :gradient="gradient"
              :smooth="radius || false"
              :padding="padding"
              :line-width="width"
              :stroke-linecap="lineCap"
              :gradient-direction="gradientDirection"
              auto-draw
            ></v-sparkline>
          </v-container>
        </v-card-text>
        <v-card-text>
          <div class="headline font-weight-thin">Unassigned Cases for License as of March 2019</div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions
          class="justify-center"
          style="background: linear-gradient(180deg, #E9D758 0%, #E0C71C  100%); box-shadow: 0 6px 20px 0 rgba(200, 247, 197, 1)"
        >
          <v-btn color="primary" block flat @click="$router.push('/app/unassigned')">Go to Report</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <!-- sparkline for unassigned certificate -->
    <v-flex xs6 pa-2>
      <v-card
        class="mx-auto text-xs-center"
        color="fdaSilver"
        style="background: linear-gradient(180deg, #939D51 0%, #CAD0A0  100%); box-shadow: 0 6px 20px 0 rgba(200, 247, 197, 1)"
      >
        <v-card-text>
          <v-container fluid>
            <v-sparkline
              :value="valueCert"
              :gradient="gradient"
              :smooth="radius || false"
              :padding="padding"
              :line-width="width"
              :stroke-linecap="lineCap"
              :gradient-direction="gradientDirection"
              auto-draw
            ></v-sparkline>
          </v-container>
        </v-card-text>
        <v-card-text>
          <div class="headline font-weight-thin">Unassigned Cases for Certificates as of March 2019</div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions
          class="justify-center"
          style="background: linear-gradient(360deg, #939D51 0%, #CAD0A0  100%);"
        >
          <v-btn color="primary" block flat @click="$router.push('/app/unassigned')">Go to Report</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>

    <v-flex xs12 lg4 pa-2>
      <dashboard-card
        icon="card_membership"
        title="Unassigned"
        :details="unassigned_details"
        color="fdaOrange"
      ></dashboard-card>
    </v-flex>
    <v-flex xs12 lg4 pa-2>
      <dashboard-card icon="book" title="Inbox" :details="inbox_details" color="fdaBlueGreen"></dashboard-card>
    </v-flex>
    <v-flex xs12 lg4 pa-2>
      <dashboard-card
        icon="far fa-credit-card"
        title="Participated"
        :details="participated_details"
        color="fdaMid"
      ></dashboard-card>
    </v-flex>
    <!-- <v-flex xs12 lg6 pa-2>
      <v-card>
        <v-toolbar dark color="#00bfa5">
          <span class="subheadline font-weight-light">License Applications</span>
          <v-btn color="success" dark absolute bottom right fab small>
            <v-icon>call_made</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-list two-line subheader>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>CASE-123-45656</v-list-tile-title>
                <v-list-tile-sub-title>Application</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey lighten-1">info</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>CASE-123-45656</v-list-tile-title>
                <v-list-tile-sub-title>Application</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey lighten-1">info</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex xs12 lg6 pa-2>
      <v-card>
        <v-toolbar dark color="#ff6e40">
          <span class="subheadline font-weight-light">Certificates Applications</span>
          <v-btn color="warning" dark absolute bottom right fab small>
            <v-icon>call_made</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <v-list two-line subheader>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>CASE-123-45656</v-list-tile-title>
                <v-list-tile-sub-title>Application</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey lighten-1">info</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>CASE-123-45656</v-list-tile-title>
                <v-list-tile-sub-title>Application</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey lighten-1">info</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider></v-divider>
          </v-list>
        </v-card-text>
      </v-card>
    </v-flex>-->
  </v-layout>
</template>

<script>
const gradients = [];
import DashboardCard from "@/components/DashboardCards";
export default {
  components: { DashboardCard },
  data() {
    return {
      // sparklines
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: "round",
      gradient: gradients[5],
      valueLic: [10, 20, 30, 55, 10, 80, 3, 50, 112, 22, 70, 8],
      valueCert: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
      gradientDirection: "top",
      gradients,
      // end

      unassigned_details: [
        {
          description: "License",
          count: 0
        },
        {
          description: "Certificate",
          count: 0
        }
      ],
      inbox_details: [
        {
          description: "License",
          count: 0
        },
        {
          description: "Certificate",
          count: 0
        }
      ],
      participated_details: [
        {
          description: "License",
          count: 0
        },
        {
          description: "Certificate",
          count: 0
        }
      ]
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$store
        .dispatch("GET_UNASSIGNED")
        .then(result => {
          this.unassigned_details[0].count = this.getCounts(0, 0);
          this.unassigned_details[1].count = this.getCounts(0, 1);
          return this.$store.dispatch("GET_INBOX");
        })
        .then(result => {
          this.inbox_details[0].count = this.getCounts(1, 0);
          this.inbox_details[1].count = this.getCounts(1, 1);
          return this.$store.dispatch("GET_PARTICIPATED");
        })
        .then(result => {
          this.participated_details[0].count = this.getCounts(2, 0);
          this.participated_details[1].count = this.getCounts(2, 1);
          console.log("preparing for dispatch get product type")
          return this.$store.dispatch("GET_PRODUCT_REFERENCE")
        }).then(result => {
          console.log("get product reference: " + JSON.stringify(this.result))
          return this.$store.dispatch("GET_PLACES_REFERENCE")
        }).then(result =>{
          console.log("places data: " + JSON.stringify(this.$store.state.places.regions))
        })
        .catch(err => {
          console.log("err :", err);
        });
    },
    getCounts(index, type) {
      var features = [
        this.count(this.$store.state.unassigned.unassigned, type),
        this.count(this.$store.state.inbox.inboxes, type),
        this.count(this.$store.state.participated.participated, type)
      ];
      return features[index];
    },
    count(arr, type) {
      var count = 0;
      arr.forEach(elem => {
        if (elem.case_type === type) {
          count++;
        }
      });
      return count;
    }
  }
};
</script>

<style>
</style>

