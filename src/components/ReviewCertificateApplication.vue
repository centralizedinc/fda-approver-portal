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
                            <b>Application Type:</b> {{getAppType(form_details.general_info.application_type, 1)}}
                        </v-flex>
                        <template v-if="form_details.general_info.application_type in [1, 2]">
                            <v-flex xs12>
                                <v-divider></v-divider>
                            </v-flex>
                            <v-flex xs12>
                                <b>Product Certificate:</b> {{form_details.general_info.for_ammendment_renewal.product_certificate}}
                            </v-flex>
                            <v-flex xs12>
                                <v-divider></v-divider>
                            </v-flex>
                            <v-flex xs12>
                                <b>Registration:</b> {{form_details.general_info.for_ammendment_renewal.registration}}
                            </v-flex>
                            <v-flex xs12>
                                <v-divider></v-divider>
                            </v-flex>
                            <v-flex xs12>
                                <b>Date Issued:</b> {{formatDate(form_details.general_info.for_ammendment_renewal.date_issued)}}
                            </v-flex>
                            <v-flex xs12>
                                <v-divider></v-divider>
                            </v-flex>
                            <v-flex xs12>
                                <b>Date Validity:</b> {{formatDate(form_details.general_info.for_ammendment_renewal.date_validity)}}
                            </v-flex>
                        </template>
                        <template v-else-if="form_details.general_info.application_type === 3">
                            <v-flex xs12>
                                <v-divider></v-divider>
                            </v-flex>
                            <v-flex xs12>
                                <b>Document Tracker:</b> {{form_details.general_info.for_reapplication.doctracker_no}}
                            </v-flex>
                            <v-flex xs12>
                                <v-divider></v-divider>
                            </v-flex>
                            <v-flex xs12>
                                <b>Email:</b> {{form_details.general_info.for_reapplication.email}}
                            </v-flex>
                        </template>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>

        <!-- Product Information -->
        <v-flex v-bind="{ [`xs${claimed?12:4}`]: true }">
            <v-card>
                <v-card-title class="title-bg title white--text" dark>
                    Product Information
                    <v-spacer></v-spacer>
                    <v-btn @click="show_tab4=!show_tab4" flat icon>
                        <v-icon>{{show_tab4?'expand_less':'expand_more'}}</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider v-show="show_tab4"></v-divider>
                <v-card-text v-show="show_tab4">
                    <v-layout row wrap>
                        <v-flex xs12>
                            <b>Type:</b> {{form_details.food_product.type}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Categorization:</b> {{form_details.food_product.categorization}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Brand Name:</b> {{form_details.food_product.brand_name}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Product Name:</b> {{form_details.food_product.product_name}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Company:</b> {{form_details.food_product.company}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Address:</b> {{form_details.food_product.address}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>License Number:</b> {{form_details.food_product.license_no}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>License Validity:</b> {{formatDate(form_details.food_product.license_validity)}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Year/s Applied:</b> {{form_details.food_product.years_applied}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Contacts:</b> {{form_details.food_product.contacts.join(',')}}
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
                    <v-btn @click="show_tab5=!show_tab5" flat icon>
                        <v-icon>{{show_tab5?'expand_less':'expand_more'}}</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider v-show="show_tab5"></v-divider>
                <v-card-text v-show="show_tab5">
                    <v-layout row wrap>
                        <v-flex xs12>
                            <b>Activity:</b> {{form_details.establisment_info.activity}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Type:</b> {{form_details.establisment_info.type}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Origin Country:</b> {{form_details.establisment_info.origin_country}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Directly Source:</b> {{form_details.establisment_info.directly_source}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Manufacturer Name:</b> {{form_details.establisment_info.manufacturer_name}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Manufacturer Address:</b> {{form_details.establisment_info.manufacturer_address}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Supplier Name:</b> {{form_details.establisment_info.supplier_name}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Supplier Address:</b> {{form_details.establisment_info.supplier_address}}
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>

        <!-- Ingredients -->
        <!-- Ano yung mga fields sa loob ng array -->
        <v-flex v-bind="{ [`xs${claimed?12:4}`]: true }">
            <v-card>
                <v-card-title class="title-bg title white--text" dark>
                    Ingredients
                    <v-spacer></v-spacer>
                    <v-btn @click="show_tab6=!show_tab6" flat icon>
                        <v-icon>{{show_tab6?'expand_less':'expand_more'}}</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider v-show="show_tab6"></v-divider>
                <v-card-text v-show="show_tab6">
                    <v-layout row wrap>
                        <v-flex xs12>
                            {{form_details.ingredients}}
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>

        <!-- Product Specification -->
        <!-- Pinagisa na rin ba yung mga fields na to -->
        <v-flex v-bind="{ [`xs${claimed?12:4}`]: true }">
            <v-card>
                <v-card-title class="title-bg title white--text" dark>
                    Product Specification
                    <v-spacer></v-spacer>
                    <v-btn @click="show_tab7=!show_tab7" flat icon>
                        <v-icon>{{show_tab7?'expand_less':'expand_more'}}</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider v-show="show_tab7"></v-divider>
                <v-card-text v-show="show_tab7">
                    <v-layout row wrap>
                        <v-flex xs12>
                            {{form_details.product_specification}}
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>

        <!-- Shelf -->
        <v-flex v-bind="{ [`xs${claimed?12:4}`]: true }">
            <v-card>
                <v-card-title class="title-bg title white--text" dark>
                    Shelf
                    <v-spacer></v-spacer>
                    <v-btn @click="show_tab8=!show_tab8" flat icon>
                        <v-icon>{{show_tab8?'expand_less':'expand_more'}}</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider v-show="show_tab8"></v-divider>
                <v-card-text v-show="show_tab8">
                    <v-layout row wrap>
                        <v-flex xs12>
                            <b>Packaging Material:</b> {{form_details.shelf.packaging_material}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Description:</b> {{form_details.shelf.description}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Storage Requirements:</b> {{form_details.shelf.storage_requirements}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Food Material:</b> {{form_details.shelf.food_material}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Allergen Source:</b> {{form_details.shelf.allergen_source}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Lot Code Interpretation:</b> {{form_details.shelf.lot_code_interpretation}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Date:</b> {{form_details.shelf.date}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>

        <!-- Nutrition Information -->
        <v-flex v-bind="{ [`xs${claimed?12:4}`]: true }">
            <v-card>
                <v-card-title class="title-bg title white--text" dark>
                    Nutrition Information
                    <v-spacer></v-spacer>
                    <v-btn @click="show_tab9=!show_tab9" flat icon>
                        <v-icon>{{show_tab9?'expand_less':'expand_more'}}</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider v-show="show_tab9"></v-divider>
                <v-card-text v-show="show_tab9">
                    <v-layout row wrap>
                        <v-flex xs12>
                            <b>Serving Size:</b> {{form_details.nutrition_info.serving_size}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Serving Per Pack:</b> {{form_details.nutrition_info.serving_per_pack}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Servings:</b> {{form_details.nutrition_info.servings}}
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>

        <!-- Claims -->
        <!-- Ano pa ba yung ibang fields -->
        <v-flex v-bind="{ [`xs${claimed?12:4}`]: true }">
            <v-card>
                <v-card-title class="title-bg title white--text" dark>
                    Claims
                    <v-spacer></v-spacer>
                    <v-btn @click="show_tab10=!show_tab10" flat icon>
                        <v-icon>{{show_tab10?'expand_less':'expand_more'}}</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider v-show="show_tab10"></v-divider>
                <v-card-text v-show="show_tab10">
                    <v-layout row wrap>
                        <template v-for="(item, index) in form_details.claims">
                            <v-flex xs12 :key="`a${index}`">
                                <b>Type:</b> {{item.type}}
                            </v-flex>
                            <v-flex xs12 :key="`b${index}`">
                                <v-divider></v-divider>
                            </v-flex>
                        </template>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>

        <!-- Documentary -->
        <v-flex v-bind="{ [`xs${claimed?12:4}`]: true }">
            <v-card>
                <v-card-title class="title-bg title white--text" dark>
                    Documentary
                    <v-spacer></v-spacer>
                    <v-btn @click="show_tab11=!show_tab11" flat icon>
                        <v-icon>{{show_tab11?'expand_less':'expand_more'}}</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider v-show="show_tab11"></v-divider>
                <v-card-text v-show="show_tab11">
                    <v-layout row wrap>
                        <v-flex xs12>
                            <b>Product Label Images:</b> {{form_details.documentary.product_label_images}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Commercial Product Images:</b> {{form_details.documentary.commercial_product_images}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>For Export:</b> {{form_details.documentary.for_export}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Purchase Request Notarized:</b> {{form_details.documentary.purchase_request_notarized}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Has Claims:</b> {{form_details.documentary.has_claims}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Substantiate Claims:</b> {{form_details.documentary.substantiate_claims}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Has on Label:</b> {{form_details.documentary.has_on_label}}
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-flex>

        <!-- Ammendment -->
        <v-flex v-bind="{ [`xs${claimed?12:4}`]: true }" v-if="form_details.general_info.application_type === 1">
            <v-card>
                <v-card-title class="title-bg title white--text" dark>
                    Ammendment
                    <v-spacer></v-spacer>
                    <v-btn @click="show_tab12=!show_tab12" flat icon>
                        <v-icon>{{show_tab12?'expand_less':'expand_more'}}</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider v-show="show_tab12"></v-divider>
                <v-card-text v-show="show_tab12">
                    <v-layout row wrap>
                        <v-flex xs12>
                            <b>Brand Name:</b> {{form_details.for_ammendment.brand_name}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Product Name:</b> {{form_details.for_ammendment.product_name}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Company Name:</b> {{form_details.for_ammendment.company_name}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Supplier Name:</b> {{form_details.for_ammendment.supplier_name}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Supplier Address:</b> {{form_details.for_ammendment.supplier_address}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Packaging Material:</b> {{form_details.for_ammendment.packaging_material}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Product Commercial:</b> {{form_details.for_ammendment.product_commercial}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Shelf Life:</b> {{form_details.for_ammendment.shelf_life}}
                        </v-flex>
                        <v-flex xs12>
                            <v-divider></v-divider>
                        </v-flex>
                        <v-flex xs12>
                            <b>Packaging Design:</b> {{form_details.for_ammendment.packaging_design}}
                        </v-flex>
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
        show_tab5: false,
        show_tab6: false,
        show_tab7: false,
        show_tab8: false,
        show_tab9: false,
        show_tab10: false,
        show_tab11: false,
        show_tab12: false
    };
  },
  created() {
    this.show_tab3 = this.show_tabs_ext;
    this.show_tab4 = this.show_tabs_ext;
    this.show_tab5 = this.show_tabs_ext;
    this.show_tab6 = this.show_tabs_ext;
    this.show_tab7 = this.show_tabs_ext;
    this.show_tab8 = this.show_tabs_ext;
    this.show_tab9 = this.show_tabs_ext;
    this.show_tab10 = this.show_tabs_ext;
    this.show_tab11 = this.show_tabs_ext;
    this.show_tab12 = this.show_tabs_ext;
  },
};
</script>

<style>
</style>
