import axios from 'axios';

axios.defaults.baseURL = 'https://fda-services.herokuapp.com/v1.0';

export default class LicenseAPI {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getLicenses(cb) {
        axios.get('lto-api').then((result) => {
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
        axios.get('lto-api/claim').then((result) => {
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
        axios.get('lto-api/participated').then((result) => {
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
        axios.get('lto-api/unassigned').then((result) => {
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
        axios.get('lto-api/evaluation').then((result) => {
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