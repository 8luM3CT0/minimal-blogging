//front-end
import React from 'react'
import { AiOutlineHome, AltRoomIcon } from '../..'
//back-end
import { creds, store } from '../../../backend/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'

function IdHeader({roomName}) {
  const router = useRouter()

  return (
    <>
        <header className="
        top-0
        z-50
        px-4
        sticky
        flex
        items-center
        justify-evenly
        h-[75px]
        w-full
        border-b
        border-amber-600
        bg-slate-800
        ">
          <button 
          onClick={() => router.push('/')}
          className="
idHeaderBtn
          ">
            Home
          </button>
          <button 
          onClick={() => router.push('/rooms')}
          className="
idHeaderBtn
          ">
            Rooms
          </button>
          <button 
          onClick={() => router.push('/')}
          className="idHeaderBtnMobile">
            <AiOutlineHome 
            style={{
              color: 'orange',
              fontSize: '1.3em'
            }}
            />
          </button>
          <button 
          onClick={() => router.push('/rooms')}
          className="idHeaderBtnMobile">
            <AltRoomIcon 
            style={{
              color: 'orange',
              fontSize: '1.3em'
            }}
            />
          </button>
        </header>
    </>
  )
}

export default IdHeader