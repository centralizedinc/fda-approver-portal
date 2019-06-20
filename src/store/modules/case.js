import CaseAPI from '../../api/CaseAPI';

function initialState() {
    return {
        case_details: {
            activities: []
        },
        form_details: {},
        cases: [],
        complied: [],
        overview: null,
        review: false,
        review_access: null
    }
}

const state = initialState()

const mutations = {
    SET_CASES(state, cases) {
        state.cases = cases;
    },
    SET_COMPLY(state, cases) {
        state.complied = cases;
    },
    SET_CASE(state, case_details) {
        state.case_details = case_details
    },
    SET_FORM_LICENSE(state, form_details) {
        console.log('form_details :', form_details);
        if (!form_details.general_info) form_details.general_info = {}
        if (!form_details.estab_details) form_details.estab_details = {}
        if (!form_details.auth_officer) {
            form_details.auth_officer = {
                mail_add: {}
            }
        } else if (!form_details.auth_officer.mail_add) form_details.auth_officer.mail_add = {}
        if (!form_details.qualified) form_details.qualified = []
        if (!form_details.address_list) form_details.address_list = []
        if (!form_details.uploaded_files) form_details.uploaded_files = []
        if (!form_details.output_files) form_details.output_files = []
        state.form_details = form_details
    },
    SET_FORM_CERTIFICATE(state, form_details) {
        console.log('form_details :', form_details);
        if (!form_details.general_info) {
            form_details.general_info = {
                for_ammendment_renewal: {},
                for_reapplication: {}
            }
        } else if (!form_details.general_info.for_ammendment_renewal)
            form_details.general_info.for_ammendment_renewal = {}
        else if (!form_details.general_info.for_reapplication)
            form_details.general_info.for_reapplication = {}
        if (!form_details.claims) form_details.claims = []
        if (!form_details.documentary) form_details.documentary = []
        if (!form_details.establisment_info) form_details.establisment_info = []
        if (!form_details.food_product) {
            form_details.food_product = {
                contacts: []
            }
        } else if (!form_details.food_product.contacts || !form_details.food_product.contacts.length)
            form_details.food_product.contacts = []
        if (!form_details.for_ammendment) form_details.for_ammendment = []
        if (!form_details.ingredients) form_details.ingredients = []
        if (!form_details.nutrition_info) {
            form_details.nutrition_info = {
                servings: []
            }
        } else if (form_details.nutrition_info.servings)
            form_details.nutrition_info.servings = []
        if (!form_details.product_specification) {
            form_details.product_specification = {
                physical: {},
                chemical: [],
                microbiological: []
            }
        } else if (!form_details.product_specification.physical)
            form_details.product_specification.physical = {}
        else if (!form_details.product_specification.chemical || !form_details.product_specification.chemical.length)
            form_details.product_specification.chemical = []
        else if (!form_details.product_specification.microbiological || !form_details.product_specification.microbiological.length)
            form_details.product_specification.microbiological = []
        if (!form_details.shelf) form_details.shelf = []
        if (!form_details.uploaded_files) form_details.uploaded_files = []
        if (!form_details.output_files) form_details.output_files = []
        state.form_details = form_details
    },
    SHOW_OVERVIEW(state) {
        state.overview = true
    },
    CLOSE_OVERVIEW(state) {
        state.overview = false
    },
    SHOW_REVIEW(state) {
        state.review = true
    },
    CLOSE_REVIEW(state) {
        state.review = false
    },
    CLEAR_CASE(state) {
        state.case_details = {}
        state.form_details = {
            general_info: {},
            estab_details: {},
            auth_officer: {
                mail_add: {}
            },
            qualified: []
        }
    },
    SET_REVIEW_ACCESS(state, access) {
        console.log('access :', access);
        state.review_access = access
    },

    RESET(state) {
        const s = initialState()
        Object.keys(s).forEach(key => {
            state[key] = s[key]
        })
    }
}

var actions = {
    GET_CASES(context) {
        return new Promise((resolve, reject) => {
            new CaseAPI(context.rootState.user_session.token).getLicenseCases()
                .then((result) => {
                    if (result.data.success) {
                        context.commit('SET_CASES', result.data.model);
                        resolve(result.data.model)
                    } else {
                        console.log('GET_CASES err :', result.data.errors)
                        reject(result.data.errors)
                    }
                }).catch((err) => {
                    console.log('err :', err);
                    reject(err)
                });
        })
    },
    GET_COMPLY(context) {
        return new Promise((resolve, reject) => {
            new CaseAPI(context.rootState.user_session.token).getComply()
                .then((result) => {
                    if (result.data.success) context.commit('SET_COMPLY', result.data.model);
                    resolve(result.data)
                }).catch((err) => {
                    reject(err)
                });
        })
    },
    SAVE_COMPLY(context, comply) {
        return new Promise((resolve, reject) => {
            var CaseApi = new CaseAPI(context.rootState.user_session.token);
            CaseApi.uploadFile(comply)
                .then((result) => {
                    var files = result.data.model
                    var compliance = {
                        case_id: comply.case_id,
                        remarks: comply.remarks,
                        files: files
                    }
                    return CaseApi.submitCompliance(compliance)
                }).then((result) => {
                    resolve(result.data)
                })
                .catch((err) => {
                    reject(err)
                });
        })
    },
    GET_ACTIVITIES(context) {
        if (context.rootState.user_session.token) {
            return new CaseAPI(context.rootState.user_session.token).getActivities();
        }
    },
    SHOW_REVIEW(context) {
        return new Promise((resolve, reject) => {
            console.log('application :', context.state.case_details.case_type, context.state.case_details.case_no);
            if (context.state.case_details.case_type === 0) { //For License
                context.dispatch("GET_LICENSE_BY_CASE_NO",
                        context.state.case_details.case_no, {
                            root: true
                        })
                    .then(license => {
                        console.log('license :', license);
                        context.commit('SET_FORM_LICENSE', license);
                        return context.dispatch("GET_COMPUTED_FEES", {
                            details: {
                                productType: license.general_info.product_type,
                                primaryActivity: license.general_info.primary_activity,
                                declaredCapital: license.general_info.declared_capital,
                                appType: license.application_type
                            },
                            case_no: context.state.case_details.case_no
                        });
                    })
                    .then(payments => {
                        context.commit('SHOW_REVIEW')
                        resolve();
                    })
                    .catch(err => {
                        reject(err)
                    });
            } else if (context.state.case_details.case_type === 1) { //For Certificate
                context.dispatch("GET_CERTIFICATE_BY_CASE_NO",
                        context.state.case_details.case_no, {
                            root: true
                        })
                    .then(certificate => {
                        console.log('certificate :', certificate);
                        context.commit('SET_FORM_CERTIFICATE', certificate);
                        return context.dispatch("GET_CERTIFICATE_FEES", {
                            application_type: certificate.application_type,
                            product_type: certificate.food_product.type,
                            case_no: context.state.case_details.case_no
                        }, {
                            root: true
                        });
                    })
                    .then(result => {
                        context.commit('SHOW_REVIEW')
                        resolve();
                    })
                    .catch(err => {
                        reject(err)
                    });
            }
        })
    },
    CLOSE_REVIEW_DATA(context) {
        console.log('clearing data');
        context.commit('CLOSE_REVIEW')
        context.commit('CLEAR_CASE')
        context.commit('CLEAR_PAYMENTS')
    },
    CHECK_REVIEW_ACCESS(context) {
        if (context.rootState.user_session.token &&
            context.state.case_details.case_no &&
            context.state.case_details.review_access) {
            new CaseAPI(context.rootState.user_session.token).checkReviewAccess(
                    context.state.case_details.case_no, context.state.case_details.review_access)
                .then((result) => {
                    if (result.data.success) {
                        console.log('result.data.model :', result.data.model);
                        if (!result.data.model.valid) {
                            context.dispatch('CLOSE_REVIEW_DATA', {}, {
                                root: true
                            })
                        }
                    } else {
                        console.log('result.data :', result.data);
                    }
                }).catch((err) => {
                    console.log('err :', err);
                });
        }
    }
}

export default {
    state,
    mutations,
    actions
}