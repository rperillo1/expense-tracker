import React from 'react';
import { GoogleLogin } from 'react-google-login';
import UserList from '../components/UserList';


// refresh token
// import { refreshTokenSetup } from '../utils/tokenServices';


const clientId = `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`

function LoginPage({ authenticateUser }) {


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
                // isSignedIn={true}
            />
            <UserList></UserList>
        </div>
    );
}

export default LoginPage;