<template>
    <v-layout row wrap>
        <v-flex v-for="notif in notifications" :key="notif.expiry">
            <v-snackbar multi-line top right :value="notif.show" :color="notif.data.color">
                <v-icon dark class="pr-3" v-if="notif.data.icon">{{notif.data.icon}}</v-icon>
                <v-icon dark class="pr-3" v-else>error_outline</v-icon>
                <span class="font-weight-light" v-html="notif.data.message"></span>
                <v-btn small flat icon dark @click.native="notif.show=false" @click="close()">
                    <v-icon dark small>close</v-icon>
                </v-btn>        
            </v-snackbar>
        </v-flex>
    </v-layout>        
</template>

<script>
export default {
    data(){
        return {
            // show:true
        }
    },
    methods:{
       close(){
           this.$store.commit('REMOVE_NOTIFICATION')
       } 
    },
    computed:{
        notifications(){
            var notif =[];
            this.$store.state.notifications.notifications.forEach(element => {
                if(element.expiry > (new Date()).getTime()){
                    notif.push(element)
                }
            });
            if(notif.length === 0){
                this.$store.commit('REMOVE_NOTIFICATION')
            } 
            console.log(JSON.stringify(notif))           
            return notif;
        }
    }
}
</script>

<style>

</style>
