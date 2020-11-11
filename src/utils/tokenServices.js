const jwt = require('jsonwebtoken');
const SECRET = process.env.REACT_APP_GOOGLE_SECRET;

// export const refreshTokenSetup = (res) => {
//     // Timing to renew access token
//     let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

//     const refreshToken = async () => {
//         const newAuthRes = await res.reloadAuthResponse();
//         refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
//         console.log('newAuthRes:', newAuthRes);
//         // saveUserToken(newAuthRes.access_token);  <-- save new token
//         localStorage.setItem('authToken', newAuthRes.id_token);

//         // Setup the other timer after the first one
//         setTimeout(refreshToken, refreshTiming);
//     };

//     // Setup first refresh timer
//     setTimeout(refreshToken, refreshTiming);
// };

export default {
    removeToken,
    getToken,
    getUserFromToken,
    setToken
};

function setToken(user) {
    let token = createJWT(user);
    if (token) {
      sessionStorage.setItem('token', token);
    } else {
      sessionStorage.removeItem('token');
    }
}

function createJWT(user) {
    return jwt.sign(
        { user },  // data payload
        SECRET,
        { expiresIn: '24h' }
    );
}

function getUserFromToken() {
    const token = getToken();
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

function removeToken() {
    sessionStorage.removeItem('token');
}

function getToken() {
    let token = sessionStorage.getItem('token');
    console.log('token from getToken', token)
    if (token) {
        // Check if expired, remove if it is
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('payload exp', payload.exp)
        if (payload.exp < Date.now() / 1000) {
            // token is expired
            sessionStorage.removeItem('token');
            token = null;
        }
    }
    return token;
}

