//front-end
import React, { useEffect, useState } from 'react'
import { MeetingIcon, RoomMember, TrashIcon } from '../../..'
//back-end
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import { useCollection } from 'react-firebase-hooks/firestore'
import { creds, store } from '../../../../backend/firebase'
import firebase from 'firebase'


function RoomsDisplay({roomId, doc}) {
  const router = useRouter()
  const [user] = useAuthState(creds)
  const [roomModal, setRoomModal] = useState(false)
  //for adding members & role assignment
  const [memberEmail, setMemberEmail] = useState('')
  const [memberRole, setMemberRole] = useState('')
  const [isUserAMember, setIsUserAMember] = useState(false)

  const addMember= e => {
    e.preventDefault()

    {!memberEmail && alert(`You forgot the email, ${user?.displayName}`)}

    store.collection('blogRooms').doc(roomId).collection('roomMembers').add({
      memberEmail,
      memberRole,
      addedBy: user?.displayName,
      addedOn: firebase.firestore.FieldValue.serverTimestamp()
    })

    setMemberEmail('')
    setMemberRole('')
  }

  //return members list with code below
  const [membersList] = useCollection(
    store.collection('blogRooms').doc(roomId).collection('roomMembers').orderBy('addedOn', 'asc')
  ) 
  
  //function to both test user if existent within the room && to go to said room
  const [userSnapshot, loadingSnapshot, error] = useCollection(
    store.collection('blogRooms').doc(roomId).collection('roomMembers').where('memberEmail', '==', user?.email)
  )

  const checkUserIfMember = async () => {
    if(user){
      try {
        const querySnap = await store.collection('blogRooms').doc(roomId).collection('roomMembers').where('memberEmail', '==', user?.email).get()

        const isAMember = querySnap?.size > 0
        setIsUserAMember(isAMember)
      } catch(error) {
        console.error('Error checking the authentication :', error)
      }
    }
  }

  useEffect(() => {
    checkUserIfMember()
  }, [user])

  const [membersListModal, setMembersListModal] = useState(false)

  return (
    <>
    <div 
    key={roomId}
    className='
    roomsDisplay
    group
    '>
      <div
      className="roomsDisplayImg" />
      <span className="
      flex
      flex-col
      space-y-2
      w-full
      px-3
      py-2
      ">
        <h1 className="roomsDisplayName">
          {doc.roomName}
        </h1>
        <p className="
        roomsDisplayDesc
        ">
          {doc.roomDesc}
        </p>
      </span>
      <span className="
      roomsDisplayBtns
      ">
        <button 
        onClick={() => setRoomModal(true)}
        className="
        rounded-3xl
        p-3
        border
        border-amber-500
        hover:border-2
        hover:border-amber-700
        transform
        transition
        duration-300
        focus:outline-none
       ">
        <MeetingIcon 
        style={{
          color: 'whitesmoke',
          fontSize: '1.4em'
        }}
        />
       </button>
      </span>
    </div>
    {roomModal && (
      <div className="
      h-screen
      w-screen
      bg-slate-800
      bg-opacity-80
      flex
      items-center
      inset-0
      z-50
      fixed
      ">
        <div 
        onClick={() => setRoomModal(false)}
        className="
        roomsDisplaySideDiv
        "></div>
        <div className="
        roomsDisplayModal
        ">
          <header className="
          h-[50px]
          top-0
          flex
          items-center
          justify-between
          border-b
          border-amber-600
          px-3
          py-2
          bg-inherit
          ">
            <h1 className="
            roomsDisplayName
            ">
              Room details
            </h1>
          </header>
          <main className="
          h-[90%]
          w-full
          flex
          flex-col
          items-center
          space-y-3
          px-3
          py-2
          ">
            {/**
             * 
             * roomsDisplay modal top with forms and details
             * 
             *  */}
             <h1 className="
             roomsDisplayName
             ">
              {doc?.roomName}
             </h1>
             <div className="roomsDisplayModalTop">
              <span className="
              roomsDisplayModalSpan
              ">
                <h4 className="roomsDisplayModalDetail">
                  Created by :
                </h4>
                <h2 className="roomsDisplayModalDetail">
                  {doc?.creator}
                </h2>
              </span>
              <span className="
              roomsDisplayModalSpan
              ">
                <h4 className="roomsDisplayModalDetail">
                  Created on :
                </h4>
                <h2 className="roomsDisplayModalDetail">
                  ({new Date(doc?.createdOn?.seconds).toString()})
                </h2>
              </span>
             </div>
             <div className="
              roomsDisplayModalDesc
              ">
                <h1 className="
                text-lg
                font-fira-sans
                font-semibold
                text-amber-500
                ">
                  Description: 
                </h1>
                <span className="
                h-[90%]
                w-full
                bg-slate-800
                bg-opacity-70
                px-3
                py-2
                overflow-y-scroll
                scrollbar-thin
                scrollbar-track-slate-900
                scrollbar-thumb-amber-700
                text-amber-500
                font-fira-sans
                font-semibold
                ">
                  {doc?.roomDesc}
                </span>
              </div>
{(user?.displayName == doc?.creator || user?.email == 'rumlowb@gmail.com') && (              
<div className="
              w-full
              bg-slate-800
              border
              border-amber-600
              rounded
              flex
              flex-col
              space-y-2
              px-3
              py-2
              ">
             <span className="
             w-full
             flex
             items-center
             px-2
             py-1
             ">
                 <input 
                type="text"
                placeholder={`Member's email, ${user?.displayName}`} 
                value={memberEmail}
                onChange={e => setMemberEmail(e.target.value)}
                className="
                focus:outline-none
                border
                border-amber-500
                px-3
                py-2
                w-[45%]
                mx-auto
                h-[60px]
                rounded
                bg-slate-800
                bg-opacity-80
                text-amber-600
                text-lg
                font-fira-sans
                font-normal
                placeholder-amber-900
                " />
                   <input 
                type="text"
                placeholder={`Role`} 
                value={memberRole}
                onChange={e => setMemberRole(e.target.value)}
                className="
                focus:outline-none
                border
                border-amber-500
                px-3
                py-2
                w-[45%]
                mx-auto
                h-[60px]
                rounded
                bg-slate-800
                bg-opacity-80
                text-amber-600
                text-lg
                font-fira-sans
                font-normal
                placeholder-amber-900
                
                " />
             </span>
                <span className="
                flex
                items-center
                justify-between
                w-[90%]
                mx-auto
                px-2
                py-1
                ">
                  {(user?.email == 'rumlowb@gmail.com' || user?.email == doc?.creator ) && (
                                      <button 
                                      onClick={addMember}
                                      className="
                                      w-[45%]
                                      h-[50px]
                                      border
                                      border-amber-500
                                      text-base
                                      text-amber-500
                                      hover:border-amber-700
                                      hover:text-amber-700
                                      hover:-skew-x-6
                                      focus:outline-none
                                      delay-100
                                      -inset-full
                                      transform
                                      transition
                                      ease-in-out
                                      ">
                                        Add member
                                      </button>
                  )}
                  {(user?.email == 'rumlowb@gmail.com' || user?.email == doc?.creator) && (
                                      <button 
                                      onClick={() => setMembersListModal(true)}
                                      className="
                                      w-[45%]
                                      h-[50px]
                                      border
                                      border-amber-500
                                      text-base
                                      text-amber-500
                                      hover:border-amber-700
                                      hover:text-amber-700
                                      hover:-skew-x-6
                                      focus:outline-none
                                      delay-100
                                      -inset-full
                                      transform
                                      transition
                                      ease-in-out
                                      ">
                                        Add member from list
                                      </button>
                  )}
                </span>
              </div>
)}            {/**
             * 
             * end of roomsDisplay modal
             * 
             *  */}
             <div className="
             h-[80%]
             w-full
             bg-slate-900
             overflow-y-scroll
             scrollbar-thin
             scrollbar-track-slate-800
             scrollbar-thumb-amber-600
             flex
             flex-col
             items-center
             space-y-8
             ">
              {membersList && membersList.docs.map(member => (
                <RoomMember 
                docData={member?.id}
                roomId={roomId}
                />
              ))}
             </div>
                         {/**
             * 
             * roomsDisplay modal bottom with members
             * 
             *  */}
            {/**
             * 
             * end of roomsDisplay modal with members
             * 
             *  */}
          </main>
          <footer className="
          h-[60px]
          bottom-0
          z-50
          sticky
          flex
          items-center
          justify-between
          px-3
          py-2
          border-t
          border-amber-600
          bg-inherit
          " >
            <span></span>
            {(user?.email == 'rumlowb@gmail.com' || isUserAMember) && (
              <button 
              onClick={() => router.push(`/rooms/${roomId}`)}
              className="
              w-[105px]
              h-[50px]
              rounded
              focus:outline-none
              font-fira-sans
              font-semibold
              text-lg
              border
              border-amber-500
              text-amber-500
              hover:border-amber-700
              hover:text-amber-700
              delay-100
              transform
              transition
              ease-in-out
              -inset-full
              ">
                To room
              </button>
            )}
          </footer>
        </div>
        <div 
        onClick={() => setRoomModal(false)}
        className="
        roomsDisplaySideDiv
        "></div>
      </div>
    )}
    {membersListModal && (
      <div className="
      fixed
      inset-0
      z-50
      h-full
      w-full
      flex
      items-center
      ">
        <div 
        onClick={() => setMembersListModal(false)}
        className="
        h-full
        w-[15%]
        "></div>
        <div className="
        w-[70%]
        h-full
        flex
        flex-col
        ">
          <div 
          onClick={() => setMembersListModal(false)}
          className="
          h-[12%]
          w-full
          "></div>
          <div className="
          h-[76%]
          w-full
          bg-slate-900
          border
          border-amber-700
          rounded
          ">
            <header className="
            w-full
            h-[60px]
            px-4
            flex
            items-center
            justify-between
            border-b
            border-amber-700
            ">
              <h4 className="
              font-fira-sans
              font-semibold
              text-amber-600
              text-lg
              ">
                Add members from logged-in users
              </h4>
            </header>
            <div className="
            h-[95%]
            w-[90%]
            py-4
            mx-auto
            flex
            flex-col
            items-start
            ">
              <h3 className="
              font-fira-sans
              font-normal
              text-amber-600
              text-xl
              ">
                Users
              </h3>
              <div className="
              h-[80%]
              w-[90%]
              m-auto
              bg-slate-800
              bg-opacity-30
              overflow-y-scroll
              scrollbar-thin
              scrollbar-track-slate-900
              scrollbar-thumb-amber-600
              "></div>
            </div>
          </div>
          <div 
          onClick={() => setMembersListModal(false)}
          className="
          h-[12%]
          w-full
          "></div>
        </div>
        <div 
        onClick={() => setMembersListModal(false)}
        className="
        h-full
        w-[15%]
        "></div>
      </div>
    )}
   </>
  )
}

export default RoomsDisplay