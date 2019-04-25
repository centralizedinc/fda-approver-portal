import LicenseAPI from '@/api/LicenseAPI';
import CoreAPI from '../../api/CoreAPI';

function initialState() {
    return {
        primary: null,
        batch: null,
        prints: [],
        id_types: null,
        designations: null
    }
}

const state = initialState()

const mutations = {
    SET_PRIMARY(state, primary) {
        state.primary = primary;
    },
    SET_BATCH(state, batch) {
        state.batch = batch;
    },
    SET_PRINTS(state, prints) {
        state.prints = prints;
    },
    SET_ID_TYPE(state, id_types) {
        state.id_types = id_types;
    },
    SET_DESIGNATION(state, designations) {
        state.designations = designations;
    },

    RESET(state) {
        const s = initialState()
        Object.keys(s).forEach(key => {
            state[key] = s[key]
        })
    }
}

var actions = {
    GET_PRIMARY(context) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                new CoreAPI(context.rootState.user_session.token).getPrimary((err, primary) => {
                    if (!err) {
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
                        resolve(batch)
                    } else {
                        console.log('GET BATCH ERR :', err)
                        reject(err)
                    }
                })
            })
        }
    },
    GET_PRINTS(context, refresh) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                if (refresh || !context.state.prints || context.state.prints.length === 0) {
                    new CoreAPI(context.rootState.user_session.token).getPrints((err, prints) => {
                        if (!err) {
                            context.commit('SET_PRINTS', prints);
                            resolve(prints)
                        } else {
                            console.log('GET PRINTS ERR :', err)
                            reject(err)
                        }
                    })
                } else resolve(context.state.prints)
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
    },
    GET_ID_TYPES(context, refresh) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                if (refresh || !context.state.id_types) {
                    new CoreAPI(context.rootState.user_session.token)
                        .getIdType()
                        .then((result) => {
                            if (result.data.success) {
                                context.commit('SET_ID_TYPE', result.data.model);
                                resolve(result.data.model)
                            } else {
                                reject(result.data.errors)
                            }
                        }).catch((err) => {
                            console.log('GET_ID_TYPE ERR :', err)
                            reject(err)
                        });
                } else {
                    resolve(context.state.id_types)
                }
            })
        }
    },
    GET_DESIGNATIONS(context, refresh) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                if (refresh || !context.state.id_types) {
                    new CoreAPI(context.rootState.user_session.token)
                        .getDesignation()
                        .then((result) => {
                            if (result.data.success) {
                                context.commit('SET_DESIGNATION', result.data.model);
                                resolve(result.data.model)
                            } else {
                                reject(result.data.errors)
                            }
                        }).catch((err) => {
                            console.log('GET_DESIGNATION ERR :', err)
                            reject(err)
                        });
                } else {
                    resolve(context.state.designations);
                }
            })
        }
    }
}

export default {
    state,
    mutations,
    actions
}