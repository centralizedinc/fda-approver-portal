var state = {
    notifications: [],
    id: 0,
}

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
    }
}



export default {
    state,
    mutations
};