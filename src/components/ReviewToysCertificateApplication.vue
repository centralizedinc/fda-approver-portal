<template>
  <v-layout row wrap>
    <!-- Particulars of the Product -->
    <v-flex v-bind="{ [`xs${claimed?12:4}`]: true }">
      <v-card>
        <v-card-title class="title-bg title white--text" dark>
          Particulars of the Product
          <v-spacer></v-spacer>
          <v-btn @click="show_tab3=!show_tab3" flat icon>
            <v-icon>{{show_tab3?'expand_less':'expand_more'}}</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider v-show="show_tab3"></v-divider>
        <v-card-text v-show="show_tab3">
          <v-layout row wrap>
            <v-flex xs12>
              <b>Application Type :</b>
              {{getAppType(form_details.general_info.application_type, 1)}}
            </v-flex>
            <v-flex xs12>
              <v-divider></v-divider>
            </v-flex>
            <v-flex xs12>
              <b>Brand Name :</b>
              {{form_details.toy_certificate.particular_product.brand_name}}
            </v-flex>
            <v-flex xs12>
              <v-divider></v-divider>
            </v-flex>
            <v-flex xs12>
              <b>Product Type :</b>
              {{form_details.toy_certificate.particular_product.product_type}}
            </v-flex>
            <template v-if="form_details.toy_certificate.particular_product.product_use">
              <v-flex xs12>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs12>
                <b>Product Use :</b>
                {{form_details.toy_certificate.particular_product.product_use}}
              </v-flex>
              <v-flex xs12>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs12>
                <b>Mass (in kilograms) of the child for whom the toy is intended :</b>
                {{form_details.toy_certificate.particular_product.mass_of_child}}
              </v-flex>
              <v-flex xs12>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs12>
                <b>If appropriate, the maximum number of children that may safely use the equipment simultaneously :</b>
                {{form_details.toy_certificate.particular_product.if_appropriate}}
              </v-flex>
            </template>
            <template v-else-if="form_details.toy_certificate.particular_product.exemption_reason">
              <v-flex xs12>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs12>
                <b>Exemption for the reason that :</b>
                {{form_details.toy_certificate.particular_product.exemption_reason}}
              </v-flex>
            </template>
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
          <v-btn @click="show_tab3=!show_tab3" flat icon>
            <v-icon>{{show_tab3?'expand_less':'expand_more'}}</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider v-show="show_tab3"></v-divider>
        <v-card-text v-show="show_tab3">
          <v-layout row wrap>
            <v-flex xs12>
              <b>Company Name :</b>
              {{form_details.toy_certificate.establishment_info.company}}
            </v-flex>
            <v-flex xs12>
              <v-divider></v-divider>
            </v-flex>
            <v-flex xs12>
              <b>Address :</b>
              {{form_details.toy_certificate.establishment_info.address}}
            </v-flex>
            <v-flex xs12>
              <v-divider></v-divider>
            </v-flex>
            <v-flex xs12>
              <b>Region :</b>
              {{form_details.toy_certificate.establishment_info.region}}
            </v-flex>
            <v-flex xs12>
              <v-divider></v-divider>
            </v-flex>
            <v-flex xs12>
              <b>License No :</b>
              {{form_details.toy_certificate.establishment_info.license_no}}
            </v-flex>
            <v-flex xs12>
              <v-divider></v-divider>
            </v-flex>
            <v-flex xs12>
              <b>License Validity :</b>
              {{form_details.toy_certificate.establishment_info.license_validity}}
            </v-flex>
            <v-flex xs12>
              <v-divider></v-divider>
            </v-flex>
            <v-list dense>
              <v-list-tile
                v-for="(item, index) in form_details.toy_certificate.establishment_info.contact_info"
                :key="index"
              >
                <v-list-tile-content>{{item.type}}:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ item.details }}</v-list-tile-content>
              </v-list-tile>
            </v-list>
            <v-flex xs12>
              <v-divider></v-divider>
            </v-flex>
            <v-flex xs12>
              <b>Please select the corresponding company activity/activities :</b>
              {{form_details.toy_certificate.establishment_info.activity}}
            </v-flex>
            <template v-if="form_details.toy_certificate.establishment_info.directly_source !== null">
              <v-flex xs12>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs12>
                <b>Directly Source :</b>
                {{form_details.toy_certificate.establishment_info.directly_source}}
              </v-flex>
            </template>
            <template v-if="form_details.toy_certificate.establishment_info.origin_country">
              <v-flex xs12>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs12>
                <b>Country of Origin :</b>
                {{form_details.toy_certificate.establishment_info.origin_country}}
              </v-flex>
            </template>
            <template v-if="form_details.toy_certificate.establishment_info.manufacturer_name">
              <v-flex xs12>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs12>
                <b>Complete Name of Manufacturer :</b>
                {{form_details.toy_certificate.establishment_info.manufacturer_name}}
              </v-flex>
            </template>
            <template v-if="form_details.toy_certificate.establishment_info.manufacturer_address">
              <v-flex xs12>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs12>
                <b>Complete Address of Manufacturer :</b>
                {{form_details.toy_certificate.establishment_info.manufacturer_address}}
              </v-flex>
            </template>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>

    <!-- Person Representing the Local Company -->
    <v-flex v-bind="{ [`xs${claimed?12:4}`]: true }">
      <v-card>
        <v-card-title class="title-bg title white--text" dark>
          Person Representing the Local Company
          <v-spacer></v-spacer>
          <v-btn @click="show_tab3=!show_tab3" flat icon>
            <v-icon>{{show_tab3?'expand_less':'expand_more'}}</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider v-show="show_tab3"></v-divider>
        <v-card-text v-show="show_tab3">
          <v-layout row wrap>
            <v-flex xs12>
              <b>Name :</b>
              {{form_details.toy_certificate.company_representative.name}}
            </v-flex>
            <v-flex xs12>
              <v-divider></v-divider>
            </v-flex>
            <v-flex xs12>
              <b>Designation :</b>
              {{form_details.toy_certificate.company_representative.designation}}
            </v-flex>
            <v-flex xs12>
              <v-divider></v-divider>
            </v-flex>
            <v-list dense>
              <v-list-tile
                v-for="(item, index) in form_details.toy_certificate.company_representative.contact_info"
                :key="index"
              >
                <v-list-tile-content>{{item.type}}:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ item.details }}</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
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
      show_tab3: false,
      show_tab4: false,
      show_tab5: false
    };
  },
  created() {
    console.log("form_details :", this.form_details);
    this.show_tab3 = this.show_tabs_ext;
    this.show_tab4 = this.show_tabs_ext;
    this.show_tab5 = this.show_tabs_ext;
  }
};
</script>

<style>
</style>
