//front-end
import React from 'react'
import Head from 'next/head'
import { AltRoomIcon, RoomsDisplay, RoomsHeader, RoomsModal } from '../components'
//back-end
import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { creds, store, provider } from '../backend/firebase'


function RoomsPage() {
  const [user] = useAuthState(creds)
  const [addRoomsModal, setARModal] = useState(false)
  const [roomName, setRoomName] = useState('')
      const [roomDesc, setRoomDesc] = useState('')
  
      const cancelAddRoom = e => {
  
  
          (roomName && roomDesc ? (
              setRoomName(''),
              setRoomDesc('')
          ): roomName ? (
              setRoomName('')
          ): (
              buttonAction()
          ))
      }
  
      const addNewRoom = e => {
          e.preventDefault()
  
          if(!roomName) return
  
          {(roomName && roomDesc) ? (
              store.collection('blogRooms').add({
                  roomName,
                  roomDesc,
                  creator: user?.displayName,
                  createdOn: firebase.firestore.FieldValue.serverTimestamp()
              })
          ): (roomName && !roomDesc) && (
              store.collection('blogRooms').add({
                  roomName,
                  creator: user?.displayName,
                  createdOn: firebase.firestore.FieldValue.serverTimestamp()
              })
          )}
  
          setRoomName('')
          {roomDesc ? setRoomDesc('') : ''}
          buttonAction()
      }
  
  
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
       h-full
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
      <div className="
      h-full
      w-full
      fixed
      inset-0
      z-50
      flex
      items-center
      bg-slate-800
      bg-opacity-75
      ">
        <div 
        onClick={() => setARModal(false)}
        className="
        w-[12%]
        lg:w-[8%]
        h-full
        "></div>
        <div className="
        w-[76%]
        lg:w-[84%]
        h-full
        flex
        flex-col
        ">
          <div 
          onClick={() => setARModal(false)}
          className="
          w-full
          h-[10%]
          "></div>
          <div className="
          w-full
          h-[80%]
          bg-slate-800
          border-2
          border-amber-600
          rounded
          ">
            <header className="
            h-[60px]
            w-full
            px-3
            border-b-2
            border-amber-600
            flex
            items-center
            ">
              <h1 className="
              font-fira-sans
              text-lg
              font-semibold
              text-amber-500
              ">
                Add a new room below
              </h1>
            </header>
            <div className="
            h-[80%]
            w-[90%]
            px-4
            py-3
            space-y-5
            mx-auto
            flex
            flex-col
            items-start
            ">
              <h1 className="
                font-path-ex
                font-bold
                text-lg
                text-amber-500
                ">
                    Room title:
                </h1>
                <input 
                value={roomName}
                onChange={e => setRoomName(e.target.value)}
                placeholder={`Name of your new room, ${user?.displayName}`}
                type="text" 
                className="
                w-full
                px-3
                py-2
                h-[60px]
                rounded-md
                bg-slate-900
                text-amber-600
                text-xl
                font-fira-sans
                font-semibold
                outline-none
                border
                border-amber-600
                " />
                            <h1 className="
                font-path-ex
                font-bold
                text-lg
                text-amber-500
                ">
                    Description (optional):
                </h1>
                <textarea 
                value={roomDesc}
                onChange={e => setRoomDesc(e.target.value)}
                placeholder={`what's your room about, ${user?.displayName}`} 
                className="
                min-h-[360px]
                max-h-[450px]
                w-full
                px-4
                py-3
                border
                border-amber-600
                outline-none
                text-lg
                font-bold
                font-fira-sans
                text-amber-600
                bg-slate-900
                overflow-y-scroll
                scrollbar-thin
                scrollbar-track-slate-900
                scrollbar-thumb-amber-600
                "></textarea>
            </div>
            <footer className="
            bottom-0
            sticky
            z-50
            h-[10%]
            w-full
            px-4
            py-3
            flex
            items-center
            justify-evenly
            border-t-2
            bg-slate-800
            border-amber-600
            ">
            <button 
            onClick={cancelAddRoom}
            className="
            rounded-md
            w-[40%]
            h-[55px]
            font-path-ex
            font-semibold
            text-lg
            text-red-600
            border
            border-red-700
            hover:border-red-600
            hover:text-red-500
            hover:-skew-x-6
            transform
            transition
            delay-100
            ease-in-out
            ">
                Cancel
            </button>
            <button 
            onClick={addNewRoom}
            className="
            rounded-md
            w-[40%]
            h-[55px]
            font-path-ex
            font-semibold
            text-lg
            text-amber-600
            border
            border-amber-700
            hover:border-amber-600
            hover:text-amber-500
            hover:-skew-x-6
            transform
            transition
            delay-100
            ease-in-out
            ">
                Add
            </button>
            </footer>
          </div>
          <div 
          onClick={() => setARModal(false)}
          className="
          w-full
          h-[10%]
          "></div>
        </div>
        <div 
        onClick={() => setARModal(false)}
        className="
        w-[12%]
        lg:w-[8%]
        h-full
        "></div>
      </div>
    )}
    </>
  )
}

export default RoomsPage