import AccountAPI from '../../api/AccountAPI';

const state = {
    isAuthenticated: false,
    token: null
}

const mutations = {
    LOGIN(state, account) {
        state.isAuthenticated = true;
        state.token = account.token;
    },
    LOGOUT(state) {
        state.isAuthenticated = false
        state.token = null;
    }
}

var actions = {
    LOGIN(context, user) {
        return new Promise((resolve, reject) => {
            new AccountAPI().login(user, (account, err) => {
                console.log('login result: ' + JSON.stringify(account))
                if (!err) {
                    if (account.isMatch) {
                        context.commit('LOGIN', account)
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