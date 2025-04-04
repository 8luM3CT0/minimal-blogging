//front-end
import React from 'react'
//back-end
import { creds, store } from '../../../backend/firebase'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'

function LoggedUsers({
    userId
}) {
    const [userSnap] = useDocument(
        store.collection('blog_users').doc(userId)
    )

  return (
    <div 
    style={{
      backgroundImage: `${userSnap?.photoURL}`
    }}
    className="
    min-h-[210px]
    max-h-[240px]
    min-w-[240px]
    max-w-[270px]
    bg-cover
    border
    border-amber-500
    group
    rounded
    ">
      <div className="
      hidden
      group-hover:inline-flex
      h-full
      w-full
      group-hover:bg-amber-600
      bg-opacity-40
      flex-col
      items-center
      space-y-5
      transform
      transition
      duration-300
      ease-in-out
      "></div>
    </div>
  )
}

export default LoggedUsers
