import axios from 'axios';

// axios.defaults.headers.common['access_token'] = store.state.user

export default class CaseAPI {
    constructor(token) {
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getLicenseCases() {
        return axios.get('lto-api/case');
    }

    getComply() {
        return axios.get('lto-api/case/compliance')
    }

    uploadFile(comply) {
        return axios.post('documents/uploads?account_id=' + comply.case_no, comply.form_data)
    }

    /**
     * 
     * @param {Object} comply {case_id, case_no, form_data, remarks}
     * @param {*} cb 
     */
    submitCompliance(compliance) {
        return axios.post("lto-api/case/compliance", compliance)
    }

    applyLicense(lic_data) {
        var saved_license = {};
        var lic_case = {}
        return new Promise((resolve, reject) => {
            axios.post('lto-api/', lic_data.license)
                // Save License Application first
                .then(result1 => {
                    if (result1.data.success) {
                        lic_case = result1.data;
                        saved_license = result1.data.model.license;
                        return axios.post('documents/uploads?account_id=' + saved_license.case_no, lic_data.upload)
                    } else {
                        resolve(result1.data)
                    }
                })
                // upload file attachments to AWS S3
                .then(result2 => {
                    var files = result2.data.model
                    saved_license.uploaded_files = files;
                    if (result2.data.success) {
                        return axios.post('lto-api/' + saved_license._id, saved_license)
                    } else {
                        resolve(result2.data)
                    }

                })
                // update license application merging uploaded files
                .then(result3 => {
                    lic_case.license = result3.data.model;
                    resolve(lic_case)

                })
                .catch(err => {
                    reject(err)
                })
        })



    }

    getActivities() {
        return axios.get('lto-api/case/activities');
    }

    checkReviewAccess(case_no, access){
        return axios.get('lto-api/case/checkaccess/' + case_no + "/" + access)
    }
}