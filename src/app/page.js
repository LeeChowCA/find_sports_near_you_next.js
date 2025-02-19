'use client'

import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "@/components/Home/Hero";
import GameList from "@/components/Home/GameList";
import Search from "@/components/Home/Search";
import Posts from "@/components/Home/Posts";
import { getFirestore, doc, getDocs, setDoc, collection } from "firebase/firestore";
import app from '../../shared/FirebaseConfig.js'
import { useEffect, useState } from "react";

const Home = ({ Component, pageProps }) => {

  // const [posts, setPosts] = useState
  const db = getFirestore(app);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPost();
  }, [])

  const getPost = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));

    const newPost = [];
    querySnapshot.forEach((doc) => {
      newPost.push(doc.data());
      // doc.data() is never undefined for query doc snapshots
    });
    setPosts(posts => [...posts, ...newPost]);
    console.log(posts)
  }

  return <div className="flex flex-col items-center 
    justify-center mt-9">
    <div >
      <div className='flex flex-col items-center 
    justify-center mt-9'>
        <div className="w-[70%] md:w-[50%] lg:w-[55%]">
          <Hero />
          <Search />
          <GameList />
        </div>
        {posts ? <Posts posts={posts} /> : null}
      </div>
    </div>
  </div>

}

export default Home;
