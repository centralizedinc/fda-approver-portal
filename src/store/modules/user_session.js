import AuthAPI from '@/api/AuthAPI';
import PasswordApi from '../../api/PasswordAPI'

const state = {
    token: null,
    account: {}
}

const mutations = {
    LOGIN(state, account) {
        state.token = account.token;
        state.account = account.user;
    },
    LOGOUT(state) {
        state.token = null;
        state.account = {}
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
    },
    
    LOGOUT(context){
        context.commit('LOGOUT')
    },

    REQUEST_RESET_PASSWORD(context, old_password) {
        return new PasswordApi(context.rootState.user_session.token)
            .requestResetPassword(old_password)
    },

    CONFIRM_RESET_PASSWORD(context, token) {
        return new PasswordApi(token).confirmResetPassword()
    },

    RESET_PASSWORD(context, account) {
        console.log('account :', account);
        return new PasswordApi().resetPassword(account)
    }
}

export default {
    state,
    mutations,
    actions
}