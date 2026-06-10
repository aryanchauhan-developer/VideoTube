import React, { useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [caption, setCaption] = useState("");
  const [media, setMedia] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{
      const formData = new FormData();

      formData.append("caption", caption)
      formData.append("media", media)

      const token = localStorage.getItem("accessToken");

      const response = await api.post("/posts/createPost", formData, 
        {
           headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      console.log(response.data);

      navigate("/profile")

      setCaption("");
      setMedia(null);
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-10">

      <h1 className="text-3xl font-bold mb-6">
        Create Post
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <textarea
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full border rounded p-3"
        />

        <input
          type="file"
          onChange={(e) => setMedia(e.target.files[0])}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-5 py-2 rounded"
        >
          Upload Post
        </button>
      </form>

    </div>
  )
}

export default CreatePost
