import LicenseAPI from '../../api/LicenseAPI';
import ChecklistAPI from '../../api/ChecklistAPI';

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
            new ChecklistAPI(context.rootState.user_session.token).getChecklist((checklist, err) => {
                if (!err) {
                    context.commit('SET_CHECKLIST', checklist)
                } else {
                    console.log(JSON.stringify(err))
                }
            })
        }
    },
    EVALUATE(context, evaluate) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                new LicenseAPI(context.rootState.user_session.token).evaluate((license, err) => {
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