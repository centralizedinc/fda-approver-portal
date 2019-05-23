import TaskAPI from '../../api/TaskAPI';

function initialState() {
    return {
        license_tasks: [],
        certificate_tasks: []
    }
}

const state = initialState()

const mutations = {
    SET_LICENSE_TASKS(state, tasks) {
        state.license_tasks = tasks;
    },
    CLEAR_LICENSE_TASKS(state, tasks) {
        state.license_tasks = [];
    },
    SET_CERTIFICATE_TASKS(state, tasks) {
        state.certificate_tasks = tasks;
    },
    CLEAR_CERTIFICATE_TASKS(state, tasks) {
        state.certificate_tasks = [];
    },

    RESET(state) {
        const s = initialState()
        Object.keys(s).forEach(key => {
            state[key] = s[key]
        })
    }
}

var actions = {
    GET_TASKS(context) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                var TaskApi = new TaskAPI(context.rootState.user_session.token);
                TaskApi.getTasksLicense()
                    .then((result) => {
                        console.log('tasks :', result.data.model);
                        context.commit('SET_LICENSE_TASKS', result.data.model)
                        resolve()
                        // return TaskApi.getTasksCertificate()
                    })
                    // .then((tasks) => {
                    //     context.commit('SET_CERTIFICATE_TASKS', tasks)
                    //     resolve()
                    // })
                    .catch((err) => {
                        reject(err)
                    });
            });
        }
    },
    GET_TASK_BY_ID(context, task) {
        return new TaskAPI(context.rootState.user_session.token).getTaskById(task)
    }
}

export default {
    state,
    mutations,
    actions
}