import React from "react";
import dog2addlogo from '../../assets/img/dog2addlogo.png'
import { useState } from 'react/cjs/react.development'
import {useAuth} from '../../context/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { HomeIcon,GlobeIcon,SearchCircleIcon } from '@heroicons/react/outline' 

function SignHeader() {
    const[error,setError] =useState("")
    const {logout} = useAuth();
    const history = useHistory()
    
    //TODO hook useCallback
    async function handleLogout() {
        setError('')
        try{
          await logout()
          history.push("/logowanie")  
        }catch{
            setError("Błąd w wylogowaniu")
        }
    } 
    return(
<div className="flex w-auto z-100 bg-white sticky top-0  justify-between shadow-md">
    <div className="flex items-center">
        <img src={dog2addlogo} alt="logo" className="ml-4 h-16 p-1 m-4" layout="fixed"></img>
    </div>
    <div className="flex justify-center flex-grow m-2">
        <div className="flex h-auto items-center space-x-3 cursor-pointer p-3 ">
        {/* component */}
        <Link to={'/'}>
        <HomeIcon className=" h-12 w-5 hover:text-gray-500"/>
        </Link>
        <Link to={'/adopcja'}>
        <GlobeIcon className=" h-12 w-5 hover:text-gray-500"/>
        </Link>
        <SearchCircleIcon className=" h-12 w-5 hover:text-gray-500"/>
        </div>
    </div>
    <div className="flex items-center mr-2">
        <button type='submit'  onClick={handleLogout} className='uppercase text-sm font-bold font-body 
        border-2 border-green-400 border-opacity-50 rounded-full py-3 px-5 tracking-wide hover:border-gray-300'>Wyloguj</button>
    </div>
    {error ? <div role="alert">
  <div className="bg-red-500 text-white text-center font-bold rounded-t px-4 py-2">
    Błąd
  </div>
  <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
    <p>{error}</p>
  </div>
</div> : null} 
    </div>
    );
}

export default SignHeader;