import { Link } from "react-router-dom";
import "./modal.scss"; 

const Modal = () => {
  return (
    <>
      <div className="modal" role="dialog">
        <div className="modal-box">
          <div className="modal-header">
            <h3>Sign In Required</h3>
          </div>

          <div className="line"></div>

          <p className="modal-text">
            To apply for loans, track your repayment status, and access your personal dashboard, please sign in or create a free account. Once logged in, you’ll be able to:
          </p>

          <ul className="modalLists">
            <li className="modalList">Apply for personal or business loans</li>
            <li className="modalList">Check loan approval and repayment schedules</li>
            <li className="modalList">Get real-time updates and notifications</li>
          </ul>

          <div className="bts" style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "40px"
          }}>
          <Link to="/" className="modalBtn">Sign In</Link>
          <Link to="/signup" className="modalBtn2">Create Account</Link>
          </div>

        </div>
      </div>
    </>
  );
};

export default Modal;
