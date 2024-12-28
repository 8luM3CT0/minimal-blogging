//front-end
import React from 'react'
import Head from 'next/head'
import { IdHeader, OptionsIcon, RoomArticle, RoomsInput } from '../../components'
//back-end
import { creds, store, storage } from '../../backend/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { 
  useDocument, 
  useCollection, 
  useDocumentOnce, 
  useCollectionOnce } from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router'

function RoomsPage() {
  const [user] = useAuthState(creds)
  const router = useRouter()
  const {id} = router.query


  const [snapshot, loadingSnapshot, error] = useDocument(
    store.doc(`blogRooms/${id}`)
  )

  //to display the room articles
  //I swear to fucking christ, if you do not display, I'll short your motherboard
  const [roomArticles] = useCollection(
    store.collection('blogRooms').doc(snapshot?.id).collection('roomArticles').orderBy('postedOn', 'desc')
  )
  //I'm watching you....
  return (
    <div className='
    h-screen
    w-full
    overflow-hidden
    bg-slate-900
    '>
      <Head>
        <title>Room with the title of: {snapshot?.data()?.roomName}</title>
      </Head>
      <IdHeader 
      roomName={snapshot?.data()?.roomName}
      />
      <main className="
      h-full
      lg:w-[85%]
      pb-20
      w-[95%]
      mx-auto
      bg-slate-700
      flex
      flex-col
      items-start
      ">
        {/**top of div, contains header image, room name && room creator */}
        <div 
        className="
        h-[25%]
        bg-headerpic
        bg-cover
        bg-no-repeat
        w-full
        rounded-md
        shadow-sm
        shadow-amber-500
        ">
          <footer className="
          h-[80px]
          rounded-sm
          w-full
          flex
          items-center
          justify-between
          px-4
          py-3
          bg-slate-800
          bg-opacity-95
          ">
            <h1 className="
            font-fira-sans
            font-bold
            text-xl
            text-amber-500
            ">
              {snapshot?.data()?.roomName}
            </h1>
            <span className="
            flex
            items-center
            space-x-3
            ">
                          <h3 className="
            font-path-ex
            font-semibold
            text-base
            text-amber-700
            ">
              Created by {snapshot?.data()?.creator}
            </h3>
            <button className="
            rounded-full
            p-3
            border
            border-amber-600
            hover:border-amber-800
            focus:border-amber-500
            -inset-full
            delay-100
            transform
            transition
            ease-in-out
            ">
              <OptionsIcon 
              style={{
                fonSize: '1.4em',
                color: 'orange'
              }}
              />
            </button>
            </span>
          </footer>
        </div>
        {/**posts below */}
        <div className="
        h-[70%]
        w-full
        flex
        flex-col
        px-3
        py-2
        ">
          <RoomsInput 
          roomId={snapshot?.id}
          />
        <div className="
        h-[90%]
        bg-slate-900
        rounded-lg
        w-full
        flex
        flex-col
        space-y-12
        items-start
        px-4
        py-3
        pb-12
        overflow-y-scroll
        scrollbar-hide
        ">
          {roomArticles && roomArticles?.docs.map(articleData => (
            <RoomArticle 
            articleId={articleData?.id}
            roomId={snapshot?.id}
            />
          ))}
        </div>
        </div>
      </main>
    </div>
  )
}

export default RoomsPage