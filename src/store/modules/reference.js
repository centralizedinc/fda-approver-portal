import LicenseAPI from '@/api/LicenseAPI';
import CoreAPI from '../../api/CoreAPI';
import { resolve } from 'q';

function initialState() {
    return {
        primary: null,
        batch: null,
        prints: [],
        id_types: null,
        designations: null,
        company_activity: null,
        source_type: null,
        country_origin: null,
        food_type: null
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
    SET_COUNTRY_ORIGIN(state, details){
        state.country_origin = details
    },
    SET_COMPANY_ACTIVITY(state, activity){
        state.company_activity = activity
    },
    SET_SOURCE_TYPE(state, source_type){
        state.source_type = source_type
    },
    SET_FOOD_PRODUCT(state, food_type){
        state.food_type = food_type
    },
    SET_FOOD_CATEGORY(state, food_category){
        state.food_category = food_category
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
                new CoreAPI(context.rootState.user_session.token)
                    .addBatch(batch, (err, batch) => {
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
    },
    GET_COUNTRY_ORIGIN(context){
        return new Promise((resolve, reject) => {
            new CoreAPI(context.rootState.user_session.token).getCountryOrigin()
            .then((result) => {
                console.log('Retrieve data from country origin :', result.data);
                if(result.data.success){
                    context.commit('SET_COUNTRY_ORIGIN', result.data.model)
                    resolve(result.data.model)
                } else {
                    console.log('Country Origin Error :', result.data.errors);
                    reject(result.data.errors)
                }
            }).catch((err) => {
                console.log('Error in Retrieving data from country origin :', err);
                reject(err)
            });
        })
    },
    GET_COMPANY_ACTIVITY(context){
        return new Promise((resolve, reject) => {
            new CoreAPI(context.rootState.user_session.token).getCompanyActivity()
            .then((result) => {
                console.log('Retrieve data from activity :', result.data);
                if(result.data.success){
                    context.commit('SET_COMPANY_ACTIVITY', result.data.model)
                    resolve(result.data.model)
                } else {
                    console.log('Country Activity Error :', result.data.errors);
                    reject(result.data.errors)
                }
            }).catch((err) => {
                console.log('Error in Retrieving data from activity :', err);
                reject(err)
            });
        })
    },
    GET_SOURCE_TYPE(context){
        return new Promise((resolve, reject) => {
            new CoreAPI(context.rootState.user_session.token).getSourceType()
            .then((result) => {
                console.log('Retrieve data from source :', result.data);
                if(result.data.success){
                    context.commit('SET_SOURCE_TYPE', result.data.model)
                    resolve(result.data.model)
                } else {
                    console.log('Country Source Error :', result.data.errors);
                    reject(result.data.errors)
                }
            }).catch((err) => {
                console.log('Error in Retrieving data from source :', err);
                reject(err)
            });
        })
    },
    GET_FOOD_PRODUCT(context){
        return new Promise((resolve, reject) => {
            new CoreAPI(context.rootState.user_session.token).getFoodProduct()
            .then((result) => {
                console.log('Retrieve data from food product :', result.data);
                if(result.data.success){
                    context.commit('SET_FOOD_PRODUCT', result.data.model)
                    resolve(result.data.model)
                } else {
                    console.log('Country Food Product Error :', result.data.errors);
                    reject(result.data.errors)
                }
            }).catch((err) => {
                console.log('Error in Retrieving data from food product :', err);
                reject(err)
            });
        })
    },
    GET_FOOD_CATEGORY(context){
        return new Promise((resolve, reject) => {
            new CoreAPI(context.rootState.user_session.token).getFoodCategory()
            .then((result) => {
                console.log('Retrieve data from category :', result.data);
                if(result.data.success){
                    context.commit('SET_FOOD_CATEGORY', result.data.model)
                    resolve(result.data.model)
                } else {
                    console.log('Country Food Category Error :', result.data.errors);
                    reject(result.data.errors)
                }
            }).catch((err) => {
                console.log('Error in Retrieving data from food Category :', err);
                reject(err)
            });
        })
    }
}

export default {
    state,
    mutations,
    actions
}