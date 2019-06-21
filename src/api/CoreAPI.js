import axios from 'axios';
import BaseURL from '../utils/BaseURL';

export default class CoreAPI {
    constructor(token) {
        axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI
        axios.defaults.headers.common['Content-Type'] = 'application/json'
        axios.defaults.headers.common['access_token'] = token;
    }

    addBatch(batch, cb) {
        axios.post("/core/batch", batch)
            .then(result => {
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                console.log('err addBatch: ' + err)
                cb(err)
            });
    }

    getBatch(cb) {
        axios.get("/core/batch")
            .then(result => {
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                console.log('err getBatch: ' + err)
                cb(err)
            });
    }

    getPrints(cb) {
        axios.get("/core/prints")
            .then(result => {
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                console.log('err getPrints : ' + err)
                cb(err)
            });
    }

    rePrint(params, cb) {
        axios.post("/core/prints/reprint", params)
            .then(result => {
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                console.log('err rePrint : ' + err)
                cb(err)
            });
    }

    getPrimary(cb) {
        axios.get("/core/primary")
            .then(result => {
                cb(result.data.errors, result.data.model)
            })
            .catch(err => {
                console.log('err license tasks: ' + err)
                cb(err)
            });
    }

    getAdditionals() {
        return axios.get('/core/additional');
    }

    getIdType() {
        return axios.get('/core/identification');
    }

    getDesignation() {
        return axios.get('/core/designation');
    }

    getCountryOrigin(){
        console.log("GETTING Country origin datas ....");
        return axios.get('/core/origin')
    }
    getCompanyActivity(){
        console.log('GETTING COMPANY ACTIVITY data ....')
        return axios.get('core/company/activity')
    }
    getSourceType(){
        console.log("GETTING Source datas ....");
        return axios.get('/core/source')
    }
    getFoodProduct(){
        console.log("GETTING Food Product datas ....");
        return axios.get('/core/food/product')
    }
    getFoodCategory(){
        console.log("GETTING Food Category datas ....");
        return axios.get('/core/food/category')
    }
}