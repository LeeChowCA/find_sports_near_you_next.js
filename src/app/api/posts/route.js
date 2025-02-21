import React from 'react'
import { getFirestore, collection, query, where, getDocs, doc ,addDoc, setDoc} from 'firebase/firestore';
import { NextResponse } from 'next/server';
import app from '../../../../shared/FirebaseConfig';

const GET = async (request) => {
    const { searchParams } = new URL(request.url);

    // URLSearchParams { 'email' => 'zhoujianpingzx@gmail.com' } searchParams.is the content of the searchParams.so we need
    // to get the email from the searchParams using the get method
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

export async function POST(request) {
    try {
        const db = getFirestore(app);
        const data = await request.json();
        await setDoc(doc(db, "posts", Date.now().toString()), data);
        return NextResponse.json({ id: 0 }, { status: 201 });
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json({ error: 'An error occurred while creating the post' }, { status: 500 });
    }
}

export {GET}
