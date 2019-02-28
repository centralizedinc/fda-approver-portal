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

    getPrints(cb) {
        axios.get("/core/batch")
            .then(result => {
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                console.log('err getBatch: ' + err)
                cb(err)
            });
    }

    getPrints(cb) {
        axios.get("/core/prints")
            .then(result => {
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                console.log('err getPrints : ' + err)
                cb(err)
            });
    }

    rePrint(params, cb) {
        axios.post("/core/prints/reprint", params)
            .then(result => {
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                console.log('err rePrint : ' + err)
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