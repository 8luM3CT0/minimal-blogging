//front-end
import { useRouter } from 'next/router'
import React from 'react'
import { AiFillMessage, AiFillHome, AiOutlineCode } from 'react-icons/ai'
//back-end
import { creds, store, provider } from '../../backend/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from 'react'

function Sidebar() {
  const router = useRouter()
  const [user] = useAuthState(creds)

  const signIn = () => {
    creds.signInWithPopup(provider).catch(alert)
  }

  const signOut = () => {
    creds.signOut()
  }

  useEffect(() => {
    if(user){
        store.collection('blog_users').add({
            displayName: user?.displayName,
            email: user?.email,
            photoURL: user?.photoURL
        })
    }
  }, [user])

  return (
    <div className='
    lg:hidden
    w-[300px]
    h-full
    transition
    transform
    duration-[3s]
    z-20
    sticky
    top-16
    ease-in-out
    bg-slate-700
    rounded-r-lg
    flex
    flex-col
    overflow-hidden
    justify-evenly
    '>
                <ul className="
        py-2 
        flex 
        flex-col 
        gap-4 
        space-y-5 
        place-items-center 
        w-full">    
            <li className="
            headerTitleForChat 
            w-[40%]
            justify-evenly 
            flex 
            items-center 
            space-x-2">
            <AiFillMessage 
                style={{
                    fontSize: '1.5em',
                    color: 'orange'
                }}
                />
                <h1>Chat</h1>
            </li>
            <li className="
            headerTitleForDev 
            w-[40%]
            justify-evenly
            flex 
            space-x-2 
            items-center
            ">
                  <AiOutlineCode
                style={{
                    fontSize: '1.5em',
                    color: 'orange'
                }}
                />
                <h1>Developer</h1>
            </li>
        </ul>
        {user ? (
        <h1 
        onClick={signOut}
        className="
        headerTitleForChat
        
        mx-auto

        ">
            {user?.displayName}
        </h1>
    ): (
        <h1 
        onClick={signIn}
        className="
        headerTitleForChat
        mx-auto
        
        ">
            Sign in
        </h1>
    )}

    </div>
  )
}

export default Sidebar