//front-end
import React, { useState } from 'react'
import { OptionsIcon } from '../../../'
//back-end
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocument } from 'react-firebase-hooks/firestore'
import { creds, store } from '../../../../backend/firebase'

function RoomMember({docData, roomId}) {
    const [user] = useAuthState(creds)
    
    const [snapshot, loadingSnapshot, error] = useDocument(
        store.doc(`blogRooms/${roomId}/roomMembers/${docData}`)
    )

    console.log('roomMember data return >>>>', docData)
    //for member options
    const [optionsModal, setOptionsModal] = useState(false)
    //for updating member permissions
    const [uMemberRole, setUMemberRole] = useState('')
    const updateRole = e => {
        e.preventDefault()

        store.collection('blogRooms').doc(roomId).collection('roomMembers').doc(snapshot?.id).set({
            memberRole: uMemberRole
        }, {
            merge: true
        })
        setUMemberRole('')
    }
    //for deleting member
    const deleteMember = () => {
        store.collection('blogRooms').doc(roomId).collection('roomMembers').doc(snapshot?.id).delete()

        setOptionsModal(false)
    }
    return (
    <>
    <div 
    key={snapshot?.id}
    className='
    h-[60px]
    w-[95%]
    mx-auto
    px-3
    py-2
    my-2
    bg-slate-800
    flex
    items-center
    justify-between
    rounded-md
    hover:border-x-3
    hover:border-y-2
    hover:border-amber-600
    -inset-full
    transform
    transition
    duration-100
    delay-100
    ease-in-out
    group
    cursor-pointer
    '>
        <h1 className="
        font-fira-sans
        font-bold
        text-lg
        text-amber-500
        group-hover:text-amber-700
        group-hover:font-black
        ">
            {snapshot?.data()?.memberEmail}
        </h1>
        <h1 className="
        font-fira-sans
        font-normal
        text-base
        text-amber-500
        group-hover:text-amber-700
        group-hover:font-black
        ">
            {snapshot?.data()?.memberRole}
        </h1>
        {(user?.email== 'rumlowb@gmail.com' || user?.displayName == docData?.addedBy && user) && (
                    <button 
                    onClick={() => setOptionsModal(true)}
                    className="
                    rounded-full
                    p-3
                    hover:border
                    hover:border-amber-600
                    transform
                    transition
                    duration-300
                    ease-in-out
                    ">
                        <OptionsIcon 
                        style={{
                            color: 'orange',
                            fontSize: '1.4em'
                        }}
                        />
                    </button>
        )}
    </div>
    {optionsModal && (
        <div className="
        h-full
        w-full
        bg-slate-800
        bg-opacity-80
        fixed
        z-50
        inset-0
        flex
        flex-col
        items-center
        ">
            <div className="
            h-[75%]
            lg:w-[40%]
            w-[90%]
            bg-slate-700
            border
            border-amber-500
            rounded-md
            ">
                <header className="
                flex
                items-center
                justify-between
                top-0
                h-[60px]
                w-full
                border-b
                border-amber-600
                px-4
                py-3
                ">
                    <h1 className="
                    font-fira-sans
                    font-semibold
                    text-amber-500
                    text-lg
                    ">
                        Options for user
                    </h1>
                    <button 
                    onClick={() => setOptionsModal(false)}
                    className="
                    rounded-full
                    grid
                    place-items-center
                    px-3
                    py-1
                    border
                    border-amber-500
                    text-lg
                    text-amber-500
                    hover:border-amber-700
                    hover:text-amber-700
                    focus:outline-none
                    transform
                    transition
                    duration-300
                    ease-in-out
                    ">
                        X
                    </button>
                </header>
                <div className="
                h-full 
                w-full 
                flex 
                flex-col 
                justify-center
                items-center 
                overflow-hidden
                px-3
                py-2
                ">
                    <div className="
                    h-[50%]
                    w-full
                    flex
                    flex-col
                    space-y-5
                    ">
                        <h2 className="
                        font-fira-sans
                        font-normal
                        text-amber-500
                        text-base
                        ">
                            {snapshot?.data()?.memberEmail}'s current role: {snapshot?.data()?.memberRole}
                        </h2>
                        <input 
                        type="text" 
                        value={uMemberRole}
                        placeholder='Updated role for member'
                        onChange={e => setUMemberRole(e.target.value)}
                        className="
                        h-[60px]
                        w-[90%]
                        mx-auto
                        bg-slate-800
                        rounded
                        border
                        border-amber-600
                        text-lg
                        text-amber-600
                        focus:border-2
                        focus:border-amber-800
                        outline-none
                        transition
                        duration-300
                        ease-in-out
                        px-3
                        py-2
                        font-fira-sans
                        placeholder-amber-500
                        " />
                        <span className="
                        w-full
                        flex
                        items-center
                        justify-between
                        ">
                            <h1></h1>
                            <button 
                            onClick={updateRole}
                            className="
                            w-[45%]
                            h-[50px]
                            rounded-md
                            border
                            border-amber-600
                            font-fira-sans
                            text-lg
                            text-amber-600
                            hover:border-amber-700
                            hover:text-amber-700
                            transform
                            transition
                            duration-300
                            ease-in-out
                            ">
                                Update role
                            </button>
                        </span>
                    </div>
                    <div className="
                    h-[50%]
                    w-full
                    flex
                    flex-col
                    items-start
                    space-y-5
                    ">
                             <h2 className="
                        font-fira-sans
                        font-normal
                        text-amber-500
                        text-base
                        ">
                        Or delete member from room
                        </h2>
                        <button 
                            onClick={deleteMember}
                            className="
                            w-[60%]
                            mx-auto
                            h-[50px]
                            rounded-md
                            border
                            border-red-500
                            font-fira-sans
                            text-lg
                            text-red-500
                            hover:border-red-600
                            hover:text-red-600
                            transform
                            transition
                            duration-300
                            ease-in-out
                            ">
                                Delete
                            </button>
                    </div>
                </div>
            </div>
        </div>
    )}
    </>
  )
}

export default RoomMember