import axios from 'axios';
import BaseURL from '../utils/BaseURL';

export default class AuthAPI {
    constructor() {
        axios.defaults.baseURL = BaseURL.auth;
    }

    login(user, cb) {
        axios.post("/auth/admin", user)
            .then(result => {
                console.log('user: ' + JSON.stringify(result.data.model));

                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                console.log('err: ' + JSON.stringify(err))
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