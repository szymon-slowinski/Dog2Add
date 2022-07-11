import React, { useState } from 'react'
import SidebarAdoption from '../SidebarAdoption/SidebarAdoption'
import SignHeader from '../SignHeader/SignHeader'
import { collection,getDocs, where,query} from 'firebase/firestore'
import { useEffect } from 'react/cjs/react.development'
import { db } from '../../firebase'
import { MyDogs } from './MyDogs'
import {useAuth} from '../../context/AuthContext'

function UsersDogs() { 
  const [dogs,setDogs] = useState([])
    const {currentUser} = useAuth();
    const getDogs= async () => {
    const dogsArray=[]   
    const colRef=collection(db,'dogs')
    const dogq = query(colRef,where(`user`,`==`,`${currentUser.email}`))
    const dogs = await getDocs(dogq)
    for(let snapshot of dogs.docs){
           let data= snapshot.data()
           data.id = snapshot.id
           dogsArray.push({
               ...data
           })
           if(dogsArray.length === dogs.docs.length){
               setDogs(dogsArray)
           }
       }
   }

   useEffect( () =>{
    getDogs()
   },[])


  return (
        <>
        <div>
        <div className='fixed top-0 w-full'>
          <SignHeader></SignHeader>
        </div>
      <div className='flex top-20 fixed'>
      <SidebarAdoption/>
      </div>
      <div className='flex pt-24 top-20 pl-96'>
      {dogs.length > 0 && (
        <MyDogs dogs={dogs}/>
      )}
      {dogs.length < 1 && (
        <div>
          <h3>Nie masz aktywnych zgłoszeń do adopcji</h3>
        </div>
      )}
      </div>
      </div>

      </>
    )
}

export default UsersDogs
