import axios from 'axios';
import BaseURL from '../utils/BaseURL';

export default class CertificateAPI {
    constructor(token) {
        axios.defaults.baseURL = BaseURL.certificate;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getInbox(cb) {
        console.log('enter claim')
        axios.get('case/inbox').then((result) => {
            console.log('case/inbox: ' + JSON.stringify(result.data))
            cb(result.data.errors, result.data.model)
        }).catch(err => {
            cb(err)
        })
    }

    getParticipated(cb) {
        axios.get('case/participated').then((result) => {
            console.log('case/participated: ' + JSON.stringify(result.data))
            cb(result.data.errors, result.data.model)
        }).catch(err => {
            cb(err)
        })
    }

    getUnassigned(cb) {
        axios.get('case/unassigned').then((result) => {
            console.log('case/unassigned: ' + JSON.stringify(result.data))
            cb(result.data.errors, result.data.model)
        }).catch(err => {
            cb(err)
        })
    }

    claim(claimed_id, cb) {
        axios.post('case/claim', {
            id: claimed_id
        }).then((result) => {
            console.log('case/claim: ' + JSON.stringify(result.data))
            cb(result.data.errors, result.data.model)
        }).catch(err => {
            cb(err)
        })
    }

    evaluate(params, cb) {
        axios.post('case/evaluate', params).then((result) => {
            console.log('case/evaluate: ' + JSON.stringify(result.data))
            cb(result.data.errors, result.data.model)
        }).catch(err => {
            cb(err)
        })
    }

}