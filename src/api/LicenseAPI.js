import axios from 'axios';
import BaseURL from '../utils/BaseURL';

export default class LicenseAPI {
    constructor(token) {
        axios.defaults.baseURL = BaseURL.license;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getLicenses(cb) {
        axios.get('/').then((result) => {
            cb(result.data.errors, result.data.model)
        }).catch(err => {
            cb(err)
        })
    }

    getInbox(cb) {
        console.log('enter claim')
        axios.get('case/inbox').then((result) => {
            console.log('license case/inbox: ' + JSON.stringify(result.data))
            cb(result.data.errors, result.data.model)
        }).catch(err => {
            cb(err)
        })
    }

    getParticipated(cb) {
        axios.get('case/participated').then((result) => {
            console.log('license case/participated: ' + JSON.stringify(result.data))
            cb(result.data.errors, result.data.model)
        }).catch(err => {
            cb(err)
        })
    }

    getUnassigned(cb) {
        axios.get('case/unassigned').then((result) => {
            console.log('license case/unassigned: ' + JSON.stringify(result.data))
            cb(result.data.errors, result.data.model)
        }).catch(err => {
            cb(err)
        })
    }

    claim(claimed_id, cb) {
        console.log("claimed_id: " + JSON.stringify(claimed_id));
        axios.post('case/claim', {
            id: claimed_id
        }).then((result) => {
            console.log('license case/claim: ' + JSON.stringify(result.data))
            cb(result.data.errors, result.data.model)
        }).catch(err => {
            cb(err)
        })
    }

    evaluate(params, cb) {
        axios.post('case/evaluate', params).then((result) => {
            console.log('license case/evaluate: ' + JSON.stringify(result.data))
            cb(result.data.errors, result.data.model)
        }).catch(err => {
            cb(err)
        })
    }
}