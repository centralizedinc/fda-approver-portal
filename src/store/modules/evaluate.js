import LicenseAPI from '@/api/LicenseAPI';
import AccountAPI from '@/api/AccountAPI';
import ChecklistAPI from '@/api/ChecklistAPI';

const state = {
    selected_case: {},
    prev_module: ''
}

const mutations = {
    SET_CASE(state, {_case, prev_module}) {
        state.selected_case = _case;
        state.prev_module = prev_module;
    },
    CLEAR_CASE(state, _case) {
        state.selected_case = {};
        state.prev_module = "";
    }
}

var actions = {
    EVALUATE(context, evaluated_case) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                var token = context.rootState.user_session.token;
                var APIClass = evaluated_case.case_type === 0 ? new LicenseAPI(token) : null
                // evaluated_case.case_type === 1 ? new CertificateAPI(token) : null
                if (APIClass) {
                    APIClass.evaluate(evaluated_case, function (err, evaluated_app) {
                        if (!err) {
                            resolve(evaluated_app);
                        } else {
                            reject(err);
                        }
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