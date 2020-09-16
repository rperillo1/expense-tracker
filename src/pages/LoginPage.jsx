import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import userServices from '../utils/userServices'

// refresh token
// import { refreshTokenSetup } from '../utils/tokenServices';


const clientId = `'${process.env.REACT_APP_GOOGLE_CLIENT_ID}'`


function LoginPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const login = res => {
        console.log('RES', res)
        userServices.PostData(res.profileObj)
            .then((result) => {
                let responseJSON = result;
                console.log('response JSON', responseJSON)
                if (responseJSON) {
                    sessionStorage.setItem('token', JSON.stringify(responseJSON));
                    setIsLoggedIn(true);
                }
            });
    };


    const onSuccess = (res) => {
        login(res);
        console.log('Login Success: currentUser:', res.profileObj.name);
        // refreshTokenSetup(res);
    };

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
    };


    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                responseType='token'
                style={{ marginTop: '100px' }}
                isSignedIn={true}
            />
            {isLoggedIn ?
                <h1>You're logged in dawg</h1>
                :
                <h2>Not Logged in</h2>
            }
        </div>
    );
}

export default LoginPage;