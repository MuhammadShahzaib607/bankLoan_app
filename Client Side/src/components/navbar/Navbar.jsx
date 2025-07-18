// import React, { useEffect, useState } from 'react'
// import "./navbar.scss"
// import { Link } from 'react-router-dom'
// import axios from 'axios'

// const Navbar = () => {
//   const [isAdmin, setIsAdmin] = useState(false)

//   const fetchUser = async () => {
//     try {
//       const userData = await axios.get("http://localhost:8000/auth/getUser", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       setIsAdmin(userData.data.user.isAdmin)
//     } catch (err) {
//       console.error("Failed to fetch user:", err);
//     }
//   }

//   useEffect(() => {
//     fetchUser()
//   }, [])

//   return (
//     <div className='navbar'>
//       <Link to="/home"><div className="websiteName">QuickLoan</div></Link>

//       <div className="navLinks">
//         <Link to="/about"><li>About</li></Link>
//         {
//           isAdmin
//             ? <Link to="/allLoans"><li>All Loans</li></Link>
//             : <Link to="/loans"><li>Loans</li></Link>
//         }
//         {
//           isAdmin
//             ? <Link to="/adminDashboard"><li>Dashboard</li></Link>
//             : <Link to="/dashboard"><li>Dashboard</li></Link>
//         }
//         <Link to="/"><li onClick={() => localStorage.removeItem("token")}>Logout</li></Link>
//       </div>

//       <div className="searchInput">
//         <input type="text" placeholder='Search for loans' />
//         <button>Search</button>
//       </div>
//     </div>
//   )
// }

// export default Navbar


import React, { useEffect, useState } from 'react'
import "./navbar.scss"
import { Link } from 'react-router-dom'
import axios from 'axios'

const Navbar = () => {

  return (
    <div className='navbar'>
      <Link to="/home"><div className="websiteName">QuickLoan</div></Link>

      <div className="navLinks">
        <Link to="/about"><li>About</li></Link>
        <Link to="/loans"><li>Loans</li></Link>
        <Link to="/dashboard"><li>Dashboard</li></Link>
        <Link to="/"><li onClick={() => localStorage.removeItem("token")}>Logout</li></Link>
      </div>

      <div className="searchInput">
        <input type="text" placeholder='Search for loans' />
        <button>Search</button>
      </div>
    </div>
  )
}

export default Navbar
