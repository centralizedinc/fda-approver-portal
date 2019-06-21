import AuthAPI from '@/api/AuthAPI';
import PasswordApi from '../../api/PasswordAPI'

function initialState() {
    return {
        token: null,
        account: {}
    }
}

const state = initialState()

const mutations = {
    LOGIN(state, account) {
        state.token = account.token;
        state.account = account.user;
    },
    LOGOUT(state) {
        state.token = null;
        state.account = {}
    },
    SET_AVATAR(state, avatar) {
        if (!state.account.avatar) {
            state.account.avatar = {};
        }
        state.account.avatar.location = avatar;
    },

    RESET(state) {
        const s = initialState()
        Object.keys(s).forEach(key => {
            state[key] = s[key]
        })
    }
}

var actions = {
    LOGIN(context, user) {
        return new Promise((resolve, reject) => {
            new AuthAPI().login(user, (err, account) => {
                console.log('login :', account ? account.isMatch : false)
                if (!err && account && account.isMatch) {
                    context.commit('LOGIN', account)
                    resolve(true);
                    context.dispatch('GET_TASKS', {}, {
                        root: true
                    }).then((result) => {
                        return context.dispatch('GET_PRIMARY', {}, {
                            root: true
                        })
                        // }).then((result) => {
                        //     return context.dispatch('GET_ACCOUNTS_INFO', {}, {
                        //         root: true
                        //     })
                        // }).then((result) => {
                        //     return context.dispatch('GET_ADMINS_INFO', {}, {
                        //         root: true
                        //     })
                    }).then((result) => {
                        return context.dispatch('GET_ID_TYPES', {}, {
                            root: true
                        })
                    }).then((result) => {
                        return context.dispatch('GET_DESIGNATIONS', {}, {
                            root: true
                        })
                    })
                    .then((result) => {
                        return context.dispatch('GET_COUNTRY_ORIGIN', {}, {
                            root: true
                        })
                    })
                    .then((result)=>{
                        return context.dispatch('GET_COMPANY_ACTIVITY', {}, {
                            root: true
                        })
                    })
                    .then((result)=>{
                        return context.dispatch('GET_SOURCE_TYPE', {}, {
                            root: true
                        })
                    })
                    .then((result)=>{
                        return context.dispatch('GET_FOOD_PRODUCT', {}, {
                            root: true
                        })
                    })
                    .then((result)=>{
                        return context.dispatch('GET_FOOD_CATEGORY', {}, {
                            root: true
                        })
                    })
                    .then((result) => {
                        console.log("Done loading references...");
                    }).catch((err) => {
                        console.log('Loading references err :', err);
                        reject(err)
                    });
                } else {
                    console.log('LOGIN err :', err);
                    reject(err)
                }
            })
        })
    },

    LOGOUT(context) {
        context.commit('RESET')
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
        return new PasswordApi().resetPassword(account)
    }
}

export default {
    state,
    mutations,
    actions
}