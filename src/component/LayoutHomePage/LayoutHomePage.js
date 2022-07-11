import React from 'react'
import homeimage from "../../assets/img/homeimage.jpg"
import RegisterForm from '../RegisterForm/RegisterForm'
import { AuthProvider } from '../../context/AuthContext'
import Header from '../Header/Header'

function LayoutHomePage() {
    return (
        <>
        <Header></Header>
        <div className=' flex w-screen min-h-screen items-center justify-center  bg-white'>
            <div className=' z-0 mr-2  m-10 flex-row w-1/2 '>
                <img src={homeimage}   alt='dog2add' className='z-50 w-full object-cover object-center rounded-lg shadow-md'></img>
            </div>
            <div className='flex w-1/4   justify-center items-center'>
                <RegisterForm/>
            </div>
        </div>  
        </>
    )
}

export default LayoutHomePage
