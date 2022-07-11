import React from 'react'
import {useAuth} from '../../context/AuthContext'
import { EmojiHappyIcon,PhotographIcon,VideoCameraIcon } from '@heroicons/react/outline'
import { useRef, useState } from 'react/cjs/react.development';
import { db, storage } from '../../firebase';
import ReactPlayer from 'react-player'
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import Picker from 'emoji-picker-react';

function PostAddBox() {
    const {currentUser}=useAuth();
    const [photoPost,setPhotoPost] = useState(null);
    const [videoPost,setVideoPost] = useState(null)
    const [loading,setLoading] = useState(false)
    const captionRef = useRef(null);
    const filePhotoRef = useRef(null)
    const fileVideoRef = useRef(null)
	const [chosenEmoji, setChosenEmoji] = useState('yellow faces');
	const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };
//   const EmojiData = ({ chosenEmoji }) => (
//   <div>
    
   
   
//   </div>
// );

  function Emotki() {
  var x = document.getElementById("eDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }

 
  
}   
    
    const sendingPost = async (e) => {
        e.preventDefault();
        if(loading)return
        if(!captionRef.current.value)return
        setLoading(true)
        const docRef = await addDoc(collection(db,"posts"),{
            message:captionRef.current.value + chosenEmoji.emoji, 
            name: currentUser.email,
            timestamp: serverTimestamp()
        })  
            if(photoPost){
                const photoRef = ref(storage,`posts.${docRef.id}/image`)  
                await uploadString(photoRef,photoPost,"data_url").then(async (snapshot) => {
                    const downloadUrl = await getDownloadURL(photoRef)
                    await updateDoc(doc(db,"posts",docRef.id),{
                        photo: downloadUrl
                    })
                })
                deleteImage();
                setPhotoPost(null)
            }else if(videoPost){
                const videoRef = ref(storage,`posts.${docRef.id}/video`)  
                await uploadString(videoRef,videoPost,"data_url").then(async (snapshot) => {
                    const downloadUrl = await getDownloadURL(videoRef)
                    await updateDoc(doc(db,"posts",docRef.id),{
                        video: downloadUrl
                    })
                })
                deleteImage();
                setPhotoPost(null)
            }
            setLoading(false)
            
        }
    
    const addImageToPost = (e) => {
        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setPhotoPost(readerEvent.target.result)
        }
    }
    const addVideoToPost = (e) => {
        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = (readerEvent) => {
            setVideoPost(readerEvent.target.result)
        }
    }


    const deleteImage = () => {
        setPhotoPost(null)
        setVideoPost(null)
    }
    
    return (
        <div className='flex flex-col flex-grow m-4 bg-white w-full p-4 rounded-2xl shadow-md text-center '>
        <div className='flex flex-row-reverse p-4 space-x-4 w-full items-center '>
            <form className='flex flex-1'>
                    <input 
                    type='text'
                    ref={captionRef} 
                    className='flex-grow w-full  px-4 rounded-full h-10 bg-gray-50 focus:outline-none' 
                    placeholder={`${currentUser.email} Masz ogromną wiedzę? Podziel się z innymi!`}>
                    </input>{chosenEmoji.emoji}
                    <button type='submit' hidden  onClick={sendingPost} >Dodaj Post
                    </button>               
            </form>
            {photoPost  && (
                <div onClick={deleteImage} className='flex flex-col cursor-pointer tra transform hover:scale-150'>
                    <img src={photoPost} className='h-5 object-contain rounded-t-md' alt=''></img>
                    <p className='h-4 '>Usuń</p>
                </div>
            )}
            {videoPost && (
                <div onClick={deleteImage} className='flex flex-col cursor-pointer tra transform hover:scale-150'>
                    <ReactPlayer controls width='100px' height='50px'  src={videoPost}/>
                    <p className='h-4 '>Usuń</p>
                </div>
            )}
        </div>
        <div className='flex  justify-evenly p-3 border-t'>
            <div onClick={()=> fileVideoRef.current.click()} className='inputIcon'>
                <VideoCameraIcon className='h-5'/> 
                <p className='text-center'>Wideo</p>
                <input ref={fileVideoRef} type="file" hidden onChange={addVideoToPost}></input>
            </div>
            <div onClick={()=> filePhotoRef.current.click()} className='inputIcon'>
                <PhotographIcon className='h-5'/>
                <p className='text-center'>Zdjęcie</p>
                <input ref={filePhotoRef} type="file" hidden onChange={addImageToPost}></input>
            </div>
            <div onClick={Emotki} className='inputIcon' >
				
				<EmojiHappyIcon className='h-5'/>
                <p className='text-center'>Nastrój</p>
				<div id="eDIV" style={{display: 'none'}}>
								
					<Picker
					onEmojiClick={onEmojiClick}
					disableAutoFocus={true}
					groupNames={{ smileys_people: "PEOPLE" }}
					native
					/>
      
					
						
				</div> 
						
            </div>
        </div>
        <div>
    
        </div>
        <div className='flex items-center justify-center z-0'>
        </div>
     </div>
    )
}

export default PostAddBox
