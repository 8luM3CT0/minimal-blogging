//front-end
import React, { useState } from 'react'
//back-end
import { creds, store } from '../../../backend/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import firebase from 'firebase'

function RoomsModal({buttonAction}) {
    const [user] = useAuthState(creds)
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

    return (
    <div 
    className='
    h-screen
    w-screen
    fixed
    inset-0
    overflow-hidden
    grid
    place-items-center
    bg-slate-800
    bg-opacity-75
    '>
        <div className="
        h-[50%]
        lg:w-[60%]
        w-[80%]
        bg-slate-700
        bg-opacity-80
        rounded-md
        flex
        flex-col
        ">
            <header className="
            top-0
            sticky
            z-50
            h-[10%]
            w-full
            px-4
            py-3
            flex
            items-center
            justify-between
            border-b
            border-amber-700
            ">
                <h1 className="
                font-path-ex
                font-bold
                text-lg
                text-amber-600
                ">
                    A new room
                </h1>
                <button 
                onClick={buttonAction}
                className="
                font-fira-sans
                font-black
                text-amber-600
                border
                border-amber-700
                px-3
                py-1
                rounded-3xl
                ">
                    X
                </button>
            </header>
            <div className="
            h-[80%]
            w-full
            px-4
            py-3
            flex
            flex-col
            items-start
            space-y-4
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
                bg-slate-800
                text-amber-600
                text-xl
                font-fira-sans
                font-semibold
                outline-none
                border-0
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
                h-[85%]
                w-full
                px-4
                py-3
                border-0
                outline-none
                text-lg
                font-bold
                font-fira-sans
                text-amber-600
                bg-slate-800
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
            border-t
            border-amber-700
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
    </div>
  )
}

export default RoomsModal