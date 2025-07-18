import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Modal from '../components/modal/Modal'

const PrivateRoutes = () => {
  return (
 !localStorage.getItem("token") ? <Modal /> : <Outlet /> 
  )
}

export default PrivateRoutes