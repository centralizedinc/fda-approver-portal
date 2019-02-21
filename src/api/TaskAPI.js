import axios from 'axios';
import BaseURL from '../utils/BaseURL';

export default class TaskAPI {
    constructor(token) {
        // axios.defaults['access_token'] = token;
        axios.defaults.baseURL = BaseURL.baseUrl;
    }

    getTasksLicense(cb) {
        axios.get("/lto-api/task")
            .then(result => {
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                console.log('err license tasks: ' + err)
                cb(err)
            });
    }
}