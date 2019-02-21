// const files = require.context('.', false, /\.vue$/)
// const tabs = {};


// files.keys().forEach(key => {
//     if (key === './index.js') return
//     console.log('key :', key);
//     console.log('files(key) :', files(key));
//     tabs[key.replace(/(\.\/|\.vue)/g, '')] = files(key).default
// })

// console.log('files :', JSON.stringify(tabs));


// export default tabs

module.exports = {
    AppData: () => import('./AppData.vue'),
    AppHistory: () => import('./AppHistory.vue'),
    AppSummary: () => import('./AppSummary.vue'),
    OutputDocs: () => import('./OutputDocs.vue'),
    PaymentDetails: () => import('./PaymentDetails.vue'),
    UploadedFiles: () => import('./UploadedFiles.vue'),
}