import AccountAPI from '../../api/AccountAPI';

const state = {
    accounts_info: [],
    admins_info: []
}

const mutations = {
    SET_ADMINS_INFO(state, accounts) {
        state.admins_info = accounts
    },
    SET_ACCOUNTS_INFO(state, accounts) {
        state.accounts_info = accounts
    }
}

var actions = {
    GET_ADMINS_INFO(context) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                new AccountAPI(context.rootState.user_session.token)
                    .getAdminsInfo()
                    .then((result) => {
                        if (result.data.success) {
                            context.commit('SET_ADMINS_INFO', result.data.model)
                        }
                        resolve(result.data)
                    }).catch((err) => {
                        console.log('#GET_ADMINS_INFO err :', err);
                        reject(err)
                    });
            })
        }
    },
    GET_ACCOUNTS_INFO(context) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                new AccountAPI(context.rootState.user_session.token)
                    .getAccountsInfo()
                    .then((result) => {
                        if (result.data.success) {
                            context.commit('SET_ACCOUNTS_INFO', result.data.model)
                        }
                        resolve(result.data)
                    }).catch((err) => {
                        console.log('#GET_ACCOUNTS_INFO err :', err);
                        reject(err)
                    });
            })
        }
    }
}

export default {
    state,
    mutations,
    actions
}