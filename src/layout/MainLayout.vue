<template>
    <v-app>
        <notification></notification>
        <v-toolbar dark style='background: linear-gradient(45deg, #43A047 0%, #1de9b6 100%)'>
        </v-toolbar>
        <v-container fluid>
            <router-view></router-view>
        </v-container>
        <v-footer dark style='background: linear-gradient(45deg, #43A047 0%, #1de9b6 100%)'>

        </v-footer>
    </v-app>
</template>

<script>
import notification from "@/components/Notification";
export default {
    components: {notification}
};
</script>

<style>
</style>
