import React, { useState, useEffect, useRef} from 'react'
import {useAuth} from '../../context/AuthContext'
import { ThumbUpIcon,ChatIcon} from '@heroicons/react/outline'
import ReactPlayer from 'react-player'
import { db } from '../../firebase';
import 'firebase/firestore';
import Moment from 'react-moment';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';


function Post({id,message,name,postPhoto,timestamp,postVideo}) {
  const [comments,setComments] = useState([]) 
  const [comment,setComment] = useState('')
  const captionRef = useRef(null)
  const {currentUser}=useAuth();
  const [likes,setLikes]=useState([])
  const [liked,setLiked]=useState(false)
  

  useEffect(()=>onSnapshot(query
    (collection(db,'posts',id,'comments'),
    orderBy('timestamp','desc')
    ),
    (snapshot) => setComments(snapshot.docs)
  ),[])
  
  useEffect(()=>onSnapshot
    (collection(db,'posts',id,'likes'),
    (snapshot) => setLikes(snapshot.docs)
  ),[])

  useEffect(()=>{
    setLiked(likes.findIndex((like) => (like.id === currentUser?.uid )) !==-1)
  },[likes,currentUser])
     
const sendComment = async (e) => {
  e.preventDefault()
  if(!captionRef)return
  const commentToSend = comment
  setComment('')
  await addDoc(collection(db,"posts",id,"comments"),{
    comment: commentToSend,
    name:currentUser.email,
    timestamp:serverTimestamp(),
  })
}

const likePost = async (e) => {
  e.preventDefault() 
  if(liked){
   await deleteDoc(doc(db,"posts",id,"likes",currentUser.uid))
  }else{
    await setDoc(doc(db,'posts',id,'likes',currentUser.uid),{
      username: currentUser.email
    })
  }
}

           
  return (
        <div className='flex items-center flex-col'>
           <div className=' w-full p-5 bg-white mt-5 rounded-t-2xl shadow-sm'>
            <div className='flex flex-col items-center space-x-3'>
            <h1 className=' text-sm'>{name}</h1>
            <p className=' text-xs text-gray-150'>{new Date(timestamp?.toDate()).toLocaleString()}</p>
            </div>
            <div className='flex-row' >
            <p className=' text-base p-3'>{message}</p>
            </div>
            {postPhoto && (
            <div className='flex items-center justify-center w-auto h-1/2'>
                <img className=' object-center  object-cover w-full' src={postPhoto} alt=''/>
            </div>
          )}
             {postVideo && (
            <div className='flex items-center justify-center w-auto h-auto'>
                <ReactPlayer controls url={postVideo} />
            </div>
          )}
            <form className='flex items-center p-3 '>
            <div className="flex items-center cursor-pointer">
                {liked ? (
                  <ThumbUpIcon onClick={likePost} className=' text-green-400  h-6 pr-2 '></ThumbUpIcon>
                ) : (<ThumbUpIcon onClick={likePost} className='h-6 pr-2'></ThumbUpIcon>
                )}  
              </div>
                  <p className='pr-3'>{likes.length > 0 && (
                    <p className=' text-green-300 text-sm'>{likes.length} dogs </p>
                  )}</p>
              <input 
              value={comment}
              ref={captionRef}
              onChange={e=> setComment(e.target.value)}
              className='flex-1 border-none focus:ring-0 outline-none' 
              placeholder='Dodaj komentarz...' 
              type="text"/>
              <ChatIcon className=' pr-2 h-5'/>
              <button type='submit' disabled={!comment.trim()}  onClick={sendComment} className='text-base text-green-500'>Dodaj</button>
            </form>
            {comments.length > 0 &&(
              <div className='ml-10 h-20 overflow-y-auto scrollbar-thumb-black scrollbar-thin'>
                {comments.map((comment) => (
                  <div key={comment.id} className='flex justify-between items-center space-x-2 mb-2'>
                    <p className='font-bold'><span className='font-medium pr-1 text-xs'>{comment.data().name}</span>{comment.data().comment}
                    </p>
                    <Moment className='pr-4 text-sm' fromNow>{comment.data().timestamp?.toDate()}</Moment>
                  </div>
                ))}
              </div>
            )}
            </div>
        </div>
    )
}

export default Post
