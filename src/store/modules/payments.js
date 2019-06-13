import PaymentAPI from '../../api/PaymentApi';

function initialState() {
    return {
        credit_card: null,
        cvv: null,
        expiry: null,
        fee: {},
        history_transactions: []
    }
}

const state = initialState()

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
    SET_HISTORY_TRANSACTION(state, transaction) {
        state.history_transactions = transaction
    },
    CLEAR_PAYMENTS(state) {
        state.credit_card = null
        state.cvv = null
        state.expiry = null
        state.fee = null
        state.history_transactions = []
    },

    RESET(state) {
        const s = initialState()
        Object.keys(s).forEach(key => {
            state[key] = s[key]
        })
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
    GET_CERTIFICATE_FEES(context, details) {
        return new Promise((resolve, reject) => {
            new PaymentAPI(context.rootState.user_session.token)
                .getCertificateFees(details)
                .then((result) => {
                    console.log('result.data :', result.data);
                    if (result.data.success) {
                        context.commit('FEES', result.data.model.fees)
                        context.commit('SET_HISTORY_TRANSACTION', result.data.model.transactions)
                        resolve(result.data.model)
                    } else {
                        reject(result.data.errors)
                    }
                }).catch((err) => {
                    console.log(JSON.stringify(err))
                    reject(err)
                });
        })
    },
    SAVE_PAYMENT(context, fullDetails) {
        return new Promise((resolve, reject) => {
            new PaymentAPI(context.rootState.user_session.token).savePayment(fullDetails, (details, err) => {
                if (!err) {
                    resolve(details)
                } else {
                    console.log("actions save licenses error: " + JSON.stringify(err))
                    reject(err)
                }
            })
        })
    },
    BILLS_PAYMENT(context, fullDetails) {
        return new Promise((resolve, reject) => {
            new PaymentAPI(context.rootState.user_session.token).feesDetails(fullDetails, (details, err) => {
                if (!err) {
                    resolve(details)
                } else {
                    console.log("actions save licenses error: " + JSON.stringify(err))
                    reject(err)
                }
            })
        })
    },
    SAVE_TRANSACTION(context, transaction) {
        return new Promise((resolve, reject) => {
            console.log('transaction :', transaction);
            new PaymentAPI(context.rootState.user_session.token)
                .saveTransaction(transaction)
                .then((result) => {
                    if (result.data.success) {
                        context.commit('SET_HISTORY_TRANSACTION', result.data.model.transactions_history)
                        resolve(result.data.model)
                    } else {
                        reject(result.data.errors)
                    }
                }).catch((err) => {
                    reject(err)
                });
        })
    },
    GET_COMPUTED_FEES(context, data) {
        return new Promise((resolve, reject) => {
            new PaymentAPI(context.rootState.user_session.token).computePayments(data)
                .then((result) => {
                    if (result.data.success) {
                        context.commit('FEES', result.data.model.fees)
                        context.commit('SET_HISTORY_TRANSACTION', result.data.model.transactions)
                        resolve(result.data.model)
                    } else {
                        reject(result.data.errors)
                    }
                }).catch((err) => {
                    console.log(JSON.stringify(err))
                    reject(err)
                });
        })
    },
}

export default {
    state,
    mutations,
    actions
}