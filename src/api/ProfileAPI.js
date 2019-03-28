import axios from 'axios'

// axios.defaults.baseURL = 'VUE_APP_API_BASE_URI'

// export default class ProfileType {
//     constructor(token) {
//         this.token = token;
//         axios.defaults.headers.common['Content-Type'] = 'application/json'
//     }
import BaseURL from '../utils/BaseURL';

export default class AuthAPI {
    constructor() {
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI
    }
    //Profile
    getProfilebyId(profile_id, cb) {
        console.log("##########GETPROFILEID" + profile_id)
        axios.get('secured/accounts/admin/' + profile_id).then((result) => {
                console.log("###API### GET PROFILE" + JSON.stringify(result.data))
                if (result.data.success) {
                    cb(result.data.errors, result.data.model)
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
        axios.post('secured/accounts/admin/', new_profile).then((result) => {
                console.log("api############# ADD PROFILE")
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                cb(err)
            })
    }

    editProfile(profile) {
        console.log(JSON.stringify(profile))
        return new Promise((resolve, reject) => {
          if(profile.avatar){
              axios.post("documents/avatars?account_id=" + profile.account._id, profile.avatar)
                .then(result1 => {
                  if (result1.data.success) {
                      console.log("############# SAVING RESPONSE: " + JSON.stringify(result1.data))
                    profile.account.avatar = result1.data.model;
                    return axios.post("secured/accounts/admin/" + profile.account._id,profile.account);
                  } else {
                    resolve(result1.data);
                  }
                })
                .then(result2 => {
                  console.log("############# SAVING RESPONSE: " + JSON.stringify(result2.data))
                  resolve(result2.data);
                })
                .catch(err => {
                  reject(err);
                });
              }else{
                axios.post("secured/accounts/admin/" + profile.account._id,profile.account)
                  .then(result2 => {
                    console.log("############# SAVING RESPONSE: " + JSON.stringify(result2.data))
                    resolve(result2.data);
                  })
                  .catch(err => {
                    reject(err);
                  });
              }
        });
      }
    
}