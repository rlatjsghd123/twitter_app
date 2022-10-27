import React,{ useEffect, useState } from 'react'
import AppRouter from 'Router';
import { authService } from 'fbase';
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [login, setLogin] = useState(false);
  const [init,setInit] = useState(false)
  const [userObj,setUserObj] = useState(null); // 로그인한 사용자 정보
  useEffect(()=>{
    onAuthStateChanged(authService, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setLogin(user);
        setUserObj(user);
        const uid = user.uid;
        // ...
      } else {
        setLogin(false);
        // User is signed out
        // ...
      }
      setInit(true);
    });
  },[])
  return (
    <>
    { init ? <AppRouter login={login} userObj={userObj} /> : "initializing..." }
    <footer>&copy; {new Date().getFullYear()} Twitter app</footer>
    </>
  )
}

export default  App;

