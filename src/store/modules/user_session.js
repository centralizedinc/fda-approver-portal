import AccountAPI from '../../api/AccountAPI';

const state = {
    isAuthenticated: false,
    token: null
}

const mutations = {
    LOGIN(state, token) {
        state.isAuthenticated = true;
        state.token = token;
    },
    LOGOUT(state) {
        state.token = null;
    }
}

var actions = {
    LOGIN(context, user) {
        return new Promise((resolve, reject) => {
            new AccountAPI().login(user, (account, err) => {
                if (!err && account) {
                    console.log('login: ' + JSON.stringify(account.isMatch))
                    if (account.isMatch) {
                        context.commit('LOGIN', account.token)
                    }
                    resolve()
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