import axios from 'axios';
import BaseURL from '../utils/BaseURL';

export default class AuthAPI {
    constructor() {
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI
    }

    login(user, cb) {
        axios.post("/public/accounts/auth/admin", user)
            .then(result => {
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                console.log('login err: ' + JSON.stringify(err))
                cb(err)
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