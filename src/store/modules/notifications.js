function initialState() {
    return {
        notifications: [],
        id: 0,
    }
}

var state = initialState

var mutations = {
    ADD_NOTIFICATION: (state, payload) => {
        //reset
        //MD doesn't recommend multiple snackbar
        state.notifications = [];
        var expiry = null;
        if (!payload.timeout) {
            expiry = (new Date()).getTime() + 6000;
        } else {
            expiry = (new Date()).getTime() + payload.timeout;
        }
        state.notifications.push({
            data: payload,
            expiry: expiry,
            show: true
        })
    },
    REMOVE_NOTIFICATION: (state, payload) => {
        state.notifications = [];
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