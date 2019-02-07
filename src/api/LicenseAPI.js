import axios from 'axios';

export default class LicenseAPI {
    constructor(token) {
        axios.defaults.baseURL = 'https://fda-services.herokuapp.com/v1.0/lto-api';
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getLicenses(cb) {
        axios.get('/').then((result) => {
            console.log('get licenses: ' + JSON.stringify(result.data.model));
            if (result.data.success) {
                cb(result.data.model)
            } else {
                cb(null, result.data.errors)
            }
        }).catch(err => {
            cb(null, err)
        })
    }

    getInbox(cb) {
        console.log('enter claim')
        axios.get('claim').then((result) => {
            console.log('claim: ' + JSON.stringify(result.data))
            if (result.data.success) {
                cb(result.data.model)
            } else {
                cb(null, result.data.errors)
            }
        }).catch(err => {
            cb(null, err)
        })
    }

    getParticipated(cb) {
        axios.get('participated').then((result) => {
            if (result.data.success) {
                cb(result.data.model)
            } else {
                cb(null, result.data.errors)
            }
        }).catch(err => {
            cb(null, err)
        })
    }

    getUnassigned(cb) {
        axios.get('unassigned').then((result) => {
            if (result.data.success) {
                cb(result.data.model)
            } else {
                cb(null, result.data.errors)
            }
        }).catch(err => {
            cb(null, err)
        })
    }

    claim(claimed_id, cb) {
        axios.post('claim', {
            id: claimed_id
        }).then((result) => {
            if (result.data.success) {
                cb(result.data.model)
            } else {
                cb(null, result.data.errors)
            }
        }).catch(err => {
            cb(null, err)
        })
    }

    evaluate(cb) {
        axios.get('evaluation').then((result) => {
            if (result.data.success) {
                cb(result.data.model)
            } else {
                cb(null, result.data.errors)
            }
        }).catch(err => {
            cb(null, err)
        })
    }
}