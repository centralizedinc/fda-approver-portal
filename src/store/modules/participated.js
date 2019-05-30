import LicenseAPI from '@/api/LicenseAPI';
import CertificateAPI from '../../api/CertificateAPI';

function initialState() {
    return {
        participated: []
    }
}

const state = initialState()

const mutations = {
    SET_PARTICIPATED(state, participated) {
        state.participated = participated;
    },

    RESET(state) {
        const s = initialState()
        Object.keys(s).forEach(key => {
            state[key] = s[key]
        })
        console.log("clear participated");
    }
}

var actions = {
    GET_PARTICIPATED(context, refresh) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                if (refresh || !context.state.participated || context.state.participated.length === 0) {
                    var participated = [];
                    new LicenseAPI(context.rootState.user_session.token)
                        .getParticipated()
                        .then((result) => {
                            if (result.data.success) {
                                participated = result.data.model;
                                // context.commit('SET_PARTICIPATED', participated)
                                // resolve(participated)
                                return new CertificateAPI(context.rootState.user_session.token).getParticipated()
                            } else {
                                reject(result.data.errors)
                            }
                        })
                        .then((result) => {
                            if (result.data.success) {
                                participated = participated.concat(result.data.model);
                                context.commit('SET_PARTICIPATED', participated)
                                resolve(participated)
                            } else {
                                reject(result.data.errors)
                            }
                        })
                        .catch((err) => {
                            reject(err)
                        });
                } else {
                    resolve(context.state.participated)
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