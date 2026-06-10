import React, {useContext, useState} from 'react';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function ChangeAvatar() {
  const [avatar, setAvatar] = useState(null)
  const {user, setUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!avatar) {
      alert("Please select an image first");
      return;
    }

    try{
      const formData = new FormData()
      formData.append("avatar", avatar)

      const token = localStorage.getItem("accessToken");

      const response = await api.patch("/users/avatar", formData, { headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },});
        setUser(response.data.data);
        navigate("/profile")
    }catch(error){
      console.log(error);
      alert("avatar changes failed!")
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold text-center mb-6">
          Change Avatar
        </h1>

        <form onSubmit={handleSubmit}>

          <div className="flex justify-center mb-6">
            <img
              src={user?.avatar}
              // src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
              alt="Current Avatar"
              className="w-28 h-28 rounded-full object-cover border-4 border-gray-200"
            />

          </div>

          <label className="block mb-2 font-medium">
            Select New Avatar
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            className="w-full border rounded-lg p-3 cursor-pointer"
          />
           
            &nbsp;
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Upload Avatar
          </button>

        </form>
      </div>
    </div>
  )
}

export default ChangeAvatar
