"use strict";

import jsPDF from "jspdf";
import "jspdf-autotable";
import * as FDAImages from "./FDAImages";

export function generatePDF(form) {
    console.log("RATES: " + JSON.stringify(rates))
    let doc = new jsPDF();
    doc.addImage(FDAImages.doh_logo, "JPEG", 30, 15, 20, 20);
    doc.addImage(FDAImages.fda_logo, "JPEG", 160, 10, 30, 30);
    doc.setFont("times");
    doc.setFontStyle("normal");
    doc.text("Republic of the Philippines", 105, 20, null, null, "center");
    doc.text("Department of Health", 105, 27, null, null, "center");
    doc.text("Food And Drug Administration", 105, 33, null, null, "center");
    doc.text("Civic Drive, Filinvest Corporate City", 105, 39, null, null, "center");
    doc.text("Alabang, Muntilupa", 105, 45, null, null, "center");
    doc.setFontStyle("bold");
    doc.text("Order of Payment", 105, 55, null, null, "center");

    doc.text('General Information', 105, 65, null, null, 'center')
    doc.setFontStyle("normal");
    doc.text('Application Number:', 10, 75, null, null, 'left');
    doc.text('Product Center:', 10, 82, null, null, 'left');
    doc.text('Application Type:', 10, 89, null, null, 'left');
    doc.text('Primary Activity:', 10, 96, null, null, 'left');

    doc.setFontStyle("bold");
    doc.text('Establishment Information', 105, 106, null, null, 'center')
    doc.setFontStyle("normal");
    doc.text('Company Name:', 10, 113, null, null, 'left');
    doc.text('Owner:', 10, 120, null, null, 'left');
    doc.text('Declared Capital:', 10, 127, null, null, 'left');
    doc.text('Office Address:', 10, 134, null, null, 'left');

    doc.setFontStyle("bold");
    doc.text('Details of the Approving Authority', 105, 144, null, null, 'center')
    doc.setFontStyle("normal");
    doc.text('Fullname:', 10, 151, null, null, 'left');
    doc.text('Designation:', 10, 158, null, null, 'left');
    doc.text('Mailing Address:', 10, 165, null, null, 'left');

    doc.setFontStyle("bold");
    doc.text('Details of the Qalified Personnel', 105, 175, null, null, 'center')
    doc.setFontStyle("normal");
    doc.text('Fullname:', 10, 182, null, null, 'left');
    doc.text('Designation:', 10, 189, null, null, 'left');
    doc.text('TIN:', 10, 196, null, null, 'left');

    doc.text('Email:', 10, 203, null, null, 'left');
    doc.text('Govt ID:', 10, 210, null, null, 'left');

    doc.setFontStyle("bold");
    doc.text('Payment Details', 105, 220, null, null, 'center')
    doc.setFontStyle("normal");
    doc.text('Application Fee:', 10, 227, null, null, 'left');
    doc.text(('Php ' + rates.fee), 105, 227, null, null, 'right');
    doc.text('# of years applied:', 10, 234, null, null, 'left');
    doc.text('1', 105, 234, null, null, 'left');
    doc.text('Surcharge:', 10, 241, null, null, 'left');
    doc.text('Php 0.00', 105, 241, null, null, 'left');
    doc.text('Legal Research Fund (LRF):', 10, 248, null, null, 'left');
    doc.text(('Php ' + rates.lrf), 105, 248, null, null, 'right');
    doc.setTextColor('red');
    doc.setFontStyle("bold");
    doc.text('Total Payment Due:', 10, 255, null, null, 'left');

    doc.setTextColor('black');
    doc.text('Payment Instructions', 20, 265, null, null, 'left');
    doc.setFontStyle("normal");
    doc.text('1. Pay the specified amount via our payment channels', 10, 272, null, null, 'left');
    doc.text('2. Upload the receipt/confirmation', 10, 279, null, null, 'left');
    doc.text('3. Wait for your application to be processed', 10, 286, null, null, 'left');

    // doc.addJS('print({});');
    // doc.autoPrint()
    doc.save("order_of_payment_" + new Date() + ".pdf");
}