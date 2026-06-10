import React, {useContext, useState} from 'react';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function ChangeCoverImage() {
  const [coverImage, setCoverImage] = useState(null)
  const {user, setUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!coverImage) {
      alert("Please select an image first");
      return;
    }

    try{
      const formData = new FormData()
      formData.append("coverImage", coverImage)

      const token = localStorage.getItem("accessToken");

      const response = await api.patch("/users/cover-image", formData, { headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },});
        setUser(response.data.data);
        navigate("/profile")
    }catch(error){
      console.log(error);
      alert("coverimage changes failed!")
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-2xl">

      <h1 className="text-3xl font-bold text-center mb-6">
        Change Cover Image
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
        <img
          src={user?.coverImage}
          alt="Current Cover"
          className="w-full h-48 object-cover rounded-xl border"
        />
        <p className="text-center text-gray-500 mt-2">
          Current Cover Image
        </p>
      </div>

      <label className="block mb-2 font-medium">
        Select New Cover Image
      </label>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setCoverImage(e.target.files[0])}
        className="w-full border rounded-lg p-3 mb-6"
      />

      <button
        type="submit"
        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Upload Cover Image
      </button>
      </form>
      </div>
    </div>
  )
}

export default ChangeCoverImage