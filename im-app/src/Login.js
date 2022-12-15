import { Button } from '@mui/material'
import React from 'react'
import { auth, provider } from './firebase';
import "./login.css";
import logo from './logo.png';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

function Login() {
    const [{} , dispatch] = useStateValue();

    const signIN = () => {
        auth.signInWithPopup(provider).then(result => 
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })
            ).catch((error) => alert(error.message));
    };

  return (
    <div className='login'>
        <div class="login_inner">
            <img src={logo} alt=''/>
            
            <Button onClick={signIN}>
                Sign in with Google
            </Button>
        </div>
    </div>
  )
}

export default Login