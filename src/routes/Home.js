import React, { useState,useEffect } from 'react'
import { collection, addDoc, query, getDocs, onSnapshot,orderBy } from "firebase/firestore";
import TweetFactory from 'components/TweetFactory';
import Tweet from 'components/Tweet'
import {db,storage} from "../fbase";

function Home({userObj}) {
  const [tweets, setTweets] = useState([]); 

  useEffect(()=>{ // 실시간 데이터베이스 가져오기
    //getTweets();
    const q = query(collection(db, "tweets"),
              orderBy("createAt","desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newArray = [];
      querySnapshot.forEach((doc) => {
        newArray.push({...doc.data(), id:doc.id});
      });
      setTweets(newArray);
    });
  },[]);
  return (
    <div className='container'>
    <TweetFactory userObj={userObj} />
    <div style={{ marginTop: 30 }}>
    {tweets.map(tweet => (
      <Tweet 
      key={tweet.id}
      tweetObj={tweet}
      isOwner={tweet.createId === userObj.uid}
      />
    ))}
    </div>
    </div>
  )
}

export default Home
