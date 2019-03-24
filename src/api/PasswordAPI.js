import axios from 'axios';

export default class PasswordAPI {
    constructor(token) {
        axios.defaults.baseURL = 'https://fda-services.herokuapp.com/v1.0/secured/accounts/admin';
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    requestResetPassword(old_password) {
        return axios.post('/password/request', {
            old_password
        })
    }

    confirmResetPassword() {
        return axios.get('/password')
    }

    resetPassword(account) {
        return axios.post('/password', account)
    }
}