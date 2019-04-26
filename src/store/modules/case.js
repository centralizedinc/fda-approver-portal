import CaseAPI from '../../api/CaseAPI';

function initialState() {
    return {
        case_details: {
            activities: []
        },
        form_details: {
            general_info: {},
            estab_details: {},
            auth_officer: {
                mail_add: {}
            },
            qualified: [],
            address_list: []
        },
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
    SET_FORM(state, form_details) {
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
        // temporary license only
        return new Promise((resolve, reject) => {
            var form = {}
            console.log('license :', context.state.case_details.case_no);
            context.dispatch("GET_LICENSE_BY_CASE_NO",
                    context.state.case_details.case_no, {
                        root: true
                    })
                .then(license => {
                    form.license = license;
                    context.commit('SET_FORM', license);
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
                    form.payments = payments;
                    context.commit('SHOW_REVIEW')
                    resolve(form);
                })
                .catch(err => {
                    reject(err)
                });
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