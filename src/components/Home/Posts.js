'use client'

import React, { useEffect } from 'react'
import PostItem from './PostItem'
import PostModal from './PostModal'

const Posts = ({ posts }) => {
    useEffect(() => {
        console.log('Posts', posts);
    })


    return (
        <div>
            <PostModal/>
        <div className='grid grid-cols-1 
    sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
    gap-5 mt-5 px-10'>
            {
                posts.map(post => <div key={1} onClick={()=>{window.my_modal_1.showModal()}}><PostItem post={post} /></div>)
            }
        </div>
        </div>
    )
}

export default Posts
