import LicenseAPI from '@/api/LicenseAPI';
import AccountAPI from '@/api/AccountAPI';

const state = {
    inboxes: []
}

const mutations = {
    SET_INBOX(state, inboxes) {
        // state.inboxes = state.inboxes.concat(inboxes);
        state.inboxes = inboxes;
    }
}

var actions = {
    GET_INBOX(context) {
        if (context.rootState.user_session.token) {
            const promises = [
                new Promise((resolve, reject) => {
                    new LicenseAPI(context.rootState.user_session.token).getInbox((err, inbox) => {
                        if (!err) {
                            resolve(inbox)
                        } else {
                            console.log(JSON.stringify(err))
                            reject(err)
                        }
                    })
                }),
                new Promise((resolve, reject) => {
                    new AccountAPI(context.rootState.user_session.token).getInbox((err, inbox) => {
                        if (!err) {
                            resolve(inbox)
                        } else {
                            console.log(JSON.stringify(err))
                            reject(err)
                        }
                    })
                })
            ]
            return Promise.all(promises).then(inboxes => {
                var _inboxes = []
                inboxes.forEach(inbox => {
                    _inboxes = _inboxes.concat(inbox)
                })
                console.log('inboxes: ' + JSON.stringify(_inboxes))
                context.commit('SET_INBOX', _inboxes)
                return _inboxes;
            })
        }
    }
}

export default {
    state,
    mutations,
    actions
}