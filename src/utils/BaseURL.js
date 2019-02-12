'use strict'

var baseUrl = 'https://fda-services.herokuapp.com/v1.0'
var localhost = 'http://localhost:3000'

var license = baseUrl + '/lto-api';
var certificate = baseUrl + '/cpr-api';
var accounts_public = baseUrl + '/public/accounts';
var accounts_secured = baseUrl + '/secured/accounts';
var auth = baseUrl + '/public/accounts';

export default {
    baseUrl,
    license,
    certificate,
    accounts_public,
    accounts_secured,
    auth,
    localhost
}