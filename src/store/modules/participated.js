import LicenseAPI from '@/api/LicenseAPI';
import AccountAPI from '@/api/AccountAPI';

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
            const promises = [
                new Promise((resolve, reject) => {
                    new LicenseAPI(context.rootState.user_session.token).getParticipated((err, participated) => {
                        if (!err) {
                            participated.forEach(p => {
                                p.application = "FOR LICENSE";
                            })
                            resolve(participated)
                        } else {
                            console.log(JSON.stringify(err))
                            reject(err)
                        }
                    })
                }),
                new Promise((resolve, reject) => {
                    new AccountAPI(context.rootState.user_session.token).getParticipated((err, participated) => {
                        if (!err) {
                            participated.forEach(p => {
                                p.application = "FOR REGISTRATION";
                            })
                            resolve(participated)
                        } else {
                            console.log(JSON.stringify(err))
                            reject(err)
                        }
                    })
                })
            ]
            return Promise.all(promises).then(participateds => {
                var _participateds = []
                participateds.forEach(participated => {
                    _participateds = _participateds.concat(participated)
                })
                console.log('_participateds: ' + JSON.stringify(_participateds))
                context.commit('SET_PARTICIPATED', _participateds)
                return _participateds;
            })
        }
    }
}

export default {
    state,
    mutations,
    actions
}