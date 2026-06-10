import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext.js'
import Navbar from '../components/Navbar.jsx'
import api from '../services/api.js'


function Home() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getPosts();
  }, [])

  const getPosts = async() => {
    try{
      const response = await api.get("/posts")

      console.log(response.data.message);
      setPosts(response.data.message)
    }catch(error){
      console.log(error);
      
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-5">

      <h1 className="text-3xl font-bold mb-6">
        Home Feed
      </h1>

      {posts.map((post) => (
        <div
          key={post._id}
          className="bg-white rounded-xl shadow mb-8 overflow-hidden"
        >

          <div className="flex items-center gap-3 p-4">
            <img
              src={post.owner.avatar}
              alt="avatar"
              className="w-12 h-12 rounded-full"
            />

            <h3 className="font-semibold">
              @{post.owner.username}
            </h3>
          </div>

          {post.mediaType === "image" ? (
            <img
              src={post.media}
              alt="post"
              className="w-full h-96 object-cover"
            />
          ) : (
            <video
              src={post.media}
              controls
              className="w-full h-96 object-cover"
            />
          )}

          <div className="p-4">
            <p>{post.caption}</p>
          </div>

        </div>
      ))}
    </div>


  )
}

export default Home
