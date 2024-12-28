//front-end
import React from 'react'
import Head from 'next/head'
import { AltRoomIcon, RoomsDisplay, RoomsHeader, RoomsModal } from '../components'
//back-end
import {useState, useEffect} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { creds, store, provider } from '../backend/firebase'


function RoomsPage() {
  const [user] = useAuthState(creds)
  const [addRoomsModal, setARModal] = useState(false)
  
  
  const [roomsSnap] = useCollection(
    store.collection('blogRooms').orderBy('createdOn', 'asc')
  )

  const signIn = () => {
    creds.signInWithPopup(provider).catch(alert)
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
    <>
    <div className='
    bg-slate-800
    h-screen
    overflow-hidden
    '>
    <Head>
        <title>This is the rooms page.</title>
    </Head>
    {user ? (
     <>
       <RoomsHeader />
    <main className="
    h-full  
    w-[85%]
    flex
    flex-col
    space-y-2
    mx-auto
    bg-slate-700
    bg-opacity-30
    scrollbar-hide
    ">
      {/**
       * top of the main tag 
       * --> will probably contain a randomly selected room
       * --> to display
       * --> otherwise: it will show an h2 tag with the
       * --> text saying "this place is really empty. Wanna
       * --> change that ?"
       */}
       <div className="
       topRoomsDisplay
       ">
       {/**
        * roomsSnap
        * --> RoomsDisplay.js here
        * --> separate component; will be in the /body folder
        */}
        {roomsSnap?.docs?.[0] ? (
          <div className='
          grid
          place-items-center
          h-full
          w-full
          space-y-4
          '>
            <h2 className="
            text-fira-sans
            font-semibold
            text-amber-500
            text-xl
            ">
              There are some rooms available, but would you like to add one ?
            </h2>
            <div
            onClick={() => setARModal(true)}
            className="
            cursor-pointer
                      lg:w-[40%]
                      md:w-[65%]
                      w-[85%]
                      h-[50px]
                      rounded-md
                      bg-slate-800
                      border
                      border-amber-600
                      hover:-skew-x-6
                      hover:border-2
                      hover:border-amber-500
                      focus:border-amber-800  
                      delay-100
                      ease-in-out
                      transform
                      transition
                      grid
                      place-items-center
                      text-amber-500
                      outline-none
                      hover:outline-none
                      focus:outline-none
            ">
              <span className="
              mx-auto
              flex
              items-center
              space-x-4
              ">
                <AltRoomIcon 
              style={{
                fontSize: '1.4em',
                color: 'orange'
              }}
              />
              <p className="
              font-fira-sans
              font-normal
              text-lg
              ">
                New room
              </p>
              </span>
            </div>
          </div>
        ): (
          <div className='
          grid
          place-items-center
          h-full
          w-full
          space-y-4
          '>
          <h2 className="
          text-fira-sans
          font-semibold
          text-amber-500
          text-3xl
          ">
            This place seems empty. Wanna change that ?
          </h2>
          <button 
          onClick={() => setARModal(true)}
          className="
          w-[40%]
          h-[50px]
          rounded-md
          bg-slate-800
          border
          border-amber-600
          hover:-skew-x-6
          hover:border-2
          hover:border-amber-500
          focus:border-amber-800  
          delay-100
          ease-in-out
          transform
          transition
          space-x-4
          text-amber-500
          outline-none
          hover:outline-none
          focus:outline-none
          ">
            <AltRoomIcon 
            style={{
              fontSize: '1.4em',
              color: 'orange'
            }}
            />
            <p className="
            font-fira-sans
            font-normal
            text-lg
            ">
              New room
            </p>
          </button>
          </div>
        )}
       </div>
       <div className="
       h-[70vh]
       w-full
       overflow-y-scroll
       scrollbar-thin
       scrollbar-track-slate-800
       scrollbar-thumb-amber-600
       flex
       flex-col
       space-y-7
       items-center
       px-3
       py-2
       pb-20    
       ">
        {/**Why the fuck don't you work ????? */}
        {roomsSnap && roomsSnap?.docs?.map(doc => (
          <RoomsDisplay 
          roomId={doc?.id}
          doc={doc?.data()}
          />
        ))}
                {/**Why in the actual the fuck don't you work ????? */}
       </div>
    </main>
     </> 
    ): (
      <>
         <RoomsHeader />
    <main className="
    h-full  
    w-[75%]
    flex
    flex-col
    justify-center
    items-center
    space-y-2
    mx-auto
    bg-slate-700
    bg-opacity-30
    scrollbar-hide
    ">
      <h1 className="
      place-self-center
      font-fira-sans
      font-bold
      text-lg
      text-amber-500
      ">
        You can't access this. Sign in first
      </h1>
      <button className="
      place-self-center
      w-[70%]
      rounded
      h-[45px]
      font-fira-sans
      font-semibold
      bg-slate-800
      text-amber-500
      border-amber-500
      border
      hover:border-amber-700
      hover:border-2
      hover:text-amber-700
      hover:font-bold
      ">
        Sign in
      </button>
    </main>
      </>
    )}
    </div>
    {addRoomsModal && (
      <RoomsModal 
      buttonAction={() => setARModal(false)}
      />
    )}
    </>
  )
}

export default RoomsPage