import CertificateAPI from '../../api/CertificateAPI';

function initialState() {
    return {
        certificate: {},
        checklist: [],
        recommended_tasks: []
    }
}

const state = initialState()

const mutations = {
    SET_CERTIFICATE(state, certificate) {
        state.certificate = certificate;
    },
    SET_CERTIFICATE_CHECKLIST(state, checklist) {
        state.checklist = checklist;
    },
    SET_CERTIFICATE_RECOMMENDED_TASKS(state, recommended_tasks) {
        state.recommended_tasks = recommended_tasks;
    },

    RESET(state) {
        const s = initialState()
        Object.keys(s).forEach(key => {
            state[key] = s[key]
        })
    }
}

var actions = {
    GET_CERTIFICATE_BY_CASE_NO(context, case_no) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                new CertificateAPI(context.rootState.user_session.token)
                    .getCertificateByCaseNo(case_no)
                    .then((result) => {
                        console.log('result.data :', result.data);
                        if (result.data.success) {
                            context.commit('SET_CERTIFICATE', result.data.model)
                            resolve(result.data.model);
                        } else {
                            reject(result.data.errors)
                        }
                    }).catch((err) => {
                        console.log('err :', err);
                        reject(err)
                    });
            })
        }
    },
    GET_MANY_CERTIFICATE_BY_CASE(context, data) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                new CertificateAPI(context.rootState.user_session.token)
                    .getCertificatesByCaseNos(data)
                    .then((result) => {
                        if (result.data.success) resolve(result.data.model);
                        else reject(result.data.errors)
                    }).catch((err) => reject(err))
            })
        }
    },
    GET_CHECKLIST_BY_TASK(context) {
        if (context.rootState.user_session.token &&
            context.rootState.case.case_details === 1) {
            return new Promise((resolve, reject) => {
                new CertificateAPI(context.rootState.user_session.token)
                    .getChecklistByTask(context.rootState.case.case_details.current_task)
                    .then((result) => {
                        if (result.data.success) {
                            context.commit('SET_CERTIFICATE_CHECKLIST', result.data.model)
                            resolve(result.data.model)
                        } else reject(result.data.errors)
                    }).catch((err) => reject(err))
            })
        }
    },
    GET_RECOMMENDED_TASKS(context) {
        console.log('test');
        if (context.rootState.user_session.token &&
            context.rootState.case.case_details.case_type === 1) {
            return new Promise((resolve, reject) => {
                new CertificateAPI(context.rootState.user_session.token)
                    .getRecommendedTasks(context.rootState.case.case_details.current_task)
                    .then((result) => {
                        if (result.data.success) {
                            console.log('result.data.model :', result.data.model);
                            context.commit('SET_CERTIFICATE_RECOMMENDED_TASKS', result.data.model)
                            resolve(result.data.model)
                        } else reject(result.data.errors)
                    }).catch((err) => reject(err))
            })
        }
    },

    // GENERATED_DOCUMENTS(context, data) {
    //     return new LicenseAPI(context.rootState.user_session.token).addDocuments(
    //         data.license,
    //         data.formData
    //     );
    // }
}

export default {
    state,
    mutations,
    actions
}