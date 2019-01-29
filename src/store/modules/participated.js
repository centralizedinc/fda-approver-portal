import LicenseAPI from '../../api/LicenseAPI';

const state = {
    LicenseAPI: null,
    participated: []
}

const mutations = {
    API_INSTANCE(state, token) {
        console.log('part: ' + token);
        state.LicenseAPI = new LicenseAPI(token);
    },
    SET_PARTICIPATED(state, participated) {
        state.participated = participated;
    }
}

var actions = {
    GET_PARTICIPATED(context) {
        if (!LicenseAPI) {
            return new Promise((resolve, reject) => {
                context.state.LicenseAPI.getParticipated((participated, err) => {
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