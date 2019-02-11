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
        axios.get('case/inbox').then((result) => {
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
        console.log('participated: ' + axios.defaults.headers.common['access_token']);

        axios.get('case/participated').then((result) => {
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
        axios.get('case/unassigned').then((result) => {
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
        axios.post('case/claim', {
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
        axios.get('case/evaluation').then((result) => {
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