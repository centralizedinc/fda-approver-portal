import axios from 'axios';
import BaseURL from '../utils/BaseURL';

export default class CertificateAPI {
    constructor(token) {
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getInbox(cb) {
        return axios.get('cpr-api/case/inbox')
    }

    getParticipated(cb) {
        return axios.get('cpr-api/case/participated')
    }

    getUnassigned(cb) {
        return axios.get('cpr-api/case/unassigned')
    }

    claim(case_no) {
        return axios.get('cpr-api/case/claim/' + case_no)
    }

    unclaim(case_no) {
        return axios.get('cpr-api/case/unclaim/' + case_no)
    }

    evaluate(params) {
        return axios.post('cpr-api/case/evaluate', params)
    }

}