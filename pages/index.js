//front-end
import Head from 'next/head'
import {
  Button,
  Icon,
  Header,
  Post,
  UserPost
} from '../components/'
//back-end
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { creds, store } from '../backend/firebase'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollection} from 'react-firebase-hooks/firestore'
import firebase from 'firebase'

export default function Home () {

  const [postText, setPostText] = useState('')
  const [postTitle, setPostTitle] = useState('')
  const [user] = useAuthState(creds)

  const addPostToDb = e => {
    e.preventDefault()

    if(!postTitle) return

    if(!user){
      store.collection('neutral_posts').add({
        title: postTitle,
        text: postText,
        addedOn: firebase.firestore.FieldValue.serverTimestamp()
      })
      setPostTitle('')
    if(postText) setPostText('')
    } else if(user){
      store.collection('user_posts').add({
        title: postTitle,
        text: postText,
        addedBy: user?.displayName,
        addedPic: user?.photoURL,
        addedOn: firebase.firestore.FieldValue.serverTimestamp()
      })
      setPostTitle('')
    if(postText) setPostText('')
    }

  }

  const [neutralPosts] = useCollection(
    store.collection('neutral_posts').orderBy('addedOn', 'asc')
  )

  const [userPosts] = useCollection(
    store.collection('user_posts').orderBy('addedOn', 'asc')
  )


  return (
    <div
      className='
    h-screen 
    overflow-hidden
    bg-slate-900
    bg-no-repeat 
    bg-cover
    '
    >
      <Head>
        <title>A blog for random thoughts</title>
      </Head>
      <Header />
      <main className="
      w-[90%]
      mx-auto
      border-x-2
      border-amber-400
      h-full
      overflow-hidden
      flex
      flex-col
      place-items-center
      space-y-4
      py-4
      ">
        <div className="
        w-[90%]
        h-[30%]
        bg-slate-800
        mx-auto
        shadow-lg
        rounded-lg
        flex
        flex-col
        py-2
        place-items-stretch
        space-y-2
        ">
          <input 
          type="text" 
          placeholder={`What's the title for this, friend ?`}
          value={postTitle}
          onChange={e => setPostTitle(e.target.value)}
          className="
          h-[40px]
          rounded-lg
          w-[95%]
          mx-auto
          border-0
          bg-slate-600
          px-4
          py-2
          font-montserr
          font-semibold
          text-xl
          text-amber-200
          outline-none
          " />
          <textarea 
          type="text"
          value={postText}
          onChange={e => setPostText(e.target.value)}
          placeholder={`What's on your mind, stranger ?`}
          className="
          h-[70%]
          w-[95%]
          text-lg
          font-montserr
          font-normal
          px-4
          py-3
          text-amber-300
          mx-auto
          overflow-y-scroll
          scrollbar-thin
          scrollbar-track-slate-700
          scrollbar-thumb-amber-400
          rounded-md
          bg-slate-600
          outline-none
          "></textarea>
          <button
          onClick={addPostToDb}
          className='
          w-[60%]
          mx-auto
          h-[35px]
          rounded-lg
          bg-amber-700
          font-fira-sans
          font-semibold
          text-slate-50
          hover:shadow-xl
          hover:shadow-slate-800
          hover:-skew-x-12
          hover:border-slate-300
          hover:border-x-2
          hover:border-b-2
          active:border-x-4
          active:border-b-4
          active:shadow-amber-500
          active:shadow-md
          transform
          transition-all
          duration-300
          ease-in-out
          '
          >
            Post
          </button>
        </div>
        <div className="
        h-[60%]
        overflow-y-scroll
        scrollbar-thin
        scrollbar-thumb-amber-600
        scrollbar-track-slate-600
        bg-slate-800
        w-full
        space-y-12
         ">
          {neutralPosts !== null && neutralPosts?.docs.map(post => (
            <Post post={post} />
          ))}
          {(user && userPosts !== null) && userPosts?.docs.map(post => (
            <UserPost post={post} />
          ))}
        </div>
      </main>
          </div>
  )
}
