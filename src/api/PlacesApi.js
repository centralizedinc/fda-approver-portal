import axios from 'axios';

axios.defaults.baseURL = 'https://fda-services.herokuapp.com/v1.0'

export default class RegionType {
    constructor(token) {
        this.token = token;
        axios.defaults.headers.common['Content-Type'] = 'application/json'
    }
    //REGION
    getRegion(cb) {
        axios.get('core/regions').then((result) => {
                console.log("###API:REGION###")
                if (result.data.success) {
                    cb(result.data.errors, result.data.model)
                } else {
                    cb(result.data.errors)
                }
            })
            .catch(err => {
                cb(err)
            });
    }
    //PROVINCE

    getProvince(region_id, cb) {
        axios.get('core/provinces/' + region_id).then((result) => {
                console.log("###API:PROVINCE###")
                if (result.data.success) {
                    cb(result.data.errors, result.data.model)
                } else {
                    cb(result.data.errors)
                }
            })
            .catch(err => {
                cb(err)
            })
    }
    //CITY
    getCity(province_id, cb) {
        axios.get('core/city' + province_id).then((result) => {
                console.log("###API:CITY###")
                if (result.data.success) {
                    cb(result.data.errors, result.data.model)
                } else {
                    cb(result.data.errors)
                }
            })
            .catch(err => {
                cb(err)
            })
    }

    
    /**
     * @description promised based method for retrieving regions
     * @returns {Promise}
     */
     getRegions(){
         return axios.get('core/regions')
     }

     /**
     * @description promised based method for retrieving provinces
     * @returns {Promise}
     */
    getProvinces(){
        return axios.get('core/provinces')
    }

    /**
     * @description promised based method for retrieving cities
     * @returns {Promise}
     */
    getCities(){
        return axios.get('core/city')
    }
}