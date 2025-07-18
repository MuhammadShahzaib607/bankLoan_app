import React, { useState } from 'react';
import './loanForm.scss';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import { toastAlert } from '../../utils/toastAlert';

const LoanForm = () => {
  const [durationOpen, setDurationOpen] = useState(false);
  const [loanTypeOpen, setLoanTypeOpen] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedLoanType, setSelectedLoanType] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const durationOptions = [
    '1 month', '2 months', '3 months', '4 months', '5 months',
    '6 months', '7 months', '8 months', '9 months', '10 months',
    '11 months', '12 months'
  ];

  const loanTypeOptions = [
    'Education Loan', 'Business Loan', 'Home Loan', 'Car Loan',
    'Medical Loan', 'Travel Loan', 'Emergency Loan', 'Wedding Loan'
  ];

const handleSubmit = async () => {
  if (!amount || !selectedDuration || !selectedLoanType) {
    return toastAlert({
      type: 'error',
      message: 'All fields required',
    });
  }

  try {
    setLoading(true);

    const response = await fetch('http://localhost:8000/loan/apply/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        amount: Number(amount),
        duration: parseInt(selectedDuration),
        type: selectedLoanType,
      }),
    });

    const data = await response.json();
console.log(data)
    if (response.ok) {
      toastAlert({
        type: 'success',
        message: 'Loan submitted successfully',
      });
      setAmount('');
      setSelectedDuration('');
      setSelectedLoanType('');
    } else {
      toastAlert({
        type: 'error',
        message: data.message || 'Submit failed',
      });
    }
  } catch (err) {
    toastAlert({
      type: 'error',
      message: 'Network error',
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <Navbar />
      <div className="loanForm">
        <h1>Loan Form</h1>
        <div className="inputsContainer">
          <input
            type="text"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          {/* Duration Dropdown */}
          <div className="dropdown durationDropdown">
            <div
              className="selectBox"
              onClick={() => setDurationOpen(!durationOpen)}
            >
              {selectedDuration || 'Select Duration'}
              <span className="arrow">{durationOpen ? '▲' : '▼'}</span>
            </div>
            {durationOpen && (
              <ul className="dropdownOptions">
                {durationOptions.map((opt, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      setSelectedDuration(opt.split(' ')[0]); // only number
                      setDurationOpen(false);
                    }}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Loan Type Dropdown */}
          <div className="dropdown typeDropdown">
            <div
              className="selectBox"
              onClick={() => setLoanTypeOpen(!loanTypeOpen)}
            >
              {selectedLoanType || 'Select Loan Type'}
              <span className="arrow">{loanTypeOpen ? '▲' : '▼'}</span>
            </div>
            {loanTypeOpen && (
              <ul className="dropdownOptions">
                {loanTypeOptions.map((opt, idx) => (
                  <li
                    key={idx}
                    onClick={() => {
                      setSelectedLoanType(opt);
                      setLoanTypeOpen(false);
                    }}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>

          {message && <div className="message">{message}</div>}

          <div className="note">
            <h2>Note</h2>
            <p>
              Please make sure the loan amount and type are correctly selected.
              Once submitted, your application will be reviewed by the admin.
              You can track your loan status and repayment details in the
              dashboard after approval.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoanForm;
