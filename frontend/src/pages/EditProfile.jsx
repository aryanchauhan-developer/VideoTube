import React, {useContext, useState} from "react";
import AuthContext from "../context/AuthContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function EditProfile(){
  const {user, setUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "")

  

  const handleSubmit = async(e) => {
    e.preventDefault()

    try{
      const response = await api.patch("/users/update-account", {fullName, email})

      setUser(response.data.data)
      alert("Profile updated successfully");
      navigate("/profile");
    }catch(error){
      console.log(error);
      alert("update failed")
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-md w-[500px]">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Edit Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input type="file"

          />

          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-3 rounded"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded"
          >
            Save Changes
          </button>

        </form>

      </div>

    </div>
  );
} 

export default EditProfile;