import LicenseAPI from '../../api/LicenseAPI';

const state = {
    participated: []
}

const mutations = {
    SET_PARTICIPATED(state, participated) {
        state.participated = participated;
    }
}

var actions = {
    GET_PARTICIPATED(context) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                new LicenseAPI(context.rootState.user_session.token).getParticipated((participated, err) => {
                    if (!err) {
                        context.commit('SET_PARTICIPATED', participated)
                        resolve()
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