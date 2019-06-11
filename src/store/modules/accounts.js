import AccountAPI from '../../api/AccountAPI';

function initialState() {
    return {
        accounts_info: [],
        admins_info: []
    }
}

const state = initialState()

const mutations = {
    SET_ADMINS_INFO(state, accounts) {
        state.admins_info = accounts
    },
    SET_ACCOUNTS_INFO(state, accounts) {
        state.accounts_info = accounts
    },
    RESET(state) {
        const s = initialState()
        Object.keys(s).forEach(key => {
            state[key] = s[key]
        })
    }
}

var actions = {
    GET_ADMINS_INFO(context, id) {
        return new AccountAPI(context.rootState.user_session.token)
            .getAdminsInfo(id)
    },
    GET_ACCOUNTS_INFO(context, id) {
        return new AccountAPI(context.rootState.user_session.token)
            .getAccountsInfo(id)
    }
}

export default {
    state,
    mutations,
    actions
}