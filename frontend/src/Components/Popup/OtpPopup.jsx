import React, { useState } from "react";
import "./Popup.css"; // Add styles for the popup
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const OtpPopup = ({ email, message, onClose }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const cookie = new Cookies();
  console.log(otp);

  async function verify() {
    try {
      const res = await axios.post(
        "http://127.0.0.1:3000/api/users/verify_email",
        {
          email: email,
          code: otp.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        cookie.set("JWT", res.data.token);
        onClose();
        setSuccess(res.message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (err) {
      setError("Invalid or expired verification code");
    }
  }

  async function resendVerification() {
    try {
      const res = await axios.post(
        "http://127.0.0.1:3000/api/users/resend_verification",
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      setError("Invalid or expired verification code");
    }
  }
  return (
    <div className={`popup-container ${onClose ? "active" : ""}`}>
      <div className="popup">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h3>{message}</h3>
        <div className="wrapper">
          <p>Enter verification code for ({email})</p>
          <div className="field">
            <input
              maxLength={6}
              type="text"
              placeholder="..."
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
            />
            <button onClick={verify}>Verify</button>
          </div>
          <button className="resend" onClick={() => resendVerification()}>
            Resend Code
          </button>
          {error && <p className="error">{error}</p>}
          {success && <p className="succes">{success}</p>}
        </div>
      </div>
    </div>
  );
};

export default OtpPopup;
