import LicenseAPI from '@/api/LicenseAPI';
import AccountAPI from '@/api/AccountAPI';
import CoreAPI from '../../api/CoreAPI';

const state = {
    primary: null,
    batch: null,
    prints: null
}

const mutations = {
    SET_PRIMARY(state, primary) {
        state.primary = primary;
    },
    SET_BATCH(state, batch) {
        state.batch = batch;
    },
    SET_PRINTS(state, prints) {
        state.prints = prints;
    }
}

var actions = {
    GET_PRIMARY(context) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                new CoreAPI(context.rootState.user_session.token).getPrimary((err, primary) => {
                    if (!err) {
                        console.log('primary :', primary.length);
                        context.commit('SET_PRIMARY', primary);
                        resolve(primary)
                    } else {
                        console.log('GET PRIMARY ERR :', err)
                        reject(err)
                    }
                })
            })
        }
    },
    GET_BATCH(context) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                new CoreAPI(context.rootState.user_session.token).getBatch((err, batch) => {
                    if (!err) {
                        console.log('batch :', batch.length);
                        context.commit('SET_BATCH', batch);
                        resolve(batch)
                    } else {
                        console.log('GET BATCH ERR :', err)
                        reject(err)
                    }
                })
            })
        }
    },
    ADD_BATCH(context, batch) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                new CoreAPI(context.rootState.user_session.token).addBatch(batch, (err, batch) => {
                    if (!err) {
                        console.log('batch :', JSON.stringify(batch));
                        resolve(batch)
                    } else {
                        console.log('GET BATCH ERR :', err)
                        reject(err)
                    }
                })
            })
        }
    },
    GET_PRINTS(context) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                new CoreAPI(context.rootState.user_session.token).getPrints((err, prints) => {
                    if (!err) {
                        console.log('prints :', prints.length);
                        context.commit('SET_PRINTS', prints);
                        resolve(prints)
                    } else {
                        console.log('GET PRINTS ERR :', err)
                        reject(err)
                    }
                })
            })
        }
    },
    RE_PRINT(context, params) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                new CoreAPI(context.rootState.user_session.token).rePrint(params, (err, prints) => {
                    if (!err) {
                        resolve(prints)
                    } else {
                        console.log('RE PRINT ERR :', err)
                        reject(err)
                    }
                })
            })
        }
    }
}

export default {
    state,
    mutations,
    actions
}