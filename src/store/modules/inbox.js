import LicenseAPI from '@/api/LicenseAPI';

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
    GET_INBOX(context, refresh) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                if (refresh || !context.state.inboxes || context.state.inboxes.length === 0) {
                    var inboxes = [];
                    new LicenseAPI(context.rootState.user_session.token)
                        .getInbox()
                        .then((result) => {
                            if (result.data.success) {
                                inboxes = result.data.model;
                                context.commit('SET_INBOX', inboxes)
                                resolve(inboxes);
                            } else {
                                reject(result.data.errors)
                            }
                        }).catch((err) => {
                            reject(err)
                        });
                } else {
                    resolve(context.state.inboxes)
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