import React, { useEffect, useState } from 'react';
import './dashboard.scss';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import axios from 'axios';

const Dashboard = () => {
  const [loanStats, setLoanStats] = useState({
    totalLoans: 0,
    approvedLoans: 0,
    rejectedLoans: 0
  });

  const fetchLoanStats = async () => {
    try {
      const res = await axios.get("http://localhost:8000/loan/loan-stats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setLoanStats(res.data);
    } catch (err) {
      console.error("Error fetching loan stats:", err);
    }
  };

  useEffect(() => {
    fetchLoanStats();
  }, []);

  return (
    <div className="dashboard">
      <Navbar />

      <div className="mainContent">
        <h2>Welcome, Muhammad Shahzaib</h2>

        {/* User Info */}
        <div className="userInfo">
          <p><strong>Email:</strong> muhammadshahzaib@gmail.com</p>
        </div>

        {/* Stats Box */}
        <div className="box">
          <div className="totalLoans">
            <span>Total Loans</span>
            <p>{loanStats.totalLoans}</p>
          </div>
          <div className="paidLoans">
            <span>Approved Loans</span>
            <p>{loanStats.approvedLoans}</p>
          </div>
          <div className="remainingLoans">
            <span>Rejected Loans</span>
            <p>{loanStats.rejectedLoans}</p>
          </div>
        </div>

        {/* Description */}
        <div className="description">
          <h2>About This Portal</h2>
          <p>
            Welcome to <strong>LoanEase</strong> — your personal loan tracking dashboard.
            Here you can easily apply for new loans, monitor your repayment status,
            and stay updated with upcoming dues. Built for simplicity and transparency,
            this system ensures that your financial journey is smooth and well-managed.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
