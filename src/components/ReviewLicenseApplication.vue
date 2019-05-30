<template>
    <v-layout row wrap>
        <!-- General Information -->
        <v-flex v-bind="{ [`xs${claimed?12:4}`]: true }">
            <v-card>
                <v-card-title class="title-bg title white--text" dark>
                    General Information
                    <v-spacer></v-spacer>
                    <v-btn @click="show_tab3=!show_tab3" flat icon>
                        <v-icon>{{show_tab3?'expand_less':'expand_more'}}</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider v-show="show_tab3"></v-divider>
                <v-card-text v-show="show_tab3">
                    <v-layout row wrap>
                        <v-flex xs12>
                            <b>Product Type:</b> {{getProduct(form_details.general_info.product_type).name}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Primary Activity:</b> {{getPrimaryActivity(form_details.general_info.primary_activity).name}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Additional Activities:</b> {{getAdditionals(form_details.general_info.addtl_activity)}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Declared Capital:</b> {{getDeclared(form_details.general_info.declared_capital).name}}
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>

        <!-- Establishment Information -->
        <v-flex v-bind="{ [`xs${claimed?12:4}`]: true }">
            <v-card>
                <v-card-title class="title-bg title white--text" dark>
                    Establishment Information
                    <v-spacer></v-spacer>
                    <v-btn @click="show_tab4=!show_tab4" flat icon>
                        <v-icon>{{show_tab4?'expand_less':'expand_more'}}</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider v-show="show_tab4"></v-divider>
                <v-card-text v-show="show_tab4">
                    <v-layout row wrap>
                        <v-flex xs12>
                            <b>Name of Establishment:</b> {{form_details.estab_details.establishment_name}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Establishment Owner:</b> {{form_details.estab_details.establishment_owner}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>TIN:</b> {{form_details.estab_details.tin}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Email:</b> {{form_details.estab_details.email}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Landline:</b> {{form_details.estab_details.landline}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Fax:</b> {{form_details.estab_details.fax}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Mobile:</b> {{form_details.estab_details.mobile}}
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>

        <!-- Product Line -->
        <v-flex v-bind="{ [`xs${claimed?12:4}`]: true }">
            <v-card>
                <v-card-title class="title-bg title white--text" dark>
                    Product Line
                    <v-spacer></v-spacer>
                    <v-btn @click="show_tab5=!show_tab5" flat icon>
                        <v-icon>{{show_tab5?'expand_less':'expand_more'}}</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider v-show="show_tab5"></v-divider>
                <v-card-text v-show="show_tab5">
                    <v-layout row wrap v-for="(item, index) in form_details.estab_details.products" :key="`a${index}`">
                        <v-flex xs12 class="body-2">
                            <b>Product #{{index+1}}</b>
                        </v-flex>
                        <v-flex xs12>
                            <b>Product Line:</b> {{getProductLine(item.prod_line).name}}
                        </v-flex>
                        <v-flex xs12>
                            <b>Remarks:</b> {{item.remarks}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>

        <!-- Establishment Address -->
        <v-flex v-bind="{ [`xs${claimed?12:4}`]: true }">
            <v-card>
                <v-card-title class="title-bg title white--text" dark>
                    Establishment Address
                    <v-spacer></v-spacer>
                    <v-btn @click="show_tab6=!show_tab6" flat icon>
                        <v-icon>{{show_tab6?'expand_less':'expand_more'}}</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider v-show="show_tab6"></v-divider>
                <v-card-text v-show="show_tab6">
                    <v-layout row wrap v-for="(item, index) in form_details.address_list" :key="`b${index}`">
                    <v-flex xs6>
                        <v-flex xs12>
                            <b>Address #{{index+1}}</b>
                        </v-flex>
                        <v-flex xs12>
                            <b>Type:</b> {{getEstablishmentType(item.type)}}
                        </v-flex>
                        <v-flex xs12>
                            <b>Address:</b> {{item.address}}
                        </v-flex>
                        <v-flex xs12>
                            <b>Region:</b> {{getRegionName(item.region)}}
                        </v-flex>
                        <v-flex xs12>
                            <b>Province:</b> {{getProvinceName(item.province)}}
                        </v-flex>
                        <v-flex xs12>
                            <b>City:</b> {{getCityName(item.city)}}
                        </v-flex>
                        <v-flex xs12>
                            <b>Zip Code:</b> {{item.zipcode}}
                        </v-flex>
                        <v-flex xs12>
                            <b>Latitude:</b> {{item.location.lat}}
                        </v-flex>
                        <v-flex xs12>
                            <b>Longitude:</b> {{item.location.lng}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                    </v-flex>
                    <v-flex xs6>
                        <v-flex xs12>
                        <address-map
                        :city="item.city"
                        :province="item.province"
                        :region="item.region"
                        :lat="item.location.lat"
                        :lng="item.location.lng"
                        
                        @pin="setCoordinates"
                        ></address-map>
                        </v-flex>
                    </v-flex>  
                        
                        
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>

        <!-- Authorized Officer -->
        <v-flex v-bind="{ [`xs${claimed?12:4}`]: true }">
            <v-card>
                <v-card-title class="title-bg title white--text" dark>
                    Authorized Officer
                    <v-spacer></v-spacer>
                    <v-btn @click="show_tab7=!show_tab7" flat icon>
                        <v-icon>{{show_tab7?'expand_less':'expand_more'}}</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider v-show="show_tab7"></v-divider>
                <v-card-text v-show="show_tab7">
                    <v-layout row wrap>
                        <v-flex xs12>
                            <b>Last Name:</b> {{form_details.auth_officer.lastname}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>First Name:</b> {{form_details.auth_officer.firstname}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Designation:</b> {{getDesignation(form_details.auth_officer.designation).name}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Email:</b> {{form_details.auth_officer.email}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>ID Type:</b> {{getIdType(form_details.auth_officer.id_type).name}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>ID Number:</b> {{form_details.auth_officer.id_no}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>ID Expiry:</b> {{form_details.auth_officer.id_expiry}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Address:</b> {{form_details.auth_officer.mail_add.address}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>City:</b> {{getCityName(form_details.auth_officer.mail_add.city)}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Province:</b> {{getProvinceName(form_details.auth_officer.mail_add.province)}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Region:</b> {{getRegionName(form_details.auth_officer.mail_add.region)}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Zip Code:</b> {{form_details.auth_officer.mail_add.zipcode}}
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>

        <!-- Qualified Personnel -->
        <v-flex v-bind="{ [`xs${claimed?12:4}`]: true }">
            <v-card>
                <v-card-title class="title-bg title white--text" dark>
                    Qualified Personnel
                    <v-spacer></v-spacer>
                    <v-btn @click="show_tab8=!show_tab8" flat icon>
                        <v-icon>{{show_tab8?'expand_less':'expand_more'}}</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider v-show="show_tab8"></v-divider>
                <v-card-text v-show="show_tab8">
                    <v-layout row wrap v-for="(item, index) in form_details.qualified" :key="`c${index}`">
                        <v-flex xs12>
                            <b>Personnel #{{index+1}}</b>
                        </v-flex>
                        <v-flex xs12>
                            <b>Last Name:</b> {{item.lastname}}
                        </v-flex>
                        <v-flex xs12>
                            <b>First Name:</b> {{item.firstname}}
                        </v-flex>
                        <v-flex xs12>
                            <b>Middle Name:</b> {{item.middlename}}
                        </v-flex>
                        <v-flex xs12>
                            <b>Birthday:</b> {{item.birthday}}
                        </v-flex>
                        <v-flex xs12>
                            <b>Designation:</b> {{getDesignation(item.designation).name}}
                        </v-flex>
                        <v-flex xs12>
                            <b>Email:</b> {{item.email}}
                        </v-flex>
                        <v-flex xs12>
                            <b>TIN:</b> {{item.tin}}
                        </v-flex>
                        <v-flex xs12>
                            <b>ID Type:</b> {{getIdType(item.id_type).name}}
                        </v-flex>
                        <v-flex xs12>
                            <b>ID No.:</b> {{item.id_no}}
                        </v-flex>
                        <v-flex xs12>
                            <b>ID Expiration:</b> {{item.id_expiry}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import AddressMap from "./AddressMap";

export default {
  components: {
    AddressMap
  },
  props: {
    claimed: {
      type: Boolean,
      default: false
    },
    show_tabs_ext: {
      type: Boolean,
      default: true
    },
    form_details: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      show_tab3: false, //General Info
      show_tab4: false, //Establishment Info
      show_tab5: false, //Product Line
      show_tab6: false, //Establishment Address
      show_tab7: false, //Authorized Officer
      show_tab8: false //Qualified Personnel
    };
  },
  created() {
    this.show_tab3 = this.show_tabs_ext;
    this.show_tab4 = this.show_tabs_ext;
    this.show_tab5 = this.show_tabs_ext;
    this.show_tab6 = this.show_tabs_ext;
    this.show_tab7 = this.show_tabs_ext;
    this.show_tab8 = this.show_tabs_ext;
  },
  methods: {
    setCoordinates(coordinates) {
      console.log("goes here: " + JSON.stringify(coordinates));
      this.form_details.address_list.location = coordinates;
      // console.log("coordinates details: " + JSON.stringify(coordinates))
      // coordinates = this.form_details.address_list.location
    }
  }
};
</script>

<style>
</style>
