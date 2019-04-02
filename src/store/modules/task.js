import TaskAPI from '@/api/TaskAPI';

const state = {
    license_tasks: [],
    certificate_tasks: []
}

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
    }
}

var actions = {
    GET_TASKS(context) {
        if (context.rootState.user_session.token) {
            return new Promise((resolve, reject) => {
                new TaskAPI(context.rootState.user_session.token).getTasksLicense(function (err, tasks) {
                    if (!err) {
                        context.commit('SET_LICENSE_TASKS', tasks)
                        resolve(tasks);
                    } else {
                        reject(err);
                    }
                })
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