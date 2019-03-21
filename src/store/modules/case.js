import CaseAPI from '../../api/CaseAPI';

const state = {
    cases: [],
    complied: []
}

const mutations = {
    SET_CASES(state, cases) {
        state.cases = cases;
    },
    SET_COMPLY(state, cases) {
        state.complied = cases;
    },
    CLEAR_DATA(state) {
        state.cases = [];
    }
}

var actions = {
    GET_CASES(context) {
        return new Promise((resolve, reject) => {
            new CaseAPI(context.rootState.user_session.token).getLicenseCases()
                .then((result) => {
                    if (result.data.success) {
                        console.log("get cases commit: " + JSON.stringify(result))
                        context.commit('SET_CASES', result.data.model);
                        resolve(result.data.model)
                    } else {
                        console.log('GET_CASES err :', result.data.errors)
                        reject(result.data.errors)
                    }
                }).catch((err) => {
                    console.log('err :', err);
                    reject(err)
                });
        })
    },
    GET_COMPLY(context) {
        return new Promise((resolve, reject) => {
            new CaseAPI(context.rootState.user_session.token).getComply()
                .then((result) => {
                    if (result.data.success) context.commit('SET_COMPLY', result.data.model);
                    resolve(result.data)
                }).catch((err) => {
                    reject(err)
                });
        })
    },
    SAVE_COMPLY(context, comply) {
        return new Promise((resolve, reject) => {
            var CaseApi = new CaseAPI(context.rootState.user_session.token);
            CaseApi.uploadFile(comply)
                .then((result) => {
                    var files = result.data.model
                    console.log('files :', files);
                    var compliance = {
                        case_id: comply.case_id,
                        remarks: comply.remarks,
                        files: files
                    }
                    return CaseApi.submitCompliance(compliance)
                }).then((result) => {
                    console.log('result :', result);
                    resolve(result.data)
                })
                .catch((err) => {
                    reject(err)
                });
        })
    },
    GET_ACTIVITIES(context) {
        if (context.rootState.user_session.token) {
            return new CaseAPI(context.rootState.user_session.token).getActivities();
        }
    }
}

export default {
    state,
    mutations,
    actions
}