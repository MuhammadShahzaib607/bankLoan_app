import React, { useEffect, useState } from 'react'
import "./home.scss"
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AdminNavbar from '../../components/adminNavbar/AdminNavbar'
import { toastAlert } from '../../utils/toastAlert'

const Home = () => {

  const [amount, setAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [duration, setDuration] = useState('');
  const [emi, setEmi] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false)
  
    const fetchUser = async () => {
      try {
        const userData = await axios.get("http://localhost:8000/auth/getUser", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setIsAdmin(userData.data.user.isAdmin)
        console.log(userData.data.user.isAdmin)
      } catch (err) {
        console.error("Failed to fetch admin user:", err);
      }
    }
  
    useEffect(() => {
      fetchUser()
    }, [])

      const calculateEMI = () => {
    const P = parseFloat(amount);
    const annualRate = parseFloat(interestRate);
    const N = parseInt(duration);

    if (!P || !annualRate || !N) {
      return toastAlert({
        type: "error",
        message: "Enter all EMI fields!"
      })
    };

    const R = annualRate / 12 / 100; // Monthly rate
    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    setEmi(Math.ceil(emiValue));
    setAmount("")
    setInterestRate("")
    setDuration("")
  };

  return (
    <div className="home">
      {isAdmin? <AdminNavbar /> : <Navbar />}

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to QuickLoan</h1>
          <p>Fast. Secure. Reliable loans for all your needs.</p>
          <Link to="/loanForm"><button>Apply for a loan</button></Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <div className="feature">
          <h3>Instant Approval</h3>
          <p>No lengthy paperwork. Get approval in minutes!</p>
        </div>
        <div className="feature">
          <h3>Low Interest</h3>
          <p>Competitive interest rates that save your money.</p>
        </div>
        <div className="feature">
          <h3>Flexible Plans</h3>
          <p>Choose a repayment plan that fits your budget.</p>
        </div>
      </section>

      {/* LOAN CATEGORIES */}
      <section className="loan-categories">
        <h2>Loan Categories</h2>
        <div className="loan-cards">
          <div className="card">
            <h3>Personal Loan</h3>
            <p>Cover medical bills, weddings, travel & more.</p>
          </div>
          <div className="card">
            <h3>Business Loan</h3>
            <p>Fund your startup or grow your current venture.</p>
          </div>
          <div className="card">
            <h3>Education Loan</h3>
            <p>Invest in your future with easy student loans.</p>
          </div>
          <div className="card">
            <h3>Home Loan</h3>
            <p>Buy your dream house with affordable EMIs.</p>
          </div>
          <div className="card">
            <h3>Auto Loan</h3>
            <p>Drive home your dream car in easy installments.</p>
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="loan-calculator">
      <h2>Loan Calculator</h2>
      <div className="calculator-form">
        <input
          type="number"
          placeholder="Loan Amount (PKR)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="number"
          placeholder="Interest Rate (%)"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />
        <input
          type="number"
          placeholder="Duration (Months)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <button onClick={calculateEMI}>Calculate EMI</button>
      </div>
      <div className="calculator-result">
        {emi !== null ? (
          <p>Your monthly installment will be: <em style={{
            color: "royalBlue"
          }}>PKR {emi.toLocaleString()}</em></p>
        ) : (
          <p>Your monthly installment will appear here.</p>
        )}
      </div>
    </section>


      {/* TESTIMONIALS */}
      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial">
            <p>“QuickLoan made it so easy to get a personal loan in 10 minutes!”</p>
            <span>- Ayesha Khan</span>
          </div>
          <div className="testimonial">
            <p>“Great service! Fast approval and amazing customer support.”</p>
            <span>- Ali Raza</span>
          </div>
          <div className="testimonial">
            <p>“I got my student loan approved instantly. Highly recommend!”</p>
            <span>- Sara Ahmed</span>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-items">
          <div className="faq-item">
            <h4>What documents do I need?</h4>
            <p>CNIC, proof of income, and bank statement for the last 3 months.</p>
          </div>
          <div className="faq-item">
            <h4>How long does approval take?</h4>
            <p>Usually within 5-10 minutes if all documents are correct.</p>
          </div>
          <div className="faq-item">
            <h4>Is there a late payment penalty?</h4>
            <p>Yes, 2% per month of the due amount.</p>
          </div>
        </div>
      </section>
<Footer />

    </div>
  )
}

export default Home
