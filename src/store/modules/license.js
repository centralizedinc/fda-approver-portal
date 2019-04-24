import LicenseAPI from '@/api/LicenseAPI';

const state = {
    license: {},
    checklist: [],
    recommended_tasks: []
}

const mutations = {
    SET_LICENSE(state, license) {
        state.license = license;
    },
    SET_CHECKLIST(state, checklist) {
        state.checklist = checklist;
    },
    SET_RECOMMENDED_TASKS(state, recommended_tasks) {
        state.recommended_tasks = recommended_tasks;
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
    GET_MANY_LICENSE_BY_CASE(context, cases_id) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                new LicenseAPI(context.rootState.user_session.token).getManyLicensesByCase(cases_id, (err, licenses) => {
                    if (!err) {
                        resolve(licenses)
                    } else {
                        console.log('err :', err);
                        reject(err)
                    }
                })
            })
        }
    },
    GET_CHECKLIST_BY_TASK(context, task_id) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                new LicenseAPI(context.rootState.user_session.token).getChecklistByTask(task_id, (err, checklist) => {
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
    GET_RECOMMENDED_TASKS(context, task_id) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                new LicenseAPI(context.rootState.user_session.token).getRecommendedTasks(task_id, (err, recommended_tasks) => {
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
    }
}

export default {
    state,
    mutations,
    actions
}