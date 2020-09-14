import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import userServices from '../utils/userServices'

// refresh token
// import { refreshTokenSetup } from '../utils/refreshToken';

const clientId =
    '742998896262-rce3fctlgmuekqe0ekud1d8aglnsoreg.apps.googleusercontent.com';

function LoginPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const login = res => {
        console.log('RES', res.profileObj)
        userServices.PostData(res.profileObj)
        .then((result) => {
            let responseJSON = result;
            if (responseJSON) {
                sessionStorage.setItem('userData', JSON.stringify(responseJSON));
                setIsLoggedIn(true);
            }
        })
    }


    const onSuccess = (res) => {
        console.log('Login Success: currentUser:', res);
        alert(
            `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
        );
        login(res);
        // refreshTokenSetup(res);
    };

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
        alert(
            `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
        );
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
            { isLoggedIn ? 
            <h1>You're logged in dawg</h1>    
            :
            <h2>Not Logged in</h2>
        }
        </div>
    );
}

export default LoginPage;