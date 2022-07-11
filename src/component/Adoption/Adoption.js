import React, { useState } from 'react'
import SidebarAdoption from '../SidebarAdoption/SidebarAdoption'
import SignHeader from '../SignHeader/SignHeader'
import { collection,getDocs, orderBy, } from 'firebase/firestore'
import { useEffect } from 'react/cjs/react.development'
import { Dogs } from '../Dogs/Dogs'
import { db } from '../../firebase'

function Adoption() { 
  const [dogs,setDogs] = useState([])
   
  const getDogs= async () => {
    const dogsArray=[]   
    const dogs = await getDocs(collection(db,'dogs'),orderBy('timestamp','desc'))
    for(let snap of dogs.docs){
           let data= snap.data()
           data.id = snap.id
           dogsArray.push({
               ...data
           })
          }
      setDogs(dogsArray)
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
        <Dogs dogs={dogs}/>
      )}
      {dogs.length < 1 && (
        <div>
          <h3>Proszę czekać</h3>
        </div>
      )}
      </div>
      </div>

      </>
    )
}

export default Adoption
