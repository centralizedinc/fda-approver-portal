import axios from 'axios';
import BaseURL from '../utils/BaseURL';

export default class AccountAPI {
    constructor(token) {
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }
    
    getUsers(){
        return axios.get('/secured/accounts/users/info')
    }

    getAccountsInfo() {
        return axios.get('/secured/accounts/users/info')
    }

    getAdminsInfo() {
        return axios.get('/secured/accounts/admin/users/info')
    }
}