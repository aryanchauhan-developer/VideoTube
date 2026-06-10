import { useContext } from "react"
import { Navigate } from "react-router-dom"

import { AuthContextProvider } from "../context/AuthContextProvider"

function ProtectedRoute({children}){
  const [user, loading] = useContext(AuthContextProvider)

  if(loading){
    return <h1>Loading...</h1>
  }

  if(!user){
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute