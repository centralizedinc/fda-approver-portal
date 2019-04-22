import LicenseAPI from '@/api/LicenseAPI';
import TaskAPI from '../../api/TaskAPI';

const state = {
    unassigned: []
}

const mutations = {
    SET_UNASSIGNED(state, unassigned) {
        state.unassigned = unassigned;
    }
}

var actions = {
    GET_UNASSIGNED(context, refresh) {
        if (context.rootState.user_session.token) {
            var token = context.rootState.user_session.token;
            return new Promise((resolve, reject) => {
                if (refresh || !context.state.unassigned || context.state.unassigned.length === 0) {
                    var unassigns = []
                    new LicenseAPI(token)
                        .getUnassigned()
                        .then((result) => {
                            if (result.data.success) {
                                unassigns = result.data.model;
                                context.commit('SET_UNASSIGNED', unassigns)
                                context.commit('SET_REVIEW_ACCESS', 0)
                                resolve(unassigns);
                            } else {
                                reject(result.data.errors)
                            }
                        }).catch((err) => {
                            reject(err)
                        });
                } else {
                    resolve(context.state.unassigned)
                }
            })
        }
    },
    CLAIM(context, app) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                var token = context.rootState.user_session.token;
                var APIClass = app.case_type === 0 ? new LicenseAPI(token) : null
                // app.case_type === 1 ? new CertificateAPI(token) : null
                if (APIClass) {
                    APIClass.claim(app.case_no)
                        .then((result) => {
                            if (result.data.success) {
                                context.dispatch("GET_UNASSIGNED", true)
                                context.dispatch("GET_INBOX", true, {
                                    root: true
                                })
                                context.commit('SET_CASE', result.data.model)
                                resolve(result.data.model)
                            } else {
                                reject(result.data.errors)
                            }
                        }).catch((err) => {
                            reject(err)
                        });
                } else {
                    reject()
                }
            })
        }
    },
    UNCLAIM(context, app) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                var token = context.rootState.user_session.token;
                var APIClass = app.case_type === 0 ? new LicenseAPI(token) : null
                // app.case_type === 1 ? new CertificateAPI(token) : null
                if (APIClass) {
                    APIClass.unclaim(app.case_no)
                        .then((result) => {
                            if (result.data.success) {
                                context.dispatch("GET_UNASSIGNED", true)
                                context.dispatch("GET_INBOX", true, {
                                    root: true
                                })
                                context.commit('SET_CASE', result.data.model)
                                resolve(result.data.model)
                            } else {
                                reject(result.data.errors)
                            }
                        }).catch((err) => {
                            reject(err)
                        });
                } else {
                    reject()
                }
            })
        }
    },
    IS_FOR_PRINTING(context) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                new TaskAPI(context.rootState.user_session.token)
                    .isForPrintingLicense(function (err, license) {
                        if (!err) {
                            resolve(license.for_printing)
                        } else {
                            reject(err);
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