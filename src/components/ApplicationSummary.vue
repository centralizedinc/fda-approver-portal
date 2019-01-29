<template>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="1000px"
        transition="dialog-transition">
        <v-card>
            <v-card-title primary-title>
                {{title}}
                <v-spacer></v-spacer>
                <v-btn color="error" flat icon @click="$emit('close')">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-layout row wrap>
                    <v-flex xs2>
                        <v-item-group v-model="window" class="shrink mr-4" mandatory tag="v-flex">
                            <v-item v-for="n in title.length" :key="n">
                                <div slot-scope="{ active, toggle }">
                                    <v-btn :input-value="active" icon @click="toggle">
                                        {{title[n]}}
                                    </v-btn>
                                </div>
                            </v-item>
                        </v-item-group>
                    </v-flex>
                    <v-flex xs10>
                        <v-container
                            id="scroll-target"
                            style="max-height: 800px"
                            class="scroll-y">
                            <v-layout
                                v-scroll:#scroll-target="onScroll"
                                column
                                align-center
                                justify-center
                                style="height: 1000px">

                            </v-layout>
                        </v-container>
                    </v-flex>
                </v-layout>
            </v-card-text>
            <v-card-actions>
                
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "Application Summary"
    }
  }
};
</script>

<style>
</style>
