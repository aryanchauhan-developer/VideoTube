import React, { useContext, useState } from 'react'
import axios from "axios"
import AuthContext from '../context/AuthContext.js'
import api from '../services/api.js'
import { useNavigate } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {setUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try{
      const response = await api.post("/users/login", {email, password})

      localStorage.setItem("accessToken", response.data.data.accessToken)

      setUser(response.data.data.user)
      navigate("/")
    }catch(error){
      console.log(error)

      alert("Login failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <form className='space-y-4' onSubmit={handleSubmit}>

          <input 
            type="text"
            placeholder='Email'
            className='w-full border p-3 rounded'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <input 
              type="password" 
              placeholder='Password'
              className="w-full border p-3 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />

              <button className="w-full bg-black text-white p-3 rounded" type='submit'>Login
              </button>
        </form>
      </div>
    </div>
  )
}

export default Login
