import React, { useState } from 'react'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged  } from "firebase/auth";
import { async } from '@firebase/util';
import { authService } from 'fbase'

function AuthForm() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [newAccount,setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (e) =>{
        console.log(e.target.name);
        const{target: {name,value}} = e;
        if(name === "email"){
            setEmail(value);
        } else if(name === "password"){
            setPassword(value);
        }
    }

    const onSubmit = async (e) =>{
        e.preventDefault();
        try{
            let data;
            if(newAccount){
                //create newAccount
                data = await createUserWithEmailAndPassword(authService, email, password);
            }else{
                // login
                data = await signInWithEmailAndPassword(authService, email, password)
            }
            console.log(data); // 회원가입을 마친 사용자 정보
        } catch (error) {
            setError(error.message);
        }
    }

    const toggleAccount = () => setNewAccount((prev => !prev)); 


  return (
    <>
        <form onSubmit={onSubmit}>
            <input type="email" name="email" value={email} placeholder='Email' onChange={onChange} required />
            <input type="password" name="password" value={password} placeholder='Password' onChange={onChange} required />
            <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
            {error}
        </form>
        <span onClick={toggleAccount}>{newAccount ? "sign in" : "Create Account"}</span>
    </>
  )
}


export default AuthForm;
