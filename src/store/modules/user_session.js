import AuthAPI from '@/api/AuthAPI';

const state = {
    isAuthenticated: false,
    token: null,
    account: {}
}

const mutations = {
    LOGIN(state, account) {
        state.token = account.token;
        state.account = account;
    },
    LOGOUT(state) {
        state.token = null;
    }
}

var actions = {
    LOGIN(context, user) {
        return new Promise((resolve, reject) => {
            new AuthAPI().login(user, (err, account) => {
                if (!err && account) {
                    console.log('login: ' + JSON.stringify(account.isMatch))
                    if (account.isMatch) {
                        context.commit('LOGIN', account)
                        context.dispatch('GET_TASKS', {}, {
                            root: true
                        }).then((result) => {
                            return context.dispatch('GET_PRIMARY', {}, {
                                root: true
                            })
                        }).then((result) => {
                            return context.dispatch('GET_ACCOUNTS_INFO', {}, {
                                root: true
                            })
                        }).then((result) => {
                            return context.dispatch('GET_ADMINS_INFO', {}, {
                                root: true
                            })
                        }).then((result) => {
                            resolve(true);
                        }).catch((err) => {

                        });
                    } else {
                        resolve(false);
                    }
                } else {
                    console.log(JSON.stringify(err))
                    reject(err)
                }
            })
        })
    }
}

export default {
    state,
    mutations,
    actions
}