import axios from 'axios';
import BaseURL from '../utils/BaseURL';

export default class AccountAPI {
    constructor(token) {
        axios.defaults.baseURL = BaseURL.accounts_secured;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getInbox(cb) {
        console.log('enter claim')
        axios.get('case/inbox').then((result) => {
            console.log('account case/inbox: ' + JSON.stringify(result.data))
            cb(result.data.errors, result.data.model)
        }).catch(err => {
            cb(err)
        })
    }

    getParticipated(cb) {
        axios.get('case/participated').then((result) => {
            console.log('account case/participated: ' + JSON.stringify(result.data))
            cb(result.data.errors, result.data.model)
        }).catch(err => {
            cb(err)
        })
    }

    getUnassigned(cb) {
        axios.get('case/unassigned').then((result) => {
            console.log('account case/unassigned: ' + JSON.stringify(result.data))
            cb(result.data.errors, result.data.model)
        }).catch(err => {
            cb(err)
        })
    }

    claim(claimed_id, cb) {
        axios.post('case/claim', {
            id: claimed_id
        }).then((result) => {
            console.log('account case/claim: ' + JSON.stringify(result.data))
            cb(result.data.errors, result.data.model)
        }).catch(err => {
            cb(err)
        })
    }

    evaluate(params, cb) {
        axios.post('case/evaluate', params).then((result) => {
            console.log('account case/evaluate: ' + JSON.stringify(result.data))
            cb(result.data.errors, result.data.model)
        }).catch(err => {
            cb(err)
        })
    }

    getUsers(cb){
        axios.get('users/info').then(result => {
            cb(result.data.errors, result.data.model)
        }).catch(err => {
            cb(err) 
        })
    }

    getAccountsInfo() {
        return axios.get('/users/info')
    }

    getAdminsInfo() {
        return axios.get('/admin/users/info')
    }
}