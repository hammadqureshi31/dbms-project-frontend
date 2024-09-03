import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

const OnlyAdminPrivateRoute = () => {
    const currentUser = useSelector((state)=> state.currentUser.data)
  return currentUser && currentUser.isAdmin ? <Outlet /> : <Navigate to={'/'}/>;
}

export default OnlyAdminPrivateRoute