<template>
    <v-layout row wrap>
        <v-flex xs12 lg4 pa-2>
            <dashboard-card
                icon="card_membership" 
                title="Unassigned"
                :details="unassigned_details"
                color="primary"
                >
            </dashboard-card>
        </v-flex>
        <v-flex xs12 lg4 pa-2>
            <dashboard-card
                icon="book" 
                title="Inbox"
                :details="inbox_details"
                color="success"
                >
            </dashboard-card>
        </v-flex>
        <v-flex xs12 lg4 pa-2>
            <dashboard-card
                icon="far fa-credit-card" 
                title="Participated"
                :details="participated_details"
                color="warning"
                >
            </dashboard-card>
        </v-flex>
        <v-flex xs12 lg6 pa-2>
            <v-card>
                <v-toolbar dark color="#00bfa5">
                    <span class="subheadline font-weight-light">License Applications</span>
                    <v-btn color="success"
                        dark              
                        absolute
                        bottom
                        right
                        fab
                        small
                        >
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
                    <v-btn color="warning"
                        dark              
                        absolute
                        bottom
                        right
                        fab
                        small
                        >
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
        </v-flex>
    </v-layout>    
</template>

<script>
import DashboardCard from "@/components/DashboardCards";
export default {
  components: { DashboardCard },
  data() {
    return {
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

