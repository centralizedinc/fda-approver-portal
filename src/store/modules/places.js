import PlacesApi from '../../api/PlacesApi';

const state = {
    regions: [],
    provinces: [],
    city: []
}

const mutations = {
    //SET REGION
    SET_REGION(state, data) {
        state.regions = data
    },
    //SET PROVINCE
    SET_PROVINCE(state, data) {
        state.provinces = data
    },
    //SET CITY
    SET_CITY(state, data) {
        state.city = data
    },
    CLEAR_DATA(state) {
        state.regions = []
        state.provinces = []
        state.city = []
    }
}

var actions = {

    GET_PLACES_REFERENCE(context) {
        const placesAPI = new PlacesApi(context.rootState.user_session.token);
        var locations = {};
        return new Promise((resolve, reject) => {

            placesAPI.getRegions()
                .then(regions => {
                    if (regions.data.success) {
                        locations.regions = regions.data.model;
                        context.commit('SET_REGION', regions.data.model)
                        return placesAPI.getProvinces()
                    } else {
                        resolve(null)
                    }
                })
                .then(provinces => {
                    if (provinces.data.success) {
                        locations.provinces = provinces.data.model;
                        context.commit('SET_PROVINCE', provinces.data.model)
                        return placesAPI.getCities()
                    } else {
                        resolve(null)
                    }
                })
                .then(cities => {
                    if (cities.data.success) {
                        locations.cities = cities.data.model
                        context.commit('SET_CITY', cities.data.model)
                        resolve(locations)
                    } else {
                        resolve(null)
                    }
                })
                .catch(err => {
                    reject(err)
                })

        })



    },

    // REGION
    GET_REGION(context) {
        return new Promise((resolve, reject) => {
            new PlacesApi(context.rootState.user_session.token).getRegion((err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_REGION', data)
                    resolve(data)
                }
            })
        })
    },
    //PROVINCE
    GET_PROVINCE(context, regionId) {
        return new Promise((resolve, reject) => {
            new PlacesApi(context.rootState.user_session.token).getProvince(regionId, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_PROVINCE', data)
                    resolve(data)
                }
            })
        })
    },
    //CITY
    GET_CITY(context, provinceId) {
        return new Promise((resolve, reject) => {
            new PlacesApi(context.rootState.user_session.token).getCity(provinceId, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    context.commit('SET_CITY', data)
                    resolve(data)
                }
            })
        })
    }
}

export default {
    state,
    mutations,
    actions
}