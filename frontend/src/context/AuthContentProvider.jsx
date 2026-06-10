import React, { useEffect, useState } from 'react'
import api from '../services/api';
import AuthContext from './AuthContext';

function AuthContextProvider({children}) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const getCurrentUser = async() => {
    try{
      const response = await api.get("/users/current-user")
      console.log(response);
      setUser(response.data.data)
    }catch(error){
      setUser(null)
    }finally{
      setLoading(false)
    }
  }

  // useEffect(() => {
  //   getCurrentUser()
  // },[])
 
  return (
    <AuthContext.Provider value={{user, setUser, loading}} >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
