'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Form from '../../components/CreatePost/Form'

const CreatePost = () => {
    const {data:session} = useSession();
    const router = useRouter();

    useEffect( () => {
        if (!session){
            router.push('/');
        }
    }, [])

    return (
        <Form/>
    )
}

export default CreatePost
