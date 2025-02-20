import { getFirestore, doc, deleteDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';
import app from '../../../../../shared/FirebaseConfig';

const DELETE = async (request, {params}) => {
    const {id} = params;

    if (!id) {
        return NextResponse.error(new Error('Post ID is required'));
    }

    const db = getFirestore(app);

    try{
        await deleteDoc(doc(db, "posts", id));
        return NextResponse.json({message: 'Post deleted successfully'}, {status: 200});
    } catch{
        return NextResponse.error(new Error('An error occurred while deleting post'));
    }
}

export {DELETE}