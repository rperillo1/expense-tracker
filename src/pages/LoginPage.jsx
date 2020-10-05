import React, { useState, useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import userServices from '../utils/userServices'
import tokenServices from '../utils/tokenServices'

// refresh token
// import { refreshTokenSetup } from '../utils/tokenServices';


const clientId = `'${process.env.REACT_APP_GOOGLE_CLIENT_ID}'`

function LoginPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState({})

    // useEffect(() => {
    //     if (!user.name) {
    //         getUser()
    //     }
    // })

    // GET USER NEEDS TO TAKE THE STORAGE TOKEN AND VERIFY IF ITS VALID STILL THEN SEARCH DB FOR THE USER
    // IT SHOULDNT TAKE IN USER DATA. 
    // const getUser = async () => {
    //     try {
    //         let user = await userServices.getUser()
    //         console.log('user2', user)
    //         setUser(user);
    //     } catch (err) {
    //         console.log('log in again', err)
    //     }
    // }


    const authenticateUser = res => {
        console.log('RES', res)
        userServices.AuthenticateGoogleUser(res)
            .then((result) => {
                console.log(result)
                sessionStorage.setItem('token', JSON.stringify(result.token));
                setUser(result.user);
                setIsAuthenticated(true);
            })
    };


    const onSuccess = (res) => {
        authenticateUser(res);
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
            {isAuthenticated ?
                <h1>You're logged in dawg</h1>
                :
                <h2>Not Logged in</h2>
            }
        </div>
    );
}

export default LoginPage;