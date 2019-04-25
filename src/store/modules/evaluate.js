import LicenseAPI from '../../api/LicenseAPI';
import CertificateAPI from '../../api/CertificateAPI';

function initialState() {
    return {
        selected_case: {},
        prev_module: ''
    }
}

const state = initialState()

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
    },

    RESET(state) {
        const s = initialState()
        Object.keys(s).forEach(key => {
            state[key] = s[key]
        })
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