import React from 'react'
import { authService } from 'fbase'
import { GoogleAuthProvider,GithubAuthProvider,signInWithPopup  } from "firebase/auth";
import AuthForm from 'components/AuthForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../style/auth.scss'

function Auth() {


    const onSocialClick = (e) =>{
        const name = e.target.name;
        let provider;
        if(name == "google"){
           provider = new GoogleAuthProvider();
        } else if(name == "github"){
            provider = new GithubAuthProvider();
        }
    
   const data = signInWithPopup(authService, provider);
    }

  return (
    <div className='authContainer'>
    <FontAwesomeIcon icon="fa-brands fa-twitter" color={"#04aaff"} size="3x" style={{marginBottom:30}} />
        <AuthForm />
        <div className='authBtns'>
            <button onClick={onSocialClick} name="google" className='authBtn' >
            <FontAwesomeIcon icon="fa-brands fa-google" />
              Continue with Google</button>
            <button onClick={onSocialClick} name="github" className='authBtn' >
            <FontAwesomeIcon icon="fa-brands fa-github" />
              Continue with Github</button>
        </div>
    </div>
  )
}

export default Auth;