import React from 'react';
import './loanCard.scss';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoanCard = ({ data, fetchAgain }) => {
  const location = useLocation();

  const handleStatusUpdate = async (loanId, status) => {
    try {
      const res = await axios.put("http://localhost:8000/loan/update-status", {
        loanId,
        status
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success(`Loan ${status}`);
      fetchAgain(); // call parent function to re-fetch updated data
    } catch (err) {
      toast.error("Error updating loan status");
    }
  };

  return (
    <div className="loan-table-container">
      <table className="loan-table">
        <thead>
          <tr>
            {location.pathname === "/adminDashboard" && 
            <>
            <th>UserName</th>
            </>
            }
            <th>Loan Type</th>
            <th>Amount</th>
            <th>Duration</th>
            {location.pathname === "/adminDashboard" ? (
              <>
                <th>Action</th>
              </>
            ) : (
              <>
                <th>Interest</th>
                <th>Total Repay</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((loan, index) => (
            <tr key={index}>
              {location.pathname === "/adminDashboard" && 
              <>
              <td>{loan.userName}</td>
              </>
              }
              <td>{loan.type}</td>
              <td>PKR {loan.amount.toLocaleString()}</td>
              <td>{loan.duration} months</td>

              {location.pathname === "/adminDashboard" ? (
                <td>
                  <button
                    className="approveBtn"
                    onClick={() => handleStatusUpdate(loan._id, "Approved")}
                  >
                    Approve
                  </button>
                  <button
                    className="rejectBtn"
                    onClick={() => handleStatusUpdate(loan._id, "Rejected")}
                  >
                    Reject
                  </button>
                </td>
              ) : (
                <>
                  <td>2%</td>
                  <td>
                    PKR {Math.ceil(
                      Number(loan.amount) + (Number(loan.amount) * 2 * Number(loan.duration)) / 100
                    ).toLocaleString()}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanCard;
