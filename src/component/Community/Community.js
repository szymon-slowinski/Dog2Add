import React from 'react'
import PostAddBox from '../PostAddBox/PostAddBox'
import Posts from '../Posts/Posts'

function Community() {
     
    return (
        <div className='flex flex-col '>
            <PostAddBox/>
            <Posts/>
        </div>
    )
}

export default Community
