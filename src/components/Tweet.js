import React, { useEffect, useState } from 'react'
import {db,storage} from 'fbase';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { async } from '@firebase/util';
import { ref, deleteObject } from "firebase/storage";

function Tweet({tweetObj,isOwner}) {
    const [editing,setEditng] = useState(false);
    const [newTweet,setNewTweet] = useState(tweetObj.text);
    const [nowDate,setNowDate] = useState("");

    const onDeleteClick = async() =>{
      const ok = window.confirm("삭제하시겠습니까?"); //확인 누르면 true 취소는 false
        if(ok){
        await deleteDoc(doc(db, "tweets", `/${tweetObj.id}`));
        if(tweetObj.attachmentUrl !== ""){
          // Create a reference to the file to delete
          const deletetRef = ref(storage, `/${tweetObj.attachmentUrl}`);
          await deleteObject(deletetRef);
        }
        }
    }

    const toggleEditing = () =>{
      setEditng((prev) => !prev)
    }

    const onChangeText = (e) =>{
      const value = e.target.value
      setNewTweet(value);
    }

    const onSubmit = async(e) =>{
      e.preventDefault();
      const newTweetRef = doc(db, "tweets", `/${tweetObj.id}`);
      console.log(newTweetRef)
      await updateDoc(newTweetRef, {
        text:newTweet,
        createAt: Date.now()
      });
      setEditng(false);
    }
    useEffect(()=>{
      let timeStamp = tweetObj.createAt;
      const now = new Date(timeStamp);
      setNowDate(now.toUTCString());
    },[])
  return (
    <div>
          {editing ?  
          // true 수정화면
          <>
          <form onSubmit={onSubmit}>
            <input value={newTweet} onChange={onChangeText} required />
            <input type="submit" value="update Tweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
          </>
          :          
          <>
          <h4>
            {tweetObj.text}
          </h4>
          <span>{nowDate}</span>
          {tweetObj.attachmentUrl &&(
            <img src={tweetObj.attachmentUrl} width="50" height="50" />
          )}
        {isOwner && 
        <>
          <button onClick={onDeleteClick}>Delete Tweet</button>
          <button onClick={toggleEditing}>Edit Tweet</button>
        </>
        } 
         </>
      }
    </div>
  )
}

export default Tweet;
