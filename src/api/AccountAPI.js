import axios from 'axios';

axios.defaults.baseURL = 'https://fda-services.herokuapp.com/v1.0';

export default class AccountAPI {
    login(user, cb) {
        axios.post("/public/accounts/auth/admin", user)
            .then(result => {
                cb(result.data.model)
            })
            .catch(err => {
                console.log('err: ' + JSON.stringify(err))
                cb(null, err)
            });
    }

    checkAuth(token, cb) {
        if (token) {
            cb(true)
        } else {
            cb(false)
        }
    }
}