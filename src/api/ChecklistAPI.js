import axios from 'axios';
import BaseURL from '../utils/BaseURL';

export default class ChecklistAPI {
    constructor(token) {
        axios.defaults.baseURL = BaseURL.baseUrl;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getChecklist(cb) {
        cb()
    }
}