"use client"

import React from 'react'
import Image from 'next/image'
import { HiOutlinePencilSquare,  HiArrowLeftOnRectangle } from "react-icons/hi2";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';

const USER_IMAGE = 'https://miro.medium.com/v2/resize:fit:640/format:webp/1*B3Z3Knd8M0zXj8zMPp3n-w.jpeg'

const Header = () => {
  const router=useRouter();
  const {data: session} = useSession(); 

  return (
    <div className='flex justify-between p-3 border-b-[2px] border-[#FF3366]'>
      <div className='flex gap-4 items-end'>
      <Image alt='logo' src='/images/my_logo.jpg' width={100} height={80} className='hover:cursor-pointer' onClick={() => router.push('/')}/>
      <p className='m-0 hidden sm:block text-base text-gray-600 italic '>Sync up with local sports enthusiasts</p>
      </div>
      <div className='flex gap-4'>
        <button onClick={()=>router.push('/create-post')} className='bg-black p-2 px-3 text-white rounded-full'>
          <span className='hidden sm:block'>CREATE POST</span>
          <HiOutlinePencilSquare  className='sm:hidden text-[20px]'/>
        </button>
        {session ? <button className='bg-white text-grey-500 p-2 px-3 border-[1px] rounded-full' onClick={() => signOut()}>
          <span className='hidden sm:block'>Sign Out</span>
          <HiArrowLeftOnRectangle className='sm:hidden'/>
          </button> : <button className='bg-white text-grey-500 p-2 px-3 border-[1px] rounded-full' onClick={() => signIn()}>
          <span className='hidden sm:block'>Sign In</span>
          <HiArrowLeftOnRectangle className='sm:hidden'/>
          </button>}
        <Image src={session ? session?.user?.image: USER_IMAGE} alt='user image' width={45} height={40} className='rounded-full hover:cursor-pointer' onClick={() => router.push('/profile')}/>
      </div>
    </div>
  )
}

export default Header
