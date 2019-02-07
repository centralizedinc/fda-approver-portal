import LicenseAPI from '../../api/LicenseAPI';
import AccountAPI from '../../api/AccountAPI';

const state = {
    unassigned: []
}

const mutations = {
    SET_UNASSIGNED(state, unassigned) {
        state.unassigned = unassigned;
    }
}

var actions = {
    GET_UNASSIGNED(context) {
        if (context.rootState.user_session.token) {
            const promises = [
                new Promise((resolve, reject) => {
                    new LicenseAPI(context.rootState.user_session.token).getUnassigned((unassigned, err) => {
                        if (!err) {
                            resolve(unassigned)
                        } else {
                            console.log(JSON.stringify(err))
                            reject(err)
                        }
                    })
                }),
                new Promise((resolve, reject) => {
                    new AccountAPI(context.rootState.user_session.token).getUnassigned((unassigned, err) => {
                        if (!err) {
                            resolve(unassigned)
                        } else {
                            console.log(JSON.stringify(err))
                            reject(err)
                        }
                    })
                })
            ]
            return Promise.all(promises).then(unassigns => {
                var _unassigns = []
                unassigns.forEach(unassign => {
                    _unassigns = _unassigns.concat(unassign)
                })
                console.log('_unassigns: ' + JSON.stringify(_unassigns))
                context.commit('SET_UNASSIGNED', _unassigns)
                return _unassigns;
            })
        }
    }
}

export default {
    state,
    mutations,
    actions
}