import ProfileType from '../../api/ProfileAPI';

function initialState() {
    return {
        profile: {}
    }
}

const state = initialState()

const mutations = {

    SET_PROFILE(state, data) {
        state.profile = data

    },

    RESET(state) {
        const s = initialState()
        Object.keys(s).forEach(key => {
            state[key] = s[key]
        })
    }
}

var actions = {
    //admin / approver
    GET_PROFILE(context, profile_id) {
        return new Promise((resolve, reject) => {
            new ProfileType(context.rootState.user_session.token).getProfilebyId(profile_id, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_PROFILE', data)
                    resolve(data)
                }
            })
        })
    },
    ADD_PROFILE(context, new_profile) {
        return new Promise((resolve, reject) => {
            new ProfileType(context.rootState.user_session.token).addProfile(new_profile, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })

    },
    EDIT_PROFILE(context, modified_profile) {
        return new ProfileType(context.rootState.user_session.token).editProfile(modified_profile);

    }

}

export default {
    state,
    mutations,
    actions
}