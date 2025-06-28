//front-end
import React from 'react'
//back-end
import { creds, store } from '../../../backend/firebase'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import { data } from 'autoprefixer'

function LoggedUsers({
    userId
}) {
    const [userSnap] = useDocument(
        store.collection('blog_users').doc(userId)
    )

  return (
    <>
    {(userSnap?.data()?.email !== 'rumlowb@gmail.com' || userSnap?.data()?.displayName !== 'John Seed') && (
      <div 
      key={userSnap?.id}
    style={{
      backgroundImage: `url(${userSnap?.data()?.photoURL})`
    }}
    className="
    h-[240px]
    min-w-[280px]
    max-w-[320px]
    bg-cover
    bg-no-repeat
    border
    border-amber-500
    group
    rounded
    cursor-pointer
    flex
    flex-col
    items-center
    ">
      <div className="h-[65%] w-full"></div>
      <div className="
      loggedUsersInnerDiv
      ">
        <div className="opacity-0 group-hover:opacity-100 transform transition-all duration-300 ease-in-out h-full w-full flex items-center">

        </div>
      </div>
    </div>
    )}
    </>
  )
}

export default LoggedUsers
