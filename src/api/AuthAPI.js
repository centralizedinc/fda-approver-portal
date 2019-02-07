import axios from 'axios';

export default class AuthAPI {
    constructor() {
        axios.defaults.baseURL = 'https://fda-services.herokuapp.com/v1.0/public/accounts';
    }

    login(user, cb) {
        axios.post("/auth/admin", user)
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