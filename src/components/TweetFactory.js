import React, { useState,useEffect } from 'react'
import {db,storage} from "../fbase";
import { async } from '@firebase/util';
import { collection, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadString } from "firebase/storage";

 function TweetFactory({userObj}) {
    const [tweet, setTweet] = useState(""); 
    const [attachment, setAttacnment] = useState("")
      //tweets : 저장된 트윗
  
  
    const onChange = e => {
      //console.log(e.target.value);
      const {target: {value}} = e;
      setTweet(value);
    }
    const onSubmit = async(e) => {
      e.preventDefault();
      let attachmentUrl = "";
      if(attachment !== ""){
      const storageRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
    const response = await uploadString(storageRef, attachment, 'data_url');
      attachmentUrl = await getDownloadURL(ref(storage, response.ref))
    }
  
      await addDoc(collection(db, "tweets"), {
        text: tweet,
        createAt: Date.now(),
        createId: userObj.uid,
        attachmentUrl: attachment,
        //id를 넣어준 이유는 나중에 내 트윗의 수정, 삭제를 해주기위해
      });
      setTweet("");
      setAttacnment("");
  }
  
    const onFileChange = (e) =>{
      const {target: {files}} = e;
      const theFile = files[0];
      const reader = new FileReader(); //파일리더라는 브라우저객체  파일인식이 끝난시점에 finishedEvent가 실행됨.
      reader.onloadend = (finishedEvent) =>{
        const {currentTarget:{result}} = finishedEvent;
          setAttacnment(result); //result는 이미지 주소
        }
      reader.readAsDataURL(theFile); // readAsDataURL 이미지파일의 데이터를 가지고오는 것 2가지 일을 함.
    }
  
    const onClearAttachment = () => {setAttacnment("")};
  return (
    <form onSubmit={onSubmit}>
    <input type="text" placeholder="What's on your mind" value={tweet} onChange={onChange} maxLength={120}/>
    <input type="file" accept='image/*' onChange={onFileChange} /> {/* multiple  여러장 선택시 */}
    <input type="submit" value="Tweet" />
    {attachment && 
    <div>
      <img src={attachment} width="50" height="50" />
      <button onClick={onClearAttachment}>Clear</button>
    </div>
    } {/**attachment는 없는값이니까 값이 들어가면 true가 됨  &&는 트루일때 실행됨.  */}
  </form>
  )
}

export default TweetFactory;
