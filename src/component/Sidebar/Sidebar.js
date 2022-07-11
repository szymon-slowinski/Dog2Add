import React from 'react'
import {useAuth} from '../../context/AuthContext'
import { UserCircleIcon,HeartIcon,IdentificationIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom';

function Sidebar() {
    const {currentUser} = useAuth();
    return (
        <div className='m-4 p-4 flex-col-reverse space-y-4   max-w-xl bg-gray-50 h-screen
     text-lg uppercase'>
            <div className='  hidden xl:flex items-center ml-auto space-x-3'>
            <UserCircleIcon className='h-6'/>
            <span className='h-5 font-serif '>{currentUser.email}</span>
            </div>
            <div className='hidden xl:flex items-center ml-auto space-x-3 cursor-pointer'>
            <IdentificationIcon className='h-6'/>
            <Link to={'/profil'} className=' font-serif '>Profil</Link>
            </div>
            <div className='hidden xl:flex items-center ml-auto space-x-3 cursor-pointer '>
            <HeartIcon className='h-6'/>
            <Link to={'/adopcja'}><span className='h-5 font-serif '>Adopcja</span></Link>
            </div>
        </div>
    )
}
export default Sidebar
