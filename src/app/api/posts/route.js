import React from 'react'
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { NextResponse } from 'next/server';
import app from '../../../../shared/FirebaseConfig';

const GET = async (request) => {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
        return NextResponse.error(new Error('Email is required'));
    }

    const db = getFirestore(app);

    try {
        // Get all posts by email
        const q = query(collection(db, "posts"), where("email", "==", email))

        // Get all posts
        const querySnapshot = await getDocs(q);
        const posts = [];

        // Loop through the posts and add them to the posts array
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            data.id = doc.id;
            posts.push(data);
        })

        // Return the posts
        return NextResponse.json(posts, {status: 200});
    } catch (error) {
        return NextResponse.error(new Error('An error occurred while fetching posts'));
    }
}

const POST = async (request) => {
    
}

export {GET}
