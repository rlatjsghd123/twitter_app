import React, { useEffect, useState } from 'react';
import {authService, db} from 'fbase';
import {useNavigate} from 'react-router-dom';
import { collection, addDoc, query, getDocs, onSnapshot,where,orderBy} from "firebase/firestore";
import Tweet from 'components/Tweet';
import { updateProfile } from "firebase/auth";
import { async } from '@firebase/util';


function Profiles({userObj}) {
  const [tweets,setTweets] = useState([]);
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const navigate = useNavigate();
  const onLogOutClick = () =>{
    authService.signOut();
    navigate("/");
  }
  const getMyTweets = async() =>{
  const q = query(collection(db, "tweets"),
    where("createId", "==" ,userObj.uid),
    orderBy("createAt","asc"))
    const querySnapshot = await getDocs(q);
    const newArray = [];
    querySnapshot.forEach((doc) => {
      newArray.push({...doc.data(), id:doc.id});
    setTweets(newArray);
    });
  }

  useEffect(()=>{
    getMyTweets();
  },[])

  const onChange = (e) =>{
    const value = e.target.value;
    setNewDisplayName(value);
  }
  const onSubmit = async(e) =>{
    e.preventDefault();
    if(userObj.displayName != newDisplayName){
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName, photoURL: ""
      });
    }
  }
  return (
    <>
    <form onSubmit={onSubmit}>
      <input type="text" placeholder='Display name' onChange={onChange} value={newDisplayName} />
      <input type="submit" value="Update Profile" />
    </form>
    <button onClick={onLogOutClick}>Log Out</button>
    <div>
    {tweets.map(tweet => (
      <Tweet 
      key={tweet.id}
      tweetObj={tweet}
      isOwner={tweet.createId === userObj.uid}
      />
    ))}
    </div>
    </>
  )
}

export default Profiles;
