import AccountApi from '../../api/AccountAPI';

const state = {
    users: {}
}

const mutations = {
    USER(state, user) {
        state.users = user;
    }
}

var actions = {
    SET_USER(context) {
        return new Promise((resolve, reject) => {
            new AccountApi(context.rootState.user_session.token).getUsers((err, users) => {
                if (!err && users) {
                    context.commit('USER', users)
                    resolve(); 
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