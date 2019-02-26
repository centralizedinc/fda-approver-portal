import axios from 'axios';
import BaseURL from '../utils/BaseURL';

export default class TaskAPI {
    constructor(token) {
        axios.defaults.baseURL = BaseURL.baseUrl;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
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

    isForPrintingLicense(cb) {
        axios.get('/lto-api/task/printing')
            .then((result) => {
                console.log('isForPrintingLicense success :', JSON.stringify(result.data));
                cb(result.data.errors, result.data.model)
            }).catch((err) => {
                console.log('isForPrintingLicense err :', err);
                cb(err);
            });
    }
}