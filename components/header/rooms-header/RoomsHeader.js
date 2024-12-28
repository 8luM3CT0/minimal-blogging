import React, { useState } from 'react'
import {Dropdown, Modal, ModalBody, RoomIcon} from '../../'
import { AiFillMessage, AiOutlineCode, AiOutlineHome, AiOutlineMenu, AiOutlineMenuFold} from 'react-icons/ai'
import { FaBlog } from 'react-icons/fa'
//back-end
import { creds, store, provider } from '../../../backend/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function RoomsHeader() {
    const [user] = useAuthState(creds)
    const router = useRouter()
    

    
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
        <RoomIcon 
        style={{
            fontSize: '1.9em',
            color: 'orange'
        }}
        />
        <div className="headerDiv">
            
                <h2 
                className="headerTitle">
                {user?.displayName}
            </h2>
            
                        <span 
            onClick={() => router.push('/')}
            className="headerTitleForDev flex space-x-2 items-center">
                <AiOutlineHome 
                style={{
                    fontSize: '1.5em',
                    color: 'orange'
                }}
                />
                <h1>Home</h1>
            </span>
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
                    <span 
            onClick={() => router.push('/')}
            className="
            headerTitleForDev
            justify-evenly
            flex 
            space-x-2 
            items-center
            ">
                  <AiOutlineHome
                style={{
                    fontSize: '1.5em',
                    color: 'orange'
                }}
                />
                <h1>Home</h1>
            </span>

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
        </div>
        <span className="
        headerTitleForChat
        group
        ">
        <h1>
            {user?.displayName}
        </h1>
                </span>
    
        </div>
        </Dropdown>
        </div>
    </header>
    </>
  )
}

export default RoomsHeader