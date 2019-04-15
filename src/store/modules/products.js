import ProductApi from '../../api/ProductApi';

const state = {
    productType: [],
    primaryActivity: [],
    secondaryActivity: [],
    additional: [],
    declared: [],
    declaredCapital: [],
    prod_line: []
}

const mutations = {
    SET_PRODUCT_TYPE(state, productType) {
        state.productType = productType;
    },
    SET_PRIMARY_ACTIVITY(state, primaryActivity) {
        state.primaryActivity = primaryActivity;
    },
    SET_SECONDARY_ACTIVITY(state, secondaryActivity) {
        state.secondaryActivity = secondaryActivity;
    },
    SET_ADDITIONAL(state, additional) {
        state.additional = additional;
    },
    SET_DECLARED(state, declared) {
        state.declared = declared;
    },
    SET_ALL_DECLARED(state, declaredCapital) {
        state.declaredCapital = declaredCapital;
    },
    SET_PROD_LINE(state, prod_line) {
        state.prod_line = prod_line;
    },
    CLEAR_DATA(state) {
        state.productType = []
        state.primaryActivity = []
        state.secondaryActivity = []
        state.additional = []
        state.declared = []
        state.declaredCapital = []
        state.prod_line = []
    }
}

var actions = {
    GET_PRODUCT_REFERENCE(context) {
        const ProductAPI = new ProductApi(context.rootState.user_session.token);
        var products = {};
        return new Promise((resolve, reject) => {
            ProductAPI.getProductType()
                .then((result) => {
                    if (result.data.success) {
                        products.product_type = result.data.model;
                        context.commit("SET_PRODUCT_TYPE", result.data.model);
                        return ProductAPI.getPrimary()
                    } else {
                        reject(result.data.errors);
                    }
                })
                .then((result) => {
                    if (result.data.success) {
                        products.primary = result.data.model;
                        context.commit("SET_PRIMARY_ACTIVITY", result.data.model);
                        return ProductAPI.getAdditional()
                    } else {
                        reject(result.data.errors);
                    }
                })
                .then((result) => {
                    if (result.data.success) {
                        products.additional = result.data.model;
                        context.commit("SET_ADDITIONAL", result.data.model);
                        return ProductAPI.getDeclaredCapital()
                    } else {
                        reject(result.data.errors);
                    }
                })
                .then((result) => {
                    if (result.data.success) {
                        products.declared = result.data.model;
                        context.commit("SET_DECLARED", result.data.model);
                        return ProductAPI.getProductLine()
                    } else {
                        reject(result.data.errors);
                    }
                })
                .then((result) => {
                    if (result.data.success) {
                        products.prod_line = result.data.model;
                        context.commit("SET_PROD_LINE", result.data.model);
                        resolve(products)
                    } else {
                        reject(result.data.errors);
                    }
                })
                .catch((err) => {
                    console.log('err in getting products references :', err);
                    reject(err);
                });
        })
    },
    GET_PRODUCT_TYPE(context) {
        return new Promise((resolve, reject) => {
            new ProductApi(context.rootState.user_session.token).productType((productType, err) => {
                if (!err) {
                    context.commit('SET_PRODUCT_TYPE', productType)
                    resolve()
                } else {
                    reject(err)
                }
            })
        })

    },
    GET_PRIMARY_ACTIVITY(context, product) {
        return new Promise((resolve, reject) => {
            new ProductApi(context.rootState.user_session.token).primary(product, (productType, err) => {
                if (!err) {
                    context.commit('SET_PRIMARY_ACTIVITY', productType)
                    resolve()
                } else {
                    reject(err)
                }
            })
        })
    },
    GET_SECONDARY_ACTIVITY(context, primaryActivity) {
        return new Promise((resolve, reject) => {
            new ProductApi(context.rootState.user_session.token).secondary(primaryActivity, (primaryActivity, err) => {
                if (!err) {
                    context.commit('SET_SECONDARY_ACTIVITY', primaryActivity)
                    resolve();
                } else {
                    reject();
                }
            })
        })
    },
    GET_ADDITIONAL(context, primaryActivity) {
        return new Promise((resolve, reject) => {
            new ProductApi(context.rootState.user_session.token).additional(primaryActivity, (primaryActivity, err) => {
                if (!err) {
                    context.commit('SET_ADDITIONAL', primaryActivity)
                    resolve();
                } else {
                    reject()
                }
            })
        })
    },
    GET_DECLARED(context, primaryActivity) {
        return new Promise((resolve, reject) => {
            new ProductApi(context.rootState.user_session.token).declared(primaryActivity, (primaryActivity, err) => {
                if (!err) {
                    context.commit('SET_DECLARED', primaryActivity)
                    resolve()
                } else {
                    reject()
                }
            })
        })
    },
    GET_ALL_DECLARED(context) {
        return new Promise((resolve, reject) => {
            new ProductApi(context.rootState.user_session.token).getDeclared((declaredCapital, err) => {
                if (!err) {
                    context.commit('SET_ALL_DECLARED', declaredCapital)
                    resolve()
                } else {
                    reject()
                }
            })
        })
    },
    GET_PROD_LINE(context) {
        return new Promise((resolve, reject) => {
            new ProductApi(context.rootState.user_session.token).prodline((productType, err) => {
                if (!err) {

                    context.commit('SET_PROD_LINE', productType)
                    resolve(productType)
                } else {
                    reject(err)
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