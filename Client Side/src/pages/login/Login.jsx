import React, { useState } from 'react'
import "./login.scss"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toastAlert } from '../../utils/toastAlert'

const Login = () => {
const [isPasswordHidden, setIsPasswordHidden] = useState(true)
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const navigate = useNavigate()

const loginHandler = async ()=> {
    if (!email.endsWith("@gmail.com")) {  
    return toastAlert({
        type: "error",
        message: "Please type valid email"
    })
    }
    
        if (password.length < 8) {
    return toastAlert({
        type: "error",
        message: "password Too short"
    })
        }
 try {
       const res = await axios.post("http://localhost:8000/auth/login", {
        email,
        password,
    })
    localStorage.setItem("token", res.data.token)
navigate("/home")
    return toastAlert({
type: "success",
message: res.data.message
    })
 } catch (error) {
    return toastAlert({
        type: "error",
        message: error.response.data.message
    })
 }
}

  return (
    <div className='login'>

<div className="container">
    <div className='email'>
    <span>Email</span>
    <input type="text" onChange={(e)=> setEmail(e.target.value)} placeholder='Email' />
</div>

<div className="password">
   <span>Password</span> 
   <div>
    <input type= {isPasswordHidden ? "password" : "text"} onChange={(e)=> setPassword(e.target.value)} placeholder='Password' />
    <div className='passwordToggle'>
        {
            isPasswordHidden ? 
            <img src="/img/hideIcon.png" onClick={()=> setIsPasswordHidden(false)} height="40px" alt="" />:
            <img src="/img/showIcon.png" onClick={()=> setIsPasswordHidden(true)} height="35px" alt="" />
        }
    </div>
   </div>
</div>

<div className='btnCon'>
    <button onClick={()=> loginHandler()}>Login</button>
<span>don't have an Account go to <Link to="/signup">Signup</Link></span>
</div>
</div>

    </div>
  )
}

export default Login