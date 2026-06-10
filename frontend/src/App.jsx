import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from "./pages/Home"
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import ChangeAvatar from './pages/ChangeAvatar'
import ChangeCoverImage from './pages/ChangeCoverImage'
import ChangePassword from './pages/ChangePassword';
import CreatePost from "./pages/CreatePost";

function App() {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/change-avatar" element={<ChangeAvatar />} />
        <Route path="/change-cover" element={<ChangeCoverImage />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
  )
}

export default App
