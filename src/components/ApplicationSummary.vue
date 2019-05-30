<template>
    <div>
        <v-toolbar dark color="primary">
            <span class="title font-weight-light">Application Overview</span>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
                <v-btn :loading="loading" slot="activator" flat icon
                    @click="launchApp">
                    <v-icon>launch</v-icon>
                </v-btn>
                View Full Details
            </v-tooltip>
        </v-toolbar>
        <v-layout row wrap>
            <v-flex xs12 pa-1>
                <v-card>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-flex xs12 class="subheading" pa-1>
                            Reference Number:
                        </v-flex>
                        <v-flex xs12 class="subheading font-weight-bold" pa-1>
                            {{case_details.case_no}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12 class="subheading" pa-1 mt-2>
                            Application Type:
                        </v-flex>
                        <v-flex xs12 class="subheading font-weight-bold" pa-1>
                            {{getAppType(case_details.application_type, case_details.case_type)}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12 class="subheading" pa-1 mt-2>
                            Date Applied:
                        </v-flex>
                        <v-flex xs12 class="subheading font-weight-bold" pa-1>
                            {{formatDate(case_details.date_created)}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12 class="subheading" pa-1 mt-2>
                            Status:
                        </v-flex>
                        <v-flex xs12 class="subheading font-weight-bold" pa-1>
                            {{getAppStatus(case_details.status)}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12 class="subheading" pa-1 mt-2>
                            Current Task:
                        </v-flex>
                        <v-flex xs12 class="subheading font-weight-bold" pa-1>
                            {{getTask(case_details.case_type, case_details.current_task).name}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12 class="subheading" pa-1 mt-2>
                            Remarks:
                        </v-flex>
                        <v-flex xs12 class="subheading font-weight-bold" pa-1>
                            {{case_details.remarks}}
                        </v-flex>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" :disabled="loading" outline @click="$emit('close')">Close</v-btn>
                        <v-btn color="primary" :loading="loading" @click="launchApp">View</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false
    };
  },
  computed: {
    case_details() {
      return this.$store.state.case.case_details;
    }
  },
  methods: {
    launchApp() {
      this.loading = true;
      this.$store
        .dispatch("SHOW_REVIEW")
        .then(result => {
          this.loading = false;
        })
        .catch(err => {
          this.$notifyError(err);
          this.loading = false;
        });
    }
  }
};
</script>

<style>
</style>
