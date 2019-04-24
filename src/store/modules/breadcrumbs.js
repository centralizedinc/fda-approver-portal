function initialState() {
    return {
        navigation: []
    }
}

const state = initialState()

const mutations = {
    DROP_BREADCRUMBS: function (state, payload) {
        var index = state.navigation.map(e => e.name).indexOf(payload.name);
        if (index > -1) {
            state.navigation.splice(index + 1, state.navigation.length)
        } else {
            state.navigation.push(payload)
        }
    },

    PICKUP_BREADCRUMBS: function (state, payload) {
        //remove all
        state.navigation = []
    },

    RESET(state) {
        const s = initialState()
        Object.keys(s).forEach(key => {
            state[key] = s[key]
        })
    }
}


export default {
    state,
    mutations
};