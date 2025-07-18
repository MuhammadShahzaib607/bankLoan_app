import React, { useEffect, useState } from 'react';
import Footer from '../../components/footer/Footer';
import LoanCard from '../../components/loanCard/LoanCard';
import axios from 'axios';
import AdminNavbar from '../../components/adminNavbar/AdminNavbar';

const AdminDashboard = () => {
  const [data, setData] = useState([]);

  const fetchAllLoans = async () => {
    try {
      const res = await axios.get("http://localhost:8000/loan/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setData(res.data.loans);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllLoans();
  }, []);

  return (
    <div className="adminDashboard">
      <AdminNavbar />
      
      <div className="loanCon" style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        margin: "40px 0"
      }}>
        <LoanCard data={data} fetchAgain={fetchAllLoans} />
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
