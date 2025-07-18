import React, { useEffect, useState } from 'react';
import './about.scss';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import AdminNavbar from '../../components/adminNavbar/AdminNavbar';
import axios from 'axios';

const About = () => {

  const [isAdmin, setIsAdmin] = useState(false)

  const fetchUser = async () => {
    try {
      const userData = await axios.get("http://localhost:8000/auth/getUser", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setIsAdmin(userData.data.user.isAdmin)
    } catch (err) {
      console.error("Failed to fetch admin user:", err);
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <>
        {isAdmin ? <AdminNavbar /> : <Navbar />}
    <div className="about">
      <h1>About QuickLoan</h1>

      <p className="intro">
        QuickLoan is your trusted partner when it comes to instant, reliable, and affordable financial solutions.
        Whether you need funds for a personal emergency, business expansion, education, or buying your dream car — we make borrowing simple and stress-free.
        With minimal documentation, transparent terms, and fast approvals, QuickLoan helps thousands of people every month meet their financial goals.
      </p>

      <div className="info-boxes">
        <div className="box">
          <h2>Our Mission</h2>
          <p>
            To empower individuals and small businesses by providing quick access to loans without the traditional complexities of banks.
          </p>
        </div>

        <div className="box">
          <h2>Our Vision</h2>
          <p>
            To become the most accessible and trusted digital lending platform across Pakistan and beyond.
          </p>
        </div>

        <div className="box">
          <h2>Why Choose Us</h2>
          <p>
            We offer competitive interest rates, instant decisions, and user-friendly processes. Our team is here to help you every step of the way.
          </p>
        </div>

        <div className="box">
          <h2>Customer First</h2>
          <p>
            At QuickLoan, customer satisfaction is our top priority. We ensure transparency, data security, and complete support from application to repayment.
          </p>
        </div>
      </div>
    </div>
<Footer />
</>
  );
};

export default About;
