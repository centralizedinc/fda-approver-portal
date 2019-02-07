<template>
    <v-container grid-list-xl>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title primary-title>
                        THIS IS TO TEST THE PDF GENERATOR
                    </v-card-title>
                    <v-card-text>
                        
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="success" @click="generatePDF">Generate PDF</v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import * as PDFGenerator from "./PDF/PDF.js";
export default {
  methods: {
    generatePDF() {
      PDFGenerator.generatePDF(null, { fee: 0, lrf: 0 });
    }
  }
};
</script>

<style>
</style>
