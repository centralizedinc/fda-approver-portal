import axios from 'axios';

export default class ChecklistAPI {
    constructor(token) {
        axios.defaults.baseURL = 'https://fda-services.herokuapp.com/v1.0';
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getChecklist(cb) {
        cb()
    }
}