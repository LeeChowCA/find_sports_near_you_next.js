"use client"

import { getFirestore, query, collection, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import app from '../../../shared/FirebaseConfig';
import PostItem from '@/components/Home/PostItem';
import Toast from '@/components/Toast';
import axios from 'axios';


const Profile = () => {
    const { data: session } = useSession();
    const [userPost, setUserPost] = useState([]);
    const [showToast, setShowToast] = useState(false);


    const db = getFirestore(app);

    useEffect( () => {

        // use async function to get user post.can't add async to useEffect
        const getUserPost = async () => {
            if (session?.user.email) {
                // the first question mark after post is a query parameter
                //when we make the request, only /api/posts will be sent to the server, even the parameter will be sent, but it will not be visible in the URL. 
                // it's just a way to send the parameter to the server
                const {data} = await axios.get(`/api/posts?email=${session?.user.email}`);
                console.log(data);
                setUserPost(data);
            }
        }
        
        getUserPost();
    }, [session])

    /*const getUserPost = async () => {
        if (session?.user.email) {
            const q = query(collection(db, "posts"), where("email", "==", session?.user.email))
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log(doc.id, "=>", doc.data());

                let data = doc.data();
                data.id = doc.id;
                setUserPost(userPost => [...userPost, data]);
            })
        }
    }*/

    const onDeletePost = async (id) => {
        const res = await axios.delete(`/api/posts/${id}`);
        console.log(res);
        
        // await deleteDoc(doc(db, "posts", id));

        if (res.status === 200) {
            setShowToast(true)
        }
        
    }

    return (
        <div className='p-6 mt-8'>

            {showToast ? (
                <div className="absolute top-10 right-10">
                    <Toast
                        msg={"Delete Created Successfully"}
                        closeToast={() => setShowToast(false)}
                    />
                </div>
            ) : null}
            <h2 className='text-[35px] font-extrabold text-blue-500'>Profile</h2>
            <p>Manage Your Post</p>

            <div className='grid grid-cols-1 
    sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
    gap-5 mt-5 px-10'>
                {userPost && userPost?.map((item, index) => (
                    <div key={index}>
                        <PostItem post={item} modal={false} />
                        <button className='bg-red-400 w-full p-1 mt-1
        rounded-md text-white'
                            onClick={() => onDeletePost(item.id)}>Delete</button>
                    </div>
                    // <p key = {index}>{item.title}</p>
                ))}

            </div>
        </div>
    )
}

export default Profile
