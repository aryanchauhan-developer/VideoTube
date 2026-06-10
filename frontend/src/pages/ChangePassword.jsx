import React, { useState } from 'react'
import api from '../services/api'

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(newPassword !== confirmPassword){
      alert("Password are not match");
      return;
    }

    try{
      const token = localStorage.getItem("accessToken");

      const response = await api.post("/users/change-password", {oldPassword, newPassword}, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      console.log(response.data);
      alert("Password changed successfully")

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }catch(error){
      console.log(error);
      alert("Failed to change password");
    }
  }

  return (
    <div  className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-6">Change Password</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Current Password</label>
          <input 
            className="w-full border p-3 rounded-lg mb-4"
            type="password" 
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}  
              />
        </div>

        <div>
          <label>New Password</label>
          <input 
            className="w-full border p-3 rounded-lg mb-4"
            type="password" 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}  
              />
        </div>

        <div>
          <label>Confirm Password</label>
          <input 
            className="w-full border p-3 rounded-lg mb-6"
            type="password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}  
              />
        </div>
      </form>

      <button type="submit" className="w-full bg-black text-white py-3 rounded-lg">
          Change Password
      </button>
    </div>
  )
}

export default ChangePassword
