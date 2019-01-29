import LicenseAPI from '../../api/LicenseAPI';

const state = {
    LicenseAPI: null,
    unassigned: []
}

const mutations = {
    API_INSTANCE(state, token) {
        console.log('unass: ' + token);
        state.LicenseAPI = new LicenseAPI(token);
    },
    SET_UNASSIGNED(state, unassigned) {
        state.unassigned = unassigned;
    }
}

var actions = {
    GET_UNASSIGNED(context) {
        if (!LicenseAPI) {
            return new Promise((resolve, reject) => {
                context.state.LicenseAPI.getUnassigned((unassigned, err) => {
                    if (!err) {
                        context.commit('SET_UNASSIGNED', unassigned)
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