import axios from 'axios';
import BaseURL from '../utils/BaseURL';

export default class CertificateAPI {
    constructor(token) {
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getInbox() {
        return axios.get('certificate/case/inbox')
    }

    getParticipated() {
        return axios.get('certificate/case/participated')
    }

    getUnassigned() {
        return axios.get('certificate/case/unassigned')
    }

    claim(case_no) {
        return axios.get('certificate/case/claim/' + case_no)
    }

    unclaim(case_no) {
        return axios.get('certificate/case/unclaim/' + case_no)
    }

    evaluate(params) {
        return axios.post('certificate/case/evaluate', params)
    }

}