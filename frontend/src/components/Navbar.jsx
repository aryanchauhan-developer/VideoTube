import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const {setUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = async() => {
    try{
      await api.post("/users/logout")

    setUser(null)
    alert("You are logout!")
    navigate("/login")
    }catch(error){
      console.log(error);
    }
  }


  return (
    <nav className="flex justify-between items-center p-4 border-b">

      <button onClick={() => navigate("/profile")} >Profile</button>

      <h1 className="font-bold text-xl">
        VideoTube
      </h1>

      <div className="flex gap-4">

        <button 
          onClick={() => navigate("/create-post")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Create Post</button>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  )
}

export default Navbar
