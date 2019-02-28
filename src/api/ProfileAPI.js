import axios from 'axios'

// axios.defaults.baseURL = 'https://fda-services.herokuapp.com/v1.0'

// export default class ProfileType {
//     constructor(token) {
//         this.token = token;
//         axios.defaults.headers.common['Content-Type'] = 'application/json'
//     }
import BaseURL from '../utils/BaseURL';

export default class AuthAPI {
    constructor() {
        axios.defaults.baseURL = BaseURL.accounts_secured;
    }
    //Profile
    getProfilebyId(profile_id, cb) {
        console.log("##########GETPROFILEID" + profile_id)
        axios.get('admin/' + profile_id).then((result) => {
                console.log("###API### GET PROFILE" + JSON.stringify(result.data))
                if (result.data.success) {
                    cb(result.data.model)
                } else {
                    cb(err)
                }
            })
            .catch(err => {
                cb(err)
            })
    }

    addProfile(new_profile, cb) {
        console.log("api############# add admin" + JSON.stringify(new_profile))
        axios.post('admin', new_profile).then((result) => {
                console.log("api############# ADD PROFILE")
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editProfile(modified_profile, cb) {
        var id = modified_profile._id
        axios.post('admin/' + id, modified_profile).then((result) => {
                console.log("api############# Edit PROFILE" + JSON.stringify(modified_profile))
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editPassword(modified_password, cb) {
        axios.post('admin/password', modified_password).then((result) => {
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }


}