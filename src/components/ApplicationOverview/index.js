import tabscomponents from './tabs'
var tabs = Object.assign({
    ApplicationOverview: () => import('./ApplicationOverview')
}, tabscomponents);
export default tabs