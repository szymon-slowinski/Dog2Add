import React from 'react'
import Community from '../Community/Community';
import Sidebar from '../Sidebar/Sidebar';
import SignHeader from '../SignHeader/SignHeader'


 export function Dashboard() {
    return (    
      <>
          <div>
            <div className='fixed top-0 w-full z-50'>
              <SignHeader/>
            </div>
          <div className='flex top-20 fixed'>
          <Sidebar/>
          </div>
          </div>
          <div className=' flex justify-between h-screen bg-gray-50'>  
          <div className='flex w-3/5 flex-col pt-20  mx-auto'>
            <Community/>
          </div>
        </div>
        
 </>
  )
}

export default Dashboard
