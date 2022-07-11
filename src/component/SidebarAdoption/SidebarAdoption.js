import React from 'react'
import {useAuth} from '../../context/AuthContext'
import { UserCircleIcon,HeartIcon,IdentificationIcon,CollectionIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom';

function SidebarAdoption() {
    const {currentUser} = useAuth();
    return (
        <div className='m-5 p-4 flex-col-reverse space-y-4  max-w-xl bg-gray-50 h-screen uppercase'>
            <div className='flex space-x-3'>
            <UserCircleIcon className='h-6'/>
            <span className='h-5 font-serif text-lg'>{currentUser.email}</span>
            </div>
            <div className='flex space-x-3 cursor-pointer'>
            <IdentificationIcon className='h-6'/>
            <Link to={'/profil'} className=' font-serif text-lg'>Profil</Link>
            </div>
            <div className='flex space-x-3 cursor-pointer '>
            <HeartIcon className='h-6'/>
            <Link to={'/adopcja-dodaj'}><span className='h-5 font-serif text-lg'>Dodaj Pieska</span></Link>
            </div>
            <div className='flex space-x-3 cursor-pointer '>
            <CollectionIcon className='h-6'/>
            <Link to={'/mojepsy'}><span className='h-5 font-serif text-lg'>Moje Pieski</span></Link>
            </div>
        </div>
    )
}
export default SidebarAdoption
