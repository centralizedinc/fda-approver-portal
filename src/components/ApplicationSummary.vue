<template>
    <v-dialog
        v-model="show"
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
                    <v-flex xs2 pr-3>
                        <v-card class="header-panel">
                            <v-item-group v-model="window" class="shrink mr-4 text-xs-center" mandatory tag="v-flex">
                                <v-item v-for="item in tabs" :key="item">
                                    <div slot-scope="{ active, toggle }">
                                        <v-btn :input-value="active" icon @click="toggle">
                                            <slot v-bind:name="`header-${item}`"></slot>
                                        </v-btn>
                                    </div>
                                </v-item>
                            </v-item-group>
                        </v-card>
                    </v-flex>
                    <v-flex xs10>
                        <v-card class="content-panel">
                            <v-container id="scroll-target" pa-0 class="scroll-y container-panel">
                                <v-layout row wrap v-scroll:#scroll-target="onScroll">
                                    <v-window v-model="window" vertical class="window-panel">
                                        <v-window-item v-for="item in tabs" :key="item">
                                            <slot v-bind:name="`content-${item}`"></slot>
                                        </v-window-item>
                                    </v-window>
                                </v-layout>
                            </v-container>
                        </v-card>
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
    },
    tabs: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      window: 0
    };
  },
  methods: {
    onScroll(e) {
      this.$emit("onscroll", e);
    }
  }
};
</script>

<style>
.header-panel {
  max-height: 400px;
}

.content-panel {
  min-height: 350px;
}

.container-panel {
  max-height: 800px;
  min-height: 400px;
}

.window-panel {
  width: 1000px;
}
</style>
