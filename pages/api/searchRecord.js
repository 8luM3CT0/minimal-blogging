import { useCollection } from "react-firebase-hooks/firestore";
import {store} from '../../backend/firebase'

//for search records
const generation_offset  = new Date('5000-01-01').getTime();
const characs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

//the following functions will be used for search record
const generateId = () => {
  
  let autoId = '';

  for(let i = 0; i < 10; i++){
    autoId += characs.charAt(Math.floor(Math.random() * characs.length));  
  }
  return(generation_offset - Date.now()).toString(32) + autoId;
 };

 //creates a trigram
 export const triGram = e => {
    const map = {};
    const s1 = (e || '').toLowerCase();
    const n = 3;
    for(let k = 0; k <= s1.length - n; k++) map[s1.subString(k, k+n)] = true;
    return  map;
 }

export const addPost = async (doc) => {
  const db = getFirestore();
  const id = generateId();
  const payload = {
    ...doc,
    ...triGram([doc.title || '', doc.desc || ''].join(' ').slice(0, 500))
  };
  
  // We set the id manually here to ensure ordering
  const postRef = doc(db, 'posts', id);
  await setDoc(postRef, payload);  
};