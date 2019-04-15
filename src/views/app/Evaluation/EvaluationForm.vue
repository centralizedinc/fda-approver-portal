<template>
  <v-card>
    <v-card-text>
      <v-container 
        grid-list-lg 
        id="activities-layout" 
        class="scroll-y"
        style="max-height: 200px" >
        <v-layout row wrap v-scroll:#activities-layout>
          <v-flex xs12>
            {{activities}}
          </v-flex>
        </v-layout>
      </v-container>
      <v-layout row wrap>
        
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-btn color="warning" @click="$emit('unclaim')">APPROVE</v-btn>
      <v-btn color="warning" @click="$emit('unclaim')">DISAPPROVE</v-btn>
      <v-btn color="warning" @click="$emit('unclaim')">RECOMMEND</v-btn>
      <v-btn color="warning" @click="$emit('unclaim')">UNCLAIM</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  computed: {
    activities() {
      return this.$store.state.license.selected_case.activities;
    }
  }
};
</script>

<style>
</style>
