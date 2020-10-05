import tokenServices from "./tokenServices";
// import user from "../../models/user";

const BASE_URL = '/api/users/'


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
}

async function getUser(userData) {
    let googleId = await tokenServices.getIdFromToken()
    let user;
    if (googleId) {
        user = await SignupOrLogin(userData)
    }
    console.log('user', user)
    return user;
}


export default { 
    AuthenticateGoogleUser,
    getUser
}
