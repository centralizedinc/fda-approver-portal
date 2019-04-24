import AccountApi from '../../api/AccountAPI';

function initialState() {
    return {
        users: {}
    }
}

const state = initialState()

const mutations = {
    USER(state, user) {
        state.users = user;
    },

    RESET(state) {
        const s = initialState()
        Object.keys(s).forEach(key => {
            state[key] = s[key]
        })
    }
}

var actions = {
    SET_USER(context) {
        return new Promise((resolve, reject) => {
            new AccountApi(context.rootState.user_session.token)
                .getUsers()
                .then((result) => {
                    if (result.data.success) {
                        context.commit('USER', result.data.model)
                        resolve(result.data.model);
                    } else {
                        reject(result.data.errors)
                    }
                }).catch((err) => {
                    reject(err)
                });
        })
    }
}

export default {
    state,
    mutations,
    actions
}