import axios from 'axios';
import BaseURL from '../utils/BaseURL';

export default class CoreAPI {
    constructor(token) {
        axios.defaults.baseURL = BaseURL.baseUrl;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    addBatch(batch, cb) {
        axios.post("/core/batch", batch)
            .then(result => {
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                console.log('err getBatch: ' + err)
                cb(err)
            });
    }

    getBatch(cb) {
        axios.get("/core/batch")
            .then(result => {
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                console.log('err getBatch: ' + err)
                cb(err)
            });
    }

    getPrimary(cb) {
        axios.get("/core/primary")
            .then(result => {
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                console.log('err license tasks: ' + err)
                cb(err)
            });
    }
}