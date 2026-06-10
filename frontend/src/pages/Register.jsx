import React, { useState } from 'react'
import axios from "axios"

function Register() {
  const [ formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: ""
    })

  const [avatar, setAvatar] = useState(null)
  const [coverImage, setCoverImage] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    try{
      const data = new FormData()

      data.append("fullName", formData.fullName)
      data.append("username", formData.username)
      data.append("email", formData.email)
      data.append("password", formData.password)

      data.append("avatar", avatar)
      data.append("coverImage", coverImage)

      const response = await axios.post("https://videotube-yx0o.onrender.com/api/v1/users/register",data)

      console.log(response.data);
      
      alert("User registered successfully")
    }catch(error){
      console.log(error);
      alert("Registration failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Register
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="w-full border p-3 rounded"
            onChange={handleChange}
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full border p-3 rounded"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border p-3 rounded"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full border p-3 rounded"
            onChange={handleChange}
          />

          <div>
            <p className="mb-1">Avatar</p>

            <input
              type="file"
              onChange={(e) => setAvatar(e.target.files[0])}
            />
          </div>

          <div>
            <p className="mb-1">Cover Image</p>

            <input
              type="file"
              onChange={(e) => setCoverImage(e.target.files[0])}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded"
          >
            Register
          </button>

        </form>

      </div>

    </div>
  )
}

export default Register
