import axios from 'axios';
import BaseURL from '../utils/BaseURL';

export default class TaskAPI {
    constructor(token) {
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getTasksLicense() {
        return axios.get("/lto-api/task")
    }

    getTasksCertificate() {
        return axios.get("/certificates/task")
    }

    isForPrintingLicense(cb) {
        axios.get('/lto-api/task/printing')
            .then((result) => {
                cb(result.data.errors, result.data.model)
            }).catch((err) => {
                console.log('isForPrintingLicense err :', err);
                cb(err);
            });
    }

    getTaskById(task) {
        return axios.get('/lto-api/task/' + task)
    }
}