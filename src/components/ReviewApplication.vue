<template>
    <div>
        <v-dialog
            v-model="show"
            scrollable max-width="" 
            persistent :overlay="false"
            transition="dialog-transition">
            <v-card>
                <v-toolbar class="title-bg headline white--text" dark>
                    <span class="headline font-weight-light">Case No.: {{case_details.case_no}} ({{getAppType(case_details.application_type)}})</span>
                    <!-- <v-btn color="primary">accept & submit</v-btn> -->
                    <v-spacer></v-spacer>
                    <!-- <v-btn outline color="primary" @click="close()">Cancel</v-btn> -->
                    
                    <v-btn flat icon color="primary" @click="close()">
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-toolbar>
                <v-card-text>
                    <v-layout row wrap>
                        <v-scroll-x-transition>
                            <v-flex v-bind="{ [`xs${claimed?7:12}`]: true }">
                                <v-container 
                                    grid-list-md 
                                    id="summary-layout" 
                                    :style="claimed?'max-height: 500px':''" 
                                    class="scroll-y">
                                    <v-layout row wrap v-scroll:#summary-layout>
                                        
                                        <!-- Activities -->
                                        <v-flex v-bind="{ [`xs${claimed?12:6}`]: true }">
                                            <v-card>
                                                <v-card-title class="title-bg title white--text" dark>
                                                    Activities
                                                    <v-spacer></v-spacer>
                                                    <v-btn @click="show_tab1=!show_tab1" flat icon>
                                                        <v-icon>{{show_tab1?'expand_less':'expand_more'}}</v-icon>
                                                    </v-btn>
                                                </v-card-title>
                                                <v-divider v-show="show_tab1"></v-divider>
                                                <v-card-text v-show="show_tab1">
                                                    
                                                    <v-flex xs12 v-if="!case_details.activities || case_details.activities.length <= 0" class="subheading">
                                                        <i>No Activities</i>
                                                    </v-flex>
                                                    <v-flex xs12 
                                                        v-else
                                                        v-for="(item, index) in case_details.activities" 
                                                        :key="`a${index}`">
                                                        <span class="subheading" ma-1>
                                                            <span class="font-weight-bold">{{
                                                                getAdminUser(item.assigned_user).last_name ||
                                                                (getClientUser(item.assigned_user).name.last ? 'Client' : "")
                                                            }}/{{
                                                                getTask(case_details.case_type, item.task_id).name
                                                            }} ({{
                                                                getActivityStatus(item.status)
                                                            }})</span> - <i>{{
                                                                formatDate(item.date_completed, {month: '2-digit', day: '2-digit', year: '2-digit'})
                                                            }}</i>
                                                        </span>
                                                        <p class="body-1" style="text-indent: 50px;">{{item.remarks}}</p>
                                                        <p style="text-indent: 50px;" v-if="item.files && item.files.length > 0">
                                                            <span class="body-2">Attachment(s): </span>
                                                            <span class="body-1">
                                                                <template v-for="(file, i) in item.files">
                                                                    <a :href="file.location" :key="`f${i}`">{{file.originalname}}</a> / 
                                                                </template>
                                                            </span>
                                                        </p>
                                                        <v-divider></v-divider>
                                                    </v-flex>
                                                </v-card-text>
                                            </v-card>
                                        </v-flex>

                                        <!-- Payments Summary -->
                                        <v-flex v-bind="{ [`xs${claimed?12:6}`]: true }">
                                            <v-card>
                                                <v-card-title class="title-bg title white--text" dark>
                                                    Payments Summary
                                                    <v-spacer></v-spacer>
                                                    <v-btn @click="show_tab2=!show_tab2" flat icon>
                                                        <v-icon>{{show_tab2?'expand_less':'expand_more'}}</v-icon>
                                                    </v-btn>
                                                </v-card-title>
                                                <v-divider v-show="show_tab2"></v-divider>
                                                <v-card-text v-show="show_tab2">
                                                    <v-layout row wrap>
                                                        <v-flex xs12 class="body-2">
                                                            Payment Status: <v-chip class="body-2 font-weight-bold" style="float: right" label :color="getPaymentStatusColor(case_details.payment_status)" text-color="white">{{getPaymentStatus(case_details.payment_status)}}</v-chip>
                                                        </v-flex>
                                                        <v-flex xs12 v-if="case_details.payment_status">
                                                            Date of Last Payment: <span style="float: right">{{formatDate(case_details.payment_date)}}</span>
                                                        </v-flex>
                                                        <v-flex xs12>
                                                            <v-divider></v-divider>
                                                        </v-flex>
                                                        <v-flex xs12>
                                                            Application Fee: <span style="float: right">₱ {{numberWithCommas(charges.fee)}}</span>
                                                        </v-flex>
                                                        <v-flex xs12>
                                                            No. of year(s) applied: <span style="float: right">{{charges.yearsApplied}} years</span>
                                                        </v-flex>
                                                        <v-flex xs12>
                                                            Surcharge: <span style="float: right">₱ {{numberWithCommas(charges.surcharge)}}</span>
                                                        </v-flex>
                                                        <v-flex xs12>
                                                            Legal Research Fund(LRF): <span style="float: right">₱ {{numberWithCommas(charges.lrf)}}</span>
                                                        </v-flex>
                                                        <v-flex xs12>
                                                            <v-divider></v-divider>
                                                        </v-flex>
                                                        <v-flex xs12 class="body-2 font-weight-bold">
                                                            Total Payment: <span style="float: right">₱ {{numberWithCommas(charges.total)}}</span>
                                                        </v-flex>
                                                        <template v-if="history_transactions && history_transactions.length > 0">
                                                            <v-flex xs12>
                                                                <v-divider></v-divider>
                                                            </v-flex>
                                                            <v-flex xs12 class="body-2">
                                                                Transaction history
                                                            </v-flex>
                                                            <v-flex xs12 v-for="(item, index) in history_transactions" :key="`e${index}`">
                                                                <span class="body-1">{{getModeOfPayments(item.payment_details.mode_of_payment)}}</span> - 
                                                                <i class="caption">
                                                                    {{
                                                                        formatDate(item.date_created, {
                                                                            month: "2-digit", 
                                                                            day: "2-digit",
                                                                            year: "2-digit"
                                                                        })
                                                                    }}
                                                                </i> 
                                                                <span class="body-1" style="float: right">₱ {{numberWithCommas(item.payment_details.total_amount)}}</span>
                                                            </v-flex>
                                                            <v-flex xs12 class="body-2 font-weight-bold">
                                                                Total Amount Paid: <span style="float: right">₱ {{numberWithCommas(total_amount_paid)}}</span>
                                                            </v-flex>
                                                            <v-flex xs12>
                                                                <v-divider></v-divider>
                                                            </v-flex>
                                                            <v-flex xs12 class="body-2 font-weight-bold">
                                                                Total Remaining Balance: <span style="float: right">₱ {{numberWithCommas(current_remaining_balance)}}</span>
                                                            </v-flex>
                                                        </template>
                                                    </v-layout>
                                                </v-card-text>
                                            </v-card>
                                        </v-flex>
                                        
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

                    <!-- Establishment Address -->
                    <!-- <v-flex v-bind="{ [`xs${claimed?12:4}`]: true }">
                      <v-card>
                        <v-card-title class="title-bg title white--text" dark>Establishment Address</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text>
                          <v-layout
                            row
                            wrap
                            v-for="(item, index) in form_details.address_list"
                            :key="`b${index}`"
                          >
                            <v-flex xs12>
                              <b>Address #{{index+1}}</b>
                            </v-flex>
                            <v-flex xs12>
                              <b>Type:</b>
                              {{item.type}}
                            </v-flex>
                            <v-flex xs12>
                              <b>Address:</b>
                              {{item.address}}
                            </v-flex>
                            <v-flex xs12>
                              <b>Region:</b>
                              {{getRegionName(item.region)}}
                            </v-flex>
                            <v-flex xs12>
                              <b>Province:</b>
                              {{getProvinceName(item.province)}}
                            </v-flex>
                            <v-flex xs12>
                              <b>City:</b>
                              {{getCityName(item.city)}}
                            </v-flex>
                            <v-flex xs12>
                              <b>Zip Code:</b>
                              {{item.zipcode}}
                            </v-flex>
                            <v-flex xs12>
                              <b>Latitude:</b>
                              {{item.location.lat}}
                            </v-flex>
                            <v-flex xs12>
                              <b>Longitude:</b>
                              {{item.location.lng}}
                            </v-flex>
                            <v-flex xs12>
                              <v-divider></v-divider>
                            </v-flex>
                            <v-flex xs12>
                        <address-map
                        :city="item.city"
                        :province="item.province"
                        :region="item.region"
                        :edit="true"
                        @pin="setCoordinates"
                        ></address-map>
                    </v-flex>
                          </v-layout>
                        </v-card-text>
                      </v-card>
                    </v-flex> -->

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

                                        <!-- Documents -->
                                        <v-flex xs12>
                                            <v-card>
                                                <v-card-title class="title-bg title white--text" dark>
                                                    Uploaded Documents
                                                    <v-spacer></v-spacer>
                                                    <v-btn @click="show_tab9=!show_tab9" flat icon>
                                                        <v-icon>{{show_tab9?'expand_less':'expand_more'}}</v-icon>
                                                    </v-btn>
                                                </v-card-title>
                                                <v-divider v-show="show_tab9"></v-divider>
                                                <v-card-text v-show="show_tab9">
                                                    <v-layout row wrap>
                                                        <!-- {{form_details.uploaded_files}} -->
                                                        <v-flex v-bind="{ [`xs${claimed?6:3}`]: true }"
                                                            v-for="(item, index) in form_details.uploaded_files" 
                                                            :key="`d${index}`" pa-2>
                                                            <v-card max-width="200" @click="viewFile(item.location)" style="cursor:zoom-in">
                                                                <v-toolbar dark color="fdaGreen"
                                                                    style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)">
                                                                    <span class="text-truncate">{{item.originalname}}</span>
                                                                </v-toolbar>
                                                                <v-card-text>
                                                                    <v-layout row wrap align-center justify-center ma-0>
                                                                        <v-img
                                                                            v-if="item.mimetype !== 'application/pdf'"
                                                                            :src="item.location"
                                                                            class="grey lighten-2"
                                                                            max-height="200"
                                                                            max-width="100"
                                                                            contain>
                                                                            <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
                                                                                <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                                                            </v-layout>
                                                                        </v-img>
                                                                        <div v-else>
                                                                            <pdf :src="item.location"></pdf>
                                                                        </div>
                                                                    </v-layout>
                                                                </v-card-text>
                                                            </v-card>
                                                        </v-flex>
                                                    </v-layout>
                                                </v-card-text>
                                            </v-card>
                                        </v-flex>

                                    </v-layout>
                                </v-container>
                            </v-flex>
                        </v-scroll-x-transition>
                        <v-scroll-x-reverse-transition>
                            <v-flex xs4 ml-5 v-if="claimed">
                                <evaluation-form></evaluation-form>
                            </v-flex>
                        </v-scroll-x-reverse-transition>
                    </v-layout>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions v-if="for_unassigned">
                    <v-btn 
                        color="primary" 
                        @click="show_confirmation=true" 
                        :loading="loading" 
                        block>
                        CLAIM <v-icon>bookmark</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog
            v-model="show_confirmation"
            max-width="300px"
            height="300px"
            persistent
            transition="dialog-transition">
            <v-card>
                <v-toolbar
                    height="80px"
                    color="fdaGreen"
                    dark class="headline"
                    style="background: linear-gradient(45deg, #104B2A 0%, #b5c25a 100%)">
                    Confirmation
                </v-toolbar>
                <v-card-text>
                    Do you want to claim an application with case no.: <b>{{case_details.case_no}}</b> ?
                </v-card-text>
                <v-card-actions>
                <v-btn
                    class="font-weight-light"
                    color="error"
                    flat :disabled="loading"
                    @click="show_confirmation=false"
                >Cancel</v-btn>
                <v-spacer></v-spacer>
                <v-btn class="font-weight-light" color="success" :loading="loading" @click="claim">Continue</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import EvaluationForm from "./EvaluationForm";
import pdf from "vue-pdf";
import AddressMap from "./AddressMap";

export default {
  components: {
    EvaluationForm,
    pdf,
    AddressMap
  },
  data() {
    return {
      show_tab1: false, //General Info
      show_tab2: false, //Establishment Info
      show_tab3: false, //Product Line
      show_tab4: false, //Establishment Address
      show_tab5: false, //Authorized Officer
      show_tab6: false, //Qualified Personnel
      show_tab7: false, //Payments Summary
      show_tab8: false, //Documents
      show_tab9: false, //Compliance Documents
      show_tab10: false, //Activities
      loading: false,
      show_confirmation: false
    };
  },
  computed: {
    show() {
      return this.$store.state.case.review;
    },
    claimed() {
      if (this.$store.state.case.review_access === 1) {
        if (this.is_payment) this.show_tabs(false, "show_tab2");
        else this.show_tabs(false, "show_tab1");
      } else this.show_tabs(true);
      return this.$store.state.case.review_access === 1;
    },
    for_unassigned() {
      return this.$store.state.case.review_access === 0;
    },
    case_details() {
      return this.$store.state.case.case_details;
    },
    form_details() {
      return this.$store.state.case.form_details;
    },
    charges() {
      return this.$store.state.payments.fee || {};
    },
    history_transactions() {
      var history = this.$store.state.payments.history_transactions;
      if (!history) return [];
      var hist_trans = [];
      history.forEach(hist => {
        if (hist.payment_details.status !== 0) hist_trans.push(hist);
      });
      return hist_trans;
    },
    total_amount_paid() {
      var total = 0;
      this.history_transactions.forEach(trans => {
        total += trans.payment_details.total_amount;
      });
      return total;
    },
    current_remaining_balance() {
      return this.charges.total - this.total_amount_paid;
    },
    is_payment() {
      var task = this.getTask(
        this.case_details.case_type,
        this.case_details.current_task
      );
      return task.start_process && this.case_details.payment_status !== 2;
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.claimed) {
        if (this.is_payment) this.show_tabs(false, "show_tab2");
        else this.show_tabs(false, "show_tab1");
      } else this.show_tabs(true);
      this.$store.dispatch("CHECK_REVIEW_ACCESS");

    },
    claim() {
      this.loading = true;
      this.$store
        .dispatch("CLAIM", this.case_details)
        .then(result => {
          this.$notify({
            message:
              "Successfully claimed an application with case no.: " +
              this.case_details.case_no,
            icon: "check_circle",
            color: "success"
          });

          this.show_confirmation = false;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          console.log("err claim: ", err);
          this.$notifyError(err);
        });
    },
    close() {
      this.$store.commit("CLOSE_REVIEW");
    },
     setCoordinates(coordinates){
       console.log("goes here: " + JSON.stringify(coordinates))
            this.form_details.address_list.location = coordinates;
            // console.log("coordinates details: " + JSON.stringify(coordinates))
            // coordinates = this.form_details.address_list.location
        },
    show_tabs(is_all, except) {
      this.show_tab1 = is_all;
      this.show_tab2 = is_all;
      this.show_tab3 = is_all;
      this.show_tab4 = is_all;
      this.show_tab5 = is_all;
      this.show_tab6 = is_all;
      this.show_tab7 = is_all;
      this.show_tab8 = is_all;
      this.show_tab9 = is_all;
      this.show_tab10 = is_all;

      if (except) this[except] = !is_all;
    },
    viewFile(url) {
      window.open(url, "_blank");
    }
  }
};
</script>

<style>
.title-bg {
  background: linear-gradient(45deg, #104b2a 0%, #b5c25a 100%);
  padding: 0 0 0 15px;
}
</style>
