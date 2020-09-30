import tokenServices from "./tokenServices";

const BASE_URL = '/api/users/'

function SignupOrLogin(userData) {
    return fetch(BASE_URL + 'login', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(userData)
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Unsuccessful Login!', res);
    })
    //MISSING - SET TOKEN (DONT NEED?)
}

function AuthenticateGoogleUser(userData) {
    return fetch(BASE_URL + 'authenticate', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(userData)
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Bad Credentials!');
    })
}

function getToken() {
    return tokenServices.getToken()
}

function getUserInfo(token) {
    return fetch(BASE_URL + 'login', {
        headers: new Headers({ 'Content-Type': 'application/json' }),
    })
    .then(res => {
        if (res.ok) return res.json();
        throw new Error('Unable To Fetch User Info');
    })
}


export default { 
    SignupOrLogin,
    AuthenticateGoogleUser,
    getUserInfo,
    getToken
}
