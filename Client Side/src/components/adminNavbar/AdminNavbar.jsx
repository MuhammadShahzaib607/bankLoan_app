import React, { useEffect, useState } from 'react'
import './adminNavbar.scss'
import { Link } from 'react-router-dom'
import axios from 'axios'

const AdminNavbar = () => {

  return (
    <div className='navbar'>
      <Link to="/home"><div className="websiteName">QuickLoan</div></Link>

      <div className="navLinks">
        <Link to="/about"><li>About</li></Link>
        <Link to="/allLoans"><li>All Loans</li></Link>
        <Link to="/adminDashboard"><li>Dashboard</li></Link>
        <Link to="/"><li onClick={() => localStorage.removeItem("token")}>Logout</li></Link>
      </div>

      <div className="searchInput">
        <input type="text" placeholder='Search for users or loans' />
        <button>Search</button>
      </div>
    </div>
  )
}

export default AdminNavbar
