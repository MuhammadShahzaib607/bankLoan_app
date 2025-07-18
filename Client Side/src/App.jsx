import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import AuthRoute from './routes/AuthRoute'
import { ToastContainer, Bounce } from 'react-toastify'
import PrivateRoutes from './routes/PrivateRoutes'
import Home from './pages/home/Home'
import About from './pages/about/About'
import Loans from './pages/loans/Loans'
import LoanForm from './pages/loanForm/LoanForm'
import Dashboard from './pages/dashboard/Dashboard'
import AdminDashboard from './pages/adminDashboard/AdminDashboard'
import AdminRoute from './routes/AdminRoute'
import AllLoans from './pages/allLoans/AllLoans'

function App() {

  return (
    <>

<ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>

    <Routes>
  
  <Route element={<AuthRoute />}>
    <Route index element={<Login />} />
      <Route path='/signup' element={<Signup />} />      
  </Route>

  <Route element={<PrivateRoutes />}>
<Route path='/home' element={<Home />} />
<Route path='/about' element={<About />} />
<Route path='/loans' element={<Loans />} />
<Route path='/loanForm' element={<LoanForm />} />
<Route path='/dashboard' element={<Dashboard />} />
  </Route>

  <Route element={<AdminRoute />}>
    <Route path='/adminDashboard' element={<AdminDashboard />} />
    <Route path='/allLoans' element={<AllLoans />} />
  </Route>
  
    </Routes>
    </>
  )
}

export default App
