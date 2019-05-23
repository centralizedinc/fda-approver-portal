import axios from 'axios';
import BaseURL from '../utils/BaseURL';

export default class LicenseAPI {
    constructor(token) {
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI
        // axios.defaults.baseURL = 'http://localhost:3000/'
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getLicenses(cb) {
        axios.get('/lto-api').then((result) => {
            cb(result.data.errors, result.data.model)
        }).catch(err => {
            cb(err)
        })
    }

    getLicensesByCase(case_id, cb) {
        axios.get('/lto-api/case_id/' + case_id).then((result) => {
            cb(result.data.errors, result.data.model)
        }).catch(err => {
            cb(err)
        })
    }

    getLicenseByCaseNo(case_no) {
        return axios.get('/lto-api/case_no/' + case_no)
    }

    getManyLicensesByCase(cases_id, cb) {
        axios.post('/lto-api/cases', cases_id).then((result) => {
            cb(result.data.errors, result.data.model)
        }).catch(err => {
            cb(err)
        })
    }

    getChecklistByTask(task_id, cb) {
        axios.get('/lto-api/checklist/task/' + task_id).then((result) => {
            cb(result.data.errors, result.data.model)
        }).catch(err => {
            cb(err)
        })
    }

    getRecommendedTasks(task_id, cb) {
        axios.get('/lto-api/task/recommended/' + task_id).then((result) => {
            cb(result.data.errors, result.data.model)
        }).catch(err => {
            cb(err)
        })
    }

    getInbox() {
        return axios.get('/lto-api/case/inbox')
    }

    getParticipated() {
        return axios.get('/lto-api/case/participated')
    }

    getUnassigned() {
        return axios.get('/lto-api/case/unassigned')
    }

    claim(case_no) {
        return axios.get('/lto-api/case/claim/' + case_no)
    }

    unclaim(case_no) {
        return axios.get('/lto-api/case/unclaim/' + case_no)
    }

    evaluate(params) {
        return axios.post('/lto-api/case/evaluate', params)
    }

    addDocuments(license, formData) {
        return new Promise((resolve, reject) => {
            axios.post('documents/uploads?account_id=' + license.case_no, formData)
                .then(result => {
                    console.log(JSON.stringify(result))
                    var files = result.data.model
                    var output_files = license.output_files.concat(files)
                    if (result.data.success) {
                        return axios.post('lto-api/' + license._id, {
                            output_files
                        })
                    } else {
                        reject()
                        return
                    }
                })
                .then(updated => {
                    console.log(JSON.stringify(updated))
                    if (updated) {
                        resolve(updated)
                    } else {
                        reject()
                    }
                })
                .catch(err => {
                    console.log(err)
                    reject(err)
                })
        })
    }
}