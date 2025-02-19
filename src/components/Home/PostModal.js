import React from 'react'
import PostItem from './PostItem'
import { HiOutlineXCircle } from 'react-icons/hi2'

const PostModal = ({ post }) => {
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_1" className="modal p-0 rounded-lg">


                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className='absolute right-2 top-2'>
                        <HiOutlineXCircle className='text-[22px] text-white' />
                    </button>
                    <PostItem post={post} />
                </form>

            </dialog>
        </div>
    )
}

export default PostModal
