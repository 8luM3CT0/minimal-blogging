//front-end
import React from 'react'
//back-end
import { creds, store } from '../../../../backend/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import { useState } from 'react'

function Comment({doc, parentId}) {
  const [user] = useAuthState(creds)
  const [deleteModal, setDeleteModal] = useState(false)

  const deleteComment = e => {
    store
    .collection('neutral_posts')
    .doc(parentId)
    .collection('comments')
    .doc(doc?.id)
    .delete()

    setDeleteModal(false)
  }
  
    return (
    <div 
    key={doc?.id}
    className='
    h-[45px]
    w-[95%]
    mx-auto
    rounded-md
    bg-slate-600
    px-4
    py-3
    justify-between
    flex
    items-center
    hover:rounded-lg
    hover:border-2
    hover:-skew-x-3
    hover:border-amber-700
    transform
    transition
    duration-200
    ease-in-out
    '>
            <h1 className="commenterName">
                Anon
            </h1>
        <p className="commentP
        ">
            {doc?.data()?.comment}
        </p>
        {user?.email == 'rumlowb@gmail.com' && (
      <button 
      onClick={deleteComment}
      className="
      rounded-3xl
      text-lg
      text-red-400
      border
      border-red-500
      font-fira-sans
      font-bold
      px-2
      hover:text-red-500
      hover:border-red-600
      transform
      transition
      duration-300
      ease-in-out
      ">X</button>
    )}
    </div>
  )
}

export default Comment