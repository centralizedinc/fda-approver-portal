import LicenseAPI from '../../api/LicenseAPI';
import CertificateAPI from '../../api/CertificateAPI';

const state = {
    selected_case: {},
    prev_module: ''
}

const mutations = {
    SET_CASE(state, {
        _case,
        prev_module
    }) {
        state.selected_case = _case;
        state.prev_module = prev_module;
    },
    CLEAR_CASE(state) {
        state.selected_case = {};
        state.prev_module = "";
    }
}

var actions = {
    EVALUATE(context, evaluated_case) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                var token = context.rootState.user_session.token;
                if (evaluated_case.case_type === 0) {
                    new LicenseAPI(token).evaluate(evaluated_case)
                        .then(result => {
                            if (result.data.success) {
                                context.commit("CLEAR_CASE", {}, {root: true})
                                context.dispatch("GET_UNASSIGNED", true, {root: true})
                                context.dispatch("GET_INBOX", true, {root: true})
                                context.dispatch("GET_PARTICIPATED", true, {root: true})
                                context.commit("CLOSE_REVIEW", {}, {root: true});
                                resolve(result.data.model);
                            } else {
                                reject(result.data.errors);
                            }
                        })
                        .catch(err => {
                            reject(err)
                        })
                } else if (evaluated_case.case_type === 0) {
                    new CertificateAPI(token).evaluate(evaluated_case)
                        .then(result => {
                            if (result.data.success) {
                                resolve(result.data.model);
                            } else {
                                reject(result.data.errors);
                            }
                        })
                        .catch(err => {
                            reject(err)
                        })
                } else {
                    reject()
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