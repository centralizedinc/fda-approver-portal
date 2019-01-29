import LicenseAPI from '../../api/LicenseAPI';

const state = {
    inboxes: []
}

const mutations = {
    SET_INBOX(state, inboxes) {
        state.inboxes = inboxes;
    }
}

var actions = {
    GET_INBOX(context) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                new LicenseAPI(context.rootState.user_session.token).getInbox((inbox, err) => {
                    if (!err) {
                        context.commit('SET_INBOX', inbox)
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