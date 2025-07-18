import React, { useEffect, useState } from 'react'
import Footer from '../../components/footer/Footer'
import AllLoansCard from '../../components/allLoansCard/AllLoansCard'
import AdminNavbar from '../../components/adminNavbar/AdminNavbar'

const AllLoans = () => {

    const [loanData, setLoanData] = useState([])
    
    const fetchLoans = async () => {
      try {
        const res = await fetch("http://localhost:8000/loan/all_admin", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
    
        const data = await res.json();
        setLoanData(data.loans)
        console.log(data.loans);
      } catch (err) {
        console.error("Failed to fetch loans:", err);
      }
    };
    
    useEffect(()=> {
    fetchLoans()
    }, [])

  return (
    <div className='allLoans'>
        <AdminNavbar />
<div className="Loans" style={{
    display: "flex",
    justifyContent: "center",
    margin: "40px 0"
}}>
    <AllLoansCard data={loanData} />
</div>
        <Footer />
    </div>
  )
}

export default AllLoans