//front-end
import React, { useEffect, useState } from 'react'
import {GrSettingsOption} from 'react-icons/gr'
import {RxUpdate} from 'react-icons/rx'
import {Modal, ModalHeader, ModalBody, ModalFooter, AiOutlineClose, Comment} from '../../'
import { BsFillTrashFill } from 'react-icons/bs'
import {MdAutoFixNormal} from 'react-icons/md'
import {GiCancel} from 'react-icons/gi'
import { AiFillRead } from 'react-icons/ai'
//back-end
import { creds,store} from '../../../backend/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'


function UserPost({post}) {
    const [user] = useAuthState(creds)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    //for editting text && title
    const [edittedText, setEdittedText] = useState('')
    const [edittedTitle, setEdittedTitle] = useState('')
    //for comments
    const [comment, setComment] = useState('')
    //for read more 
    //also no [id].js for this one. easier access and too much page routings
    const [readMore, setReadMore] = useState(false)

    const cancelEdit = () => {
        setEditModal(false)
        {edittedText || edittedTitle && 
            setEdittedText('');
            setEdittedTitle('')
        }
    }

    const editPost = e => {
        e.preventDefault()

        if(!edittedText || !edittedTitle) return

        if(edittedText && edittedTitle){
            store.collection('user_posts').doc(post?.id).set({
                text: edittedText,
                title: edittedTitle
            },
            {merge: true})
        } else if(edittedTitle && !edittedText){
            store.collection('user_posts').doc(post?.id).set({
                title: edittedTitle
            },
            {merge: true})
        }
        setEdittedTitle('')
        if(edittedText){
            setEdittedText('')
        }
        setEditModal(false)
    }

    const deletePost = e => {
        e.preventDefault()

        if(!user) return

        if(user?.displayName == 'Reaper Iff' || user?.email == 'rumlowb@gmail.com' || user?.email == post?.data()?.addedBy){
            store.collection('user_posts').doc(post?.id).delete()
        }

        setDeleteModal(false)
    }

    const addComment = e => {
        e.preventDefault()

        {!comment && (alert('Add a comment!'))}

            store.collection('user_posts').doc(post?.id).collection('comments').add({
                comment,    
                commenter: user?.displayName
            },
            {
                merge: true
            })
            setComment('')
    }

    const [commentDisplay] = useCollection(
        store.doc(`user_posts/${post?.id}`).collection('comments')
    )

  return (
    <>
    <div 
    key={post?.id}
    className='postDiv group'
    >
    {/**title only for mobile; otherwise will show time */}
    <div className="neutralPostHeader">
        <h1 className="
        text-xl
        font-montserr
        font-normal
        text-slate-100
        group-hover:text-amber-300
        transform
        transition
        duration-150
        delay-100
        ease-in-out
        ">
            {post?.data()?.title}
        </h1>
        <h1 className="
        text-lg
        font-fira-sans
        font-normal
        text-slate-100
        group-hover:font-semibold
        group-hover:text-amber-400
        transform
        transition
        duration-150
        delay-100
        ease-in-out
        ">
            {post?.data()?.addedBy}
        </h1>
    </div>
    {/**text of post here for desktop; otherwise hidden */}
    {post?.data()?.text && (
        <div className="postText">
        {post?.data()?.text}
    </div>
    )}
    {/**button here for read more */}
    <div className="
    neutralPostFooter
    ">
        <span className="
        flex 
        items-center 
        justify-between
        w-[15%]
        ">
        {user?.displayName == post?.data()?.addedBy && (
               <button 
               onClick={() => setEditModal(true)}
   className="
   outline-none
   border-0
   mx-4
   ">
       <MdAutoFixNormal
       style={{
           fontSize: '1.4em',
           color: 'orange'
       }}
       />
   </button>
        )}
          {user?.displayName == post?.data()?.addedBy && (
                      <button 
                      onClick={() => setDeleteModal(true)}
                      className="
                      outline-none
                      border-0
                      ">
                          <BsFillTrashFill
                          style={{
                              fontSize: '1.4em',
                              color: 'orange'
                          }}
                          />
                      </button>
                      
          )}
        </span>
        <button 
        onClick={() => setReadMore(true)}
        className="neutralPostButton
        ">
            Read more
        </button>
        <button 
        onClick={() => setReadMore(true)}
        className="neutralPostMobBtn">
            <AiFillRead 
            style={{
                fontSize: '1.2em',
                color: 'white'
            }}
            />
            Read
        </button>
    </div>
    </div>
    <Modal
    size='regular'
    active={deleteModal}
    toggler={() => setDeleteModal(false)}
    >
        <ModalHeader
        toggler={() => setDeleteModal(false)}
        >
            <h1 className="
            text-lg
            font-fira-sans
            font-semibold
            text-amber-600
            underline
            pl-4
            pr-7
            ">
                Are you sure about this, {user?.displayName}
            </h1>
        </ModalHeader>
        <ModalBody>
            <div className="
            lg:h-[450px]
            md:h-[390px]
            h-[320px]
            lg:w-[420px]
            md:w-[360px]
            w-[290px]
            mx-auto
            rounded-lg
            shadow-lg
            px-6
            py-5
            grid
            overflow-y-scroll
            scrollbar-hide
            place-items-center
            ">
                <h2 className="
                text-base
                font-normal
                text-slate-700
                w-[70%]
                mx-auto
                h-full
                ">
                    This act is irreversible. If you proceed,
                    the assumption is you have informed {post?.data()?.addedBy}.
           
                </h2>
                <h1 className="
                text-xl
                font-semibold
                text-amber-600
                animate-pulse
                mx-auto
                ">
                             Do you want to proceed ?
                </h1>
                <span className="
                flex
                items-center
                space-x-3
                ">
                                        <button
                    onClick={() => setDeleteModal(false)}
                    className='
                    bg-amber-600
                    p-3
                    border-0
                    outline-none
                    rounded-lg
                    shadow-lg
                    '
                    >
                        <GiCancel 
                        style={{
                            fontSize: '1.5em',
                            color: 'whitesmoke'
                        }}
                        />
                    </button>
                    <button
                    onClick={deletePost}
                    className='
                    bg-red-600
                    p-3
                    border-0
                    outline-none
                    rounded-lg
                    shadow-lg
                    '
                    >
                        <BsFillTrashFill 
                        style={{
                            fontSize: '1.5em',
                            color: 'whitesmoke'
                        }}
                        />
                    </button>
                </span>
            </div>
        </ModalBody>
    </Modal>
    {editModal && (
            <div className="editModalMainDiv">
                {/**input container */}
                <div className="
                editModalDiv
                ">
                    {/**header for editModal */}
                    <header
                    className='
                    top-0
                    z-50
                    sticky
                    flex
                    items-center
                    justify-between
                    px-6
                    py-2
                    w-full
                    border-b
                    border-amber-600
                    '
                    >
                        <h3 className="
                        font-fira-sans
                        font-normal
                        text-xl
                        text-amber-400
                        ">
                            Edit post
                        </h3>
                        <GiCancel 
                        onClick={() => setEditModal(false)}
                        style={{
                            fontSize: '1.4em',
                            color: 'darkorange',
                            cursor: 'pointer'
                        }}
                        />
                    </header>
                    {/**end of header for editModal */}
                    <div className="
                    h-full
                    w-[95%]
                    mx-auto
                    flex
                    flex-col
                    items-start
                    space-y-4
                    px-3
                    py-5
                    ">
                        <h2 className="
                        font-path-ex
                        font-semibold
                        text-lg
                        text-amber-500
                        place-self-start
                        ">
                            Edit title
                        </h2>
                        <input 
                        value={edittedTitle}
                        onChange={e => setEdittedTitle(e.target.value)}
                        placeholder={`updated title here, ${user?.displayName}`}
                        type="text" 
                        className='
                        bg-slate-700
                        px-4
                        py-3
                        w-full
                        h-[40px]
                        rounded-lg
                        font-fira-sans
                        font-normal
                        text-amber-600
                        text-xl
                        ' />
                        <h2 className="
                        font-path-ex
                        font-semibold
                        text-lg
                        text-amber-500
                        place-self-start
                        ">
                            Edit text
                        </h2>
                        <textarea 
                        value={edittedText}
                        onChange={e => setEdittedText(e.target.value)}
                        placeholder={`updated text here, ${user?.displayName}`}
                        type="text" 
                        className='
                        bg-slate-700
                        px-4
                        py-3
                        w-full
                        h-[95%]
                        rounded-lg
                        font-fira-sans
                        font-normal
                        text-amber-600
                        text-xl
                        ' />
                    </div>
                    <footer
                    className='
                    bottom-0
                    h-[20%]
                    z-50
                    sticky
                    flex
                    items-center
                    justify-end
                    space-x-4
                    px-6
                    py-2
                    w-full
                    border-t
                    border-amber-600
                    '
                    >
                    <button
                    onClick={cancelEdit}
                    className='
                    cancelPostBtn
                    '
                    >
                        Cancel
                    </button>
                    <button
                    onClick={editPost}
                    className='editPostBtn
                    '
                    >
                        Edit
                    </button>
                    </footer>
                </div>
                {/**end of input container */}
             </div>
    )}
    {readMore && (
        <div className="readMoreDiv">
            <div className="rmCenterDiv">
                <header className="
                top-0
                sticky
                z-50
                flex
                items-center
                justify-between
                bg-transparent
                border-b-2
                border-amber-400
                h-[10%]
                py-3
                px-4
                ">
                    <h1 className="
                    font-path-ex
                    text-xl
                    text-amber-600
                    font-semibold
                    ">
                        Post by {post?.data()?.addedBy} 
                    </h1>
                    <button 
                    onClick={() => setReadMore(false)}
                    className="
                    p-3
                    rounded-3xl
                    hover:shadow-lg
                    transform
                    transition
                    delay-150
                    ease-in-out
                    ">
                        <GiCancel 
                        style={{
                            fontSize: "1.2em",
                            color: "orange"
                        }}
                        />
                    </button>
                </header>
                {/**main post div */}
                <div className="
                h-[30%]
                rounded-md
                bg-slate-800
                bg-opacity-20
                w-full
                flex
                flex-col
                space-y-3
                py-3
                ">
                    <h1 className="font-montserr
                    font-bold
                    text-amber-400
                    text-2xl
                    place-self-start
                    px-4
                    ">
                        {post?.data()?.title}
                    </h1>
                {/**text div here */}
                <div className="
                readMoreTextDiv
                ">
                    {post?.data()?.text}
                </div>
                {/**end of text div here */}
                </div>
                {/**end of main post div */}
                {/**comment section */}
                <div className="
                h-[50%]
                w-full
                flex
                flex-col
                px-2
                py-1
                ">
                    {/**comment form */}
                    <div className="
                    h-[50%]
                    w-full
                    rounded-lg
                    transform
                    transition
                    duration-300
                    ease-in-out
                    space-y-2
                    flex
                    flex-col
                    ">
                        <textarea 
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder='Comment your thoughts...'
                        className='postModalTextArea
                        ' />
                        <button 
                        onClick={addComment}
                        className="
                        addCommentBtn
                        ">
                            Comment
                        </button>
                    </div>
                    {/**end of comment forn */}
                    {/**comments */}
                    <div className="
                    h-[65%] 
                    w-full 
                    bg-slate-800
                    space-y-5
                    py-2
                    bg-opacity-20
                    overflow-y-scroll
                    scrollbar-thin
                    scrollbar-track-slate-800
                    scrollbar-thumb-amber-600
                    rounded-md
                    ">
                        {commentDisplay && commentDisplay.docs.map(doc => (
                            <Comment 
                            parentId={post?.id}
                            doc={doc}
                            postUser={post?.data()?.addedBy}
                            />
                        ))}
                    </div>
                    {/**end of comments */}
                </div>
                {/**comment section end */}
            </div>
        </div>
    )}
    </>
  )
}

export default UserPost