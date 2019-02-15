import LicenseAPI from '@/api/LicenseAPI';
import AccountAPI from '@/api/AccountAPI';

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
            var token = context.rootState.user_session.token;
            var promises = []
            promises = [
                new Promise((resolve, reject) => {
                    new LicenseAPI(token).getUnassigned((err, unassigned) => {
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
    },
    CLAIM(context, app) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                var token = context.rootState.user_session.token;
                console.log("app: " + JSON.stringify(app));
                var APIClass = app.case_type === 0 ? new LicenseAPI(token) : null
                // app.case_type === 1 ? new CertificateAPI(token) : null
                if (APIClass) {
                    APIClass.claim(app._id, function (err, claimed_app) {
                        if (!err) {
                            resolve(claimed_app);
                        } else {
                            reject(err);
                        }
                    })
                } else {
                    reject()
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