import LicenseAPI from '../../api/LicenseAPI';
import ChecklistAPI from '../../api/ChecklistAPI';

const state = {
    ChecklistAPI: null,
    checklist: []
}

const mutations = {
    API_INSTANCE(state, token) {
        console.log('eval: ' + token);
        state.LicenseAPI = new LicenseAPI(token);
        state.ChecklistAPI = new ChecklistAPI(token);
    },
    SET_CHECKLIST(state, checklist) {
        state.checklist = checklist;
    }
}

var actions = {
    GET_CHECKLIST(context) {
        if (!ChecklistAPI) {
            context.state.ChecklistAPI.getChecklist((checklist, err) => {
                if (!err) {
                    context.commit('SET_CHECKLIST', checklist)
                } else {
                    console.log(JSON.stringify(err))
                }
            })
        }
    },
    EVALUATE(context, evaluate) {
        if (!ChecklistAPI) {
            return new Promise((resolve, reject) => {
                context.state.LicenseAPI.evaluate((license, err) => {
                    if (!err) {
                        resolve();
                        console.log('evaluation success')
                    } else {
                        console.log(JSON.stringify(err))
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