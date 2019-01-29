import LicenseAPI from '../../api/LicenseAPI';

const state = {
    LicenseAPI: null,
    inboxes: []
}

const mutations = {
    API_INSTANCE(state, token) {
        console.log('inbox: ' + token);
        state.LicenseAPI = new LicenseAPI(token);
    },
    SET_INBOX(state, inboxes) {
        state.inboxes = inboxes;
    }
}

var actions = {
    GET_INBOX(context) {
        if (!LicenseAPI) {
            return new Promise((resolve, reject) => {
                context.state.LicenseAPI.getInbox((licenses, err) => {
                    if (!err) {
                        context.commit('SET_INBOX', licenses)
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