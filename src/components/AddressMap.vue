<template>
    <v-layout row wrap>
    
        <v-flex xs12 elevation-3>
    
            <GmapMap style="width: 100%; height: 300px;" :zoom="10" :center="center">
    
                <GmapMarker :draggable="edit" :position="center" title="Office Address" @dragend="getLocation"></GmapMarker>
    
            </GmapMap>
    
        </v-flex>
    
    </v-layout>
</template>

<script>
export default {
    props: ['city', 'province', 'region', 'location', 'locate', 'edit', 'lat', 'lng'],
    data() {
        return {
            center: { lat: 14.4164767, lng: 121.0371224 }
        }
    },
    methods: {
        getLocation(event) {
            console.log("get location" + JSON.stringify(event))
            this.center = event.latLng
            this.$emit('pin', this.center);
        }
    },
    computed: {
        location_watch() {
            console.log("city: " + this.city)
            console.log("province: " + this.province)
            console.log("region: " + this.region)

            var map_location = (this.city ? this.getCityName(this.city) + " " : "") +
                (this.province ? this.getProvinceName(this.province) + " " : "") +
                (this.region ? this.getRegionName(this.region) : "");
            console.log('COMPUTING MAP LOCATION: ' + map_location)
            this.center.lat = this.lat
            this.center.lng = this.lng
            return map_location;
            // var coordinates = this.lat+", "+this.lng
            // return coordinates;
        }
    },
    watch: {
        location_watch(val) {
            console.log("location watch watch val: " + JSON.stringify(val))
            if (val) {
                // this.$http.get('https://fda-services.herokuapp.com/v1.0/core/locations?location=' + val)
                this.$http.get('https://fda-services.herokuapp.com/v1.0/core/locations?location=' + this.center.lat + ',' + this.center.lng)
                    .then(result => {
                        console.log("result data here: " + JSON.stringify(result))
                        if (result.data.model.candidates[0]) {
                            this.center = result.data.model.candidates[0].geometry.location
                            if (this.center) {
                                this.$emit('pin', this.center);
                            }
                        } else {
                            this.$notify({ message: 'Cannot map location', color: 'Error' })
                        }


                    })
            }
        }
    }

}
</script>

<style>

</style>
