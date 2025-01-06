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
    <div>
      
    </div>
  )
}

export default LoggedUsers
