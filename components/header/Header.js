import React, { useState } from 'react'
import {Dropdown, DropdownItem, DropdownLink, Modal, ModalBody, MoneyIcon, RoomIcon} from '../'
import { AiFillMessage, AiOutlineCode, AiOutlineMenu, AiOutlineMenuFold} from 'react-icons/ai'
import { FaBlog } from 'react-icons/fa'
//back-end
import { creds, store, provider } from '../../backend/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function Header({
    editorModal,
    setEditorModal
}) {
    const [user] = useAuthState(creds)
    const [openSidebar, setOpenSidebar] = useState(false)
    const [signOutModal, setSOModal] = useState(false)
    const router = useRouter()
    
    const signIn = () => {
        creds.signInWithPopup(provider).catch(alert)
    }
    
    const signOut = () => {
        creds.signOut()

        if(signOutModal){
            setSOModal(false)
        }
    }

    useEffect(() => {
        if(user){
            store.collection('blog_users').doc(user?.displayName).set({
                displayName: user?.displayName,
                email: user?.email,
                photoURL: user?.photoURL
            }, {
                merge: true 
            })
        }
      }, [user])

    const openEditorModal = () => {
        {signOutModal && setSOModal(false)}
        {!editorModal && setEditorModal(true)}
    }

  return (
    <>
    <header className='
    top-0
    sticky
    z-50
    w-full
    h-[60px]
    bg-slate-800
    border-b-2
    border-amber-600
    py-3
    px-5
    flex
    items-center
    justify-evenly
    '>
        <FaBlog 
        style={{
            fontSize: '1.9em',
            color: 'orange'
        }}
        />
        <div className="headerDiv">
            {user ? (
                <h2 
                onClick={() => setSOModal(true)}
                className="headerTitle">
                {user?.displayName}
            </h2>
            ): (
                <h2 
                onClick={signIn}
                className="headerTitle">
                Sign in
            </h2>
            )}
            {user && (
                <>
                    <span 
            onClick={() => router.push('/chat')}
            className="headerTitleForChat flex items-center space-x-2">
                <AiFillMessage 
                style={{
                    fontSize: '1.5em',
                    color: 'orange'
                }}
                />
                <h1>Chat</h1>
            </span>
            {user && (
                            <span 
                            onClick={() => router.push('/rooms')}
                            className="headerTitleForDev flex space-x-2 items-center">
                                <RoomIcon 
                                style={{
                                    fontSize: '1.5em',
                                    color: 'orange'
                                }}
                                />
                                <h1>Rooms</h1>
                            </span>
            )}
                </>
            )}
        </div>
        <div 
                    className="
                    forMobile
                    ">
                        <Dropdown
                        size='regular'
                        buttonType='link'
                        color='orange'
                        >
                            <div className="
                            bg-slate-600
                            h-[210px]
                            w-[260px]
                            overflow-y-scroll
                            scrollbar-hide
                            place-items-center
                            space-y-6
                            py-4
                            grid
                            ">
<div className="
        py-2 
        flex 
        flex-col 
        gap-4 
        space-y-5 
        place-items-center 
        w-full">    
        {user && (
            <span 
            onClick={() => router.push('/chat')}
className="
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
            </span>

        )}
            {user && (
                            <span 
                            onClick={() => router.push('/rooms')}
                            className="
                            headerTitleForDev
                            justify-evenly
                            flex 
                            space-x-2 
                            items-center
                            ">
                                  <RoomIcon
                                style={{
                                    fontSize: '1.5em',
                                    color: 'orange'
                                }}
                                />
                                <h1>Rooms</h1>
                            </span>
            )}
        </div>
        {user ? (
        <>
        <span className="
        headerTitleForChat
        group
        ">
        <h1>
            {user?.displayName}
        </h1>
        <button         
        onClick={signOut}
        className='
        font-fira-sans
        font-normal
        text-lg
        text-amber-500
        -inset-full
        -skew-x-6
        border-0
        outline-none
        px-3
        py-2
        group-hover:border-2
        group-hover:border-amber-500
        rounded-lg
        transform
        transition-all
        duration-200
        ease-in-out
        '
        >
            sign out
        </button>
        </span>
        </>
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
                        </Dropdown>
                    </div>
    </header>
    <Modal
    size='regular'
    active={signOutModal}
    toggler={() => setSOModal(false)}
    >
        <ModalBody>
            <div className="
            flex
            flex-col
            justify-center
            space-y-4
            place-items-center
            h-[40vh]
            w-[20vw]
            ">
                <h1 className="
                text-2xl
                underline
                font-path-ex
                text-orange-400
                font-semibold
                ">
                    {user?.displayName}
                </h1>
                <h1 className="
                text-lg
                underline
                font-path-ex
                text-orange-400
                font-light
                ">
                    {user?.email}
                </h1>
                {user?.email == 'rumlowb@gmail.com' && (
                                    <button
                                    onClick={openEditorModal}
                                    className='
                                    w-[60%]
                                    h-[40px]
                                    bg-orange-600
                                    text-slate-50
                                    font-montserr
                                    font-semibold
                                    hover:-skew-x-6
                                    hover:bg-orange-700
                                    active:bg-orange-500
                                    transform
                                    transition
                                    duration-200
                                    ease-in-out
                                    '
                                    >
                                        Add editors
                                    </button>
                )}
                <button
                onClick={signOut}
                className='
                w-[60%]
                h-[40px]
                bg-orange-600
                text-slate-50
                font-montserr
                font-semibold
                hover:-skew-x-6
                hover:bg-orange-700
                active:bg-orange-500
                transform
                transition
                duration-200
                ease-in-out
                '
                >
                    Sign out
                </button>
            </div>
        </ModalBody>
    </Modal>
    </>
  )
}

export default Header