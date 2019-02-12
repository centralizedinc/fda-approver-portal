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
            // var apis = [new LicenseAPI(token), new AccountAPI(token)]
            var promises = []
            // apis.forEach(api => {
            //     promises.push(
            //         new Promise((resolve, reject) => {
            //             var api_class = api;
            //             api_class.getUnassigned((err, unassigned) => {
            //                 if (!err) {
            //                     resolve(unassigned)
            //                 } else {
            //                     console.log(JSON.stringify(err))
            //                     reject(err)
            //                 }
            //             })
            //         })
            //     )
            // })
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
                }),
                new Promise((resolve, reject) => {
                    new AccountAPI(token).getUnassigned((err, unassigned) => {
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
                var APIClass = app.case_type === 0 ? new LicenseAPI(token) :
                    // app.case_type === 1 ? new CertificateAPI(token) :
                    app.case_type === 2 ? new AccountAPI(token) : null
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