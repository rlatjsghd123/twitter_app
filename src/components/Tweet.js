import React, { useEffect, useState } from 'react'
import {db,storage} from 'fbase';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { async } from '@firebase/util';
import { ref, deleteObject } from "firebase/storage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../style/tweet.scss'

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
    <div className='tweet'>
          {editing ?  
          // true 수정화면
          <>
          <form onSubmit={onSubmit} className="container tweetEdit">
            <input value={newTweet} className="formInput" onChange={onChangeText} required />
            <input type="submit" value="update Tweet" className='formBtn' />
          </form>
          <button onClick={toggleEditing} className="formBtn cancelBtn">Cancel</button>
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
        <div className='tweet_actions'>
          <span onClick={onDeleteClick}>
          <FontAwesomeIcon icon="fa-solid fa-trash" />
          </span>
          <span onClick={toggleEditing}>
          <FontAwesomeIcon icon="fa-solid fa-pen" />
          </span>
        </div>
        } 
         </>
      }
    </div>
  )
}

export default Tweet;
