import React, { useEffect, useState } from 'react';
import "./loans.scss";
import LoanCard from '../../components/loanCard/LoanCard';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';

const Loans = () => {
const [loanData, setLoanData] = useState([])

const fetchLoans = async () => {
  try {
    const res = await fetch("http://localhost:8000/loan/my-loans", {
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
    <>
      <Navbar />
      <div className="loan-list">
        <LoanCard data={loanData} />
      </div>
      <Footer />
    </>
  );
};

export default Loans;
