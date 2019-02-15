import LicenseAPI from '@/api/LicenseAPI';
import AccountAPI from '@/api/AccountAPI';
import ChecklistAPI from '@/api/ChecklistAPI';

const state = {
    checklist: []
}

const mutations = {
    SET_CHECKLIST(state, checklist) {
        state.checklist = checklist;
    }
}

var actions = {
    GET_CHECKLIST(context) {
        if (context.rootState.user_session.token) {
            new ChecklistAPI(context.rootState.user_session.token).getChecklist((err, checklist) => {
                if (!err) {
                    context.commit('SET_CHECKLIST', checklist)
                } else {
                    console.log(JSON.stringify(err))
                }
            })
        }
    },
    EVALUATE(context, app) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                var token = context.rootState.user_session.token;
                var APIClass = app.case_type === 0 ? new LicenseAPI(token) : null
                // app.case_type === 1 ? new CertificateAPI(token) : null
                if (APIClass) {
                    var byPassParams = {
                        id: app._id,
                        status: 'A',
                        remarks: ''
                    }
                    APIClass.evaluate(byPassParams, function (err, evaluated_app) {
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