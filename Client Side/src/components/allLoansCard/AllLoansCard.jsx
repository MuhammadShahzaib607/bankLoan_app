import React from 'react';
import './allLoansCard.scss';

const AllLoansCard = ({ data }) => {
  return (
    <div className="loan-table-container">
      <table className="loan-table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Loan Type</th>
            <th>Amount</th>
            <th>Duration</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((loan, index) => (
            <tr key={index}>
              <td>{loan.userName}</td>
              <td>{loan.type}</td>
              <td>PKR {Number(loan.amount).toLocaleString()}</td>
              <td>{loan.duration} months</td>
              <td className={`status ${loan.status.toLowerCase()}`}>{loan.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllLoansCard;
