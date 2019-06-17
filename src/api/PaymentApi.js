import axios from 'axios';

// axios.defaults.headers.common['access_token'] = store.state.user

export default class PaymentAPI {
    constructor(token) {
        // axios.defaults.baseURL = 'https://fda-services-payments.herokuapp.com';
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        // axios.defaults.headers.common['access_token'] = token;
    }

    creditCard(creditCardNumber, cb) {
        axios.post('payments/creditcard/validate/card', {
            cardNumber: creditCardNumber
        }).then((result) => {
            cb(result.data.model)
        }).catch(err => {
            console.log('creditCard err: ' + JSON.stringify(err))
            cb(null, err)
        })
    }

    cvv(cvvNumber, cb) {
        axios.post('payments/creditcard/validate/cvv', {
            cvv: cvvNumber
        }).then((result) => {
            cb(result.data.model)
        }).catch(err => {
            console.log('##########error save cvv: ' + JSON.stringify(err))
            cb(null, err)
        })
    }

    expirationDate(expiryDate, cb) {
        axios.post('payments/creditcard/validate/expiry', {
            expiry: expiryDate
        }).then((result) => {
            cb(result.data.model)
        }).catch(err => {
            console.log('##########error save expirationDate: ' + JSON.stringify(err))
            cb(null, err)
        })
    }

    feesDetails(details, cb) {
        axios.post('payments/rates/compute', {
            productType: details.productType,
            primaryActivity: details.primaryActivity,
            declaredCapital: details.declaredCapital,
            appType: details.appType
        }).then((result) => {
            cb(result.data.model)
        }).catch(err => {
            console.log("feesDetails error return api: " + JSON.stringify(err))
            cb(null, err)
        })
    }

    getCertificateFees(details) {
        return axios.post("payments/fees/certificate", details)
    }

    savePayment(fullDetails, cb) {
        axios.post('payments/', {
            card_details: fullDetails.card_details,
            payment_details: fullDetails.payment_details,
            transaction_details: fullDetails.transaction_details
        }).then((result) => {
            cb(result.data.model)
        }).catch(err => {
            console.log('##########error save savePayment: ' + JSON.stringify(err))
            cb(null, err)
        })
    }

    saveTransaction(transaction) {
        console.log("save transaction api: " + JSON.stringify(transaction))
        return axios.post('payments/transactions', transaction)
    }

    computePayments(data, cb) {
        console.log("data compute payments: ")
        return axios.post('payments/rates/compute/case_no/' + data.case_no, data.details)
    }

}