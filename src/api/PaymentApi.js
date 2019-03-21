import axios from 'axios';

// axios.defaults.headers.common['access_token'] = store.state.user

export default class PaymentAPI {
    constructor(token) {
        // axios.defaults.baseURL = 'https://fda-services-payments.herokuapp.com';
        axios.defaults.baseURL = 'https://fda-services.herokuapp.com/v1.0/';
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        // axios.defaults.headers.common['access_token'] = token;
    }

    creditCard(creditCardNumber, cb) {
        axios.post('payments/creditcard/validate/card', {
            cardNumber: creditCardNumber
        }).then((result) => {
            cb(result.data.model)
        }).catch(err => {
            console.log('##########error save creditCard: ' + JSON.stringify(err))
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
        console.log("feesDetails entering api: " + JSON.stringify(details))
        axios.post('payments/rates/compute', {
            productType: details.productType,
            primaryActivity: details.primaryActivity,
            declaredCapital: details.declaredCapital,
            appType: details.appType
        }).then((result) => {
            console.log("feesDetails data return api: " + JSON.stringify(result.data.model))
            cb(result.data.model)
        }).catch(err => {
            console.log("feesDetails error return api: " + JSON.stringify(err))
            cb(null, err)
        })
    }

    savePayment(fullDetails, cb) {
        console.log("save payments details: " + JSON.stringify(fullDetails))
        axios.post('payments/', {
            card_details: fullDetails.card_details,
            payment_details: fullDetails.payment_details,
            transaction_details: fullDetails.transaction_details
        }).then((result) => {
            console.log("post save payment details: " + JSON.stringify(result.data.model))
            cb(result.data.model)
        }).catch(err => {
            console.log('##########error save savePayment: ' + JSON.stringify(err))
            cb(null, err)
        })
    }



}