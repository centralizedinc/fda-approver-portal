import LicenseAPI from '../../api/LicenseAPI';

function initialState() {
    return {
        license: {},
        checklist: [],
        recommended_tasks: []
    }
}

const state = initialState()

const mutations = {
    SET_LICENSE(state, license) {
        state.license = license;
    },
    SET_CHECKLIST(state, checklist) {
        state.checklist = checklist;
    },
    SET_RECOMMENDED_TASKS(state, recommended_tasks) {
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
    GET_LICENSE_BY_CASE(context, case_id) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                new LicenseAPI(context.rootState.user_session.token).getLicensesByCase(case_id, (err, license) => {
                    if (!err) {
                        context.commit('SET_LICENSE', license)
                        resolve(license)
                    } else {
                        console.log(JSON.stringify(err))
                        reject(err)
                    }
                })
            })
        }
    },
    GET_LICENSE_BY_CASE_NO(context, case_no) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                new LicenseAPI(context.rootState.user_session.token)
                    .getLicenseByCaseNo(case_no)
                    .then((result) => {
                        console.log('result.data :', result.data);
                        if (result.data.success) {
                            context.commit('SET_LICENSE', result.data.model)
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
    GET_MANY_LICENSE_BY_CASE(context, data) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                new LicenseAPI(context.rootState.user_session.token)
                    .getManyLicensesByCase(data)
                    .then((result) => {
                        if (result.data.success) resolve(result.data.model);
                        else reject(result.data.errors)
                    }).catch((err) => reject(err))
            })
        }
    },
    GET_CHECKLIST_BY_TASK(context) {
        if (context.rootState.user_session.token &&
            context.rootState.case.case_details === 0) {
            return new Promise((resolve, reject) => {
                new LicenseAPI(context.rootState.user_session.token)
                    .getChecklistByTask(context.rootState.case.case_details.current_task, (err, checklist) => {
                        if (!err) {
                            context.commit('SET_CHECKLIST', checklist)
                            resolve(checklist)
                        } else {
                            console.log(JSON.stringify(err))
                            reject(err)
                        }
                    })
            })
        }
    },
    GET_RECOMMENDED_TASKS(context) {
        if (context.rootState.user_session.token &&
            context.rootState.case.case_details.case_type === 0) {
            return new Promise((resolve, reject) => {
                new LicenseAPI(context.rootState.user_session.token)
                    .getRecommendedTasks(context.rootState.case.case_details.current_task, (err, recommended_tasks) => {
                        if (!err) {
                            context.commit('SET_RECOMMENDED_TASKS', recommended_tasks)
                            resolve(recommended_tasks)
                        } else {
                            console.log(JSON.stringify(err))
                            reject(err)
                        }
                    })
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