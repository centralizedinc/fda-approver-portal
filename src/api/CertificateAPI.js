import axios from 'axios';
import BaseURL from '../utils/BaseURL';

export default class CertificateAPI {
    constructor(token) {
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getInbox() {
        return axios.get('certificates/case/inbox')
    }

    getParticipated() {
        return axios.get('certificates/case/participated')
    }

    getUnassigned() {
        return axios.get('certificates/case/unassigned')
    }

    claim(case_no) {
        return axios.get('certificates/case/claim/' + case_no)
    }

    unclaim(case_no) {
        return axios.get('certificates/case/unclaim/' + case_no)
    }

    evaluate(params) {
        return axios.post('certificates/case/evaluate', params)
    }

    getCertificateByCaseNo(case_no) {
        return axios.get('certificates/case_no/' + case_no)
    }

    getCertificatesByCaseNos(case_nos) {
        return axios.post('certificates/cases', case_nos)
    }

    getChecklistByTask(task_id) {
        return axios.get('certificates/checklist/task/' + task_id)
    }

    getRecommendedTasks(task_id) {
        return axios.get('certificates/task/recommended/' + task_id)
    }

    addDocuments(certificate, formData) {
        return new Promise((resolve, reject) => {
            axios.post('documents/uploads?account_id=' + certificate.case_no, formData)
                .then(result => {
                    console.log(JSON.stringify(result))
                    var files = result.data.model
                    var output_files = certificate.output_files.concat(files)
                    if (result.data.success) {
                        return axios.post('certificates/' + certificate._id, {
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