import PaymentAPI from '../../api/PaymentApi';


const state = {
    credit_card: null,
    cvv: null,
    expiry: null,
    fee: null
}

const mutations = {
    CREDIT_CARD(state, form) {
        state.credit_card = form
    },
    CVV(state, form) {
        state.cvv = form
    },
    EXPIRY(state, form) {
        state.expiry = form
    },
    FEES(state, charges) {
        state.fee = charges
    },
    CLEAR_DATA(state) {
        state.credit_card = null
        state.cvv = null
        state.expiry = null
        state.fee = null
    }
}

var actions = {
    VALIDATE_CREDIT_CARD(context, creditCard) {
        return new Promise((resolve, reject) => {
            new PaymentAPI(context.rootState.user_session.token).creditCard(creditCard, (credit, err) => {
                if (!err) {
                    context.commit('CREDIT_CARD', credit)
                    resolve()
                } else {
                    console.log(JSON.stringify(err))
                    reject()
                }
            })
        })
    },
    VALIDATE_CVV(context, cvv) {
        return new Promise((resolve, reject) => {
            new PaymentAPI(context.rootState.user_session.token).cvv(cvv, (credit, err) => {
                if (!err) {
                    context.commit('CVV', credit)
                    resolve()
                } else {
                    console.log(JSON.stringify(err))
                    reject()
                }
            })
        })
    },
    VALIDATE_EXPIRATION_DATE(context, expirationDate) {
        return new Promise((resolve, reject) => {
            new PaymentAPI(context.rootState.user_session.token).expirationDate(expirationDate, (credit, err) => {
                if (!err) {
                    context.commit('EXPIRY', credit)
                    resolve()
                } else {
                    console.log(JSON.stringify(err))
                    reject()
                }
            })
        })
    },
    GET_FEES(context, fees) {
        return new Promise((resolve, reject) => {
            console.log("entering mutation GET_FEES: " + JSON.stringify(fees))
            new PaymentAPI(context.rootState.user_session.token).feesDetails(fees, (fee, err) => {
                if (!err) {
                    console.log("returning mutation GET_FEES: " + JSON.stringify(fee))
                    context.commit('FEES', fee)
                    resolve(fee)
                } else {
                    console.log(JSON.stringify(err))
                    reject(err)
                }
            })
        })
    },
    SAVE_PAYMENT(context, fullDetails) {
        return new Promise((resolve, reject) => {
        console.log("save payment store actions" + JSON.stringify(fullDetails))

        new PaymentAPI(context.rootState.user_session.token).savePayment(fullDetails, (details, err) => {
            if (!err) {
                console.log('actions save licenses: ' + JSON.stringify(details))
                resolve(details)
            } else {
                console.log("actions save licenses error: " + JSON.stringify(err))
                reject(err)
            }
        })
    })
    },
    BILLS_PAYMENT(context, fullDetails) {
        console.log("bill payment store actions" + JSON.stringify(fullDetails))
        return new Promise((resolve, reject) => {
        new PaymentAPI(context.rootState.user_session.token).feesDetails(fullDetails, (details, err) => {
            if (!err) {
                console.log('actions save licenses: ' + JSON.stringify(details))
                resolve(details)
            } else {
                console.log("actions save licenses error: " + JSON.stringify(err))
                reject(err)
            }
        })
    })
    }

}

export default {
    state,
    mutations,
    actions
}