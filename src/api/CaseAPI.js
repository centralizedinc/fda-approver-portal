import axios from 'axios';

// axios.defaults.headers.common['access_token'] = store.state.user

export default class CaseAPI {
    constructor(token) {
        axios.defaults.baseURL = 'https://fda-services.herokuapp.com/v1.0';
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    getLicenseCases() {
        return axios.get('lto-api/case');
    }

    getComply() {
        return axios.get('lto-api/case/compliance')
    }

    getCertificateCases(cb) {
        cb();
        // axios.get('lto-api/case').then((result) => {
        //     cb(result.data.errors, result.data.model)
        // }).catch(err => {
        //     console.log('######getLicenseCases error :',err)
        //     cb(err)
        // })
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
        console.log('compliance :', compliance);
        return axios.post("lto-api/case/compliance", compliance)
    }

    applyLicense(lic_data) {
        var saved_license = {};
        var lic_case = {}
        return new Promise((resolve, reject) => {
            axios.post('lto-api/', lic_data.license)
                // Save License Application first
                .then(result1 => {
                    console.log("RESULT SAVING LICENSE: " + JSON.stringify(result1.data))
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
                    console.log("RESULT UPLOADING FILES: " + JSON.stringify(result2.data))
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
                    console.log("RESULT UPDATING LICENSE: " + JSON.stringify(result3.data))
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
}