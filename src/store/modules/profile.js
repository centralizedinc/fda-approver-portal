import ProfileType from '../../api/ProfileAPI';

const state = {
    profile: {}

}

const mutations = {

    SET_PROFILE(state, data) {
        console.log("###PROFILE:SET###" + JSON.stringify(data))
        state.profile = data
        
    }
}

var actions = {
//admin / approver
    GET_PROFILE(context, profile_id) {
        return new Promise((resolve, reject) => {
            console.log("##STORE #########" + JSON.stringify(profile_id))
            new ProfileType(context.rootState.user_session.token).getProfilebyId(profile_id,(data, err) => {
                console.log("#####DATA" + data)
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
        return new Promise((resolve, reject) => {
            new ProfileType(context.rootState.user_session.token).editProfile(modified_profile, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
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