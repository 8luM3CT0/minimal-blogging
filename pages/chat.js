//front-end
import React from 'react'
import Head from 'next/head'
import { ChatHeader } from '../components'
//back-end
import { creds, store } from '../backend/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'


function Chat() {
  const [user] = useAuthState(creds)
    
    return (
    <>
    <div className='
    h-screen
    w-screen
    fixed
    bg-slate-900
    overflow-hidden
    '>
        <Head>
            <title>Chat with random people</title>
        </Head>
        <ChatHeader />
        <main className="
        bg-slate-800
        w-[75%]
        h-screen
        mx-auto
        "></main>
    </div>
  </>
  )
}

export default Chat