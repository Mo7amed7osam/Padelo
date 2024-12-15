import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { user } from "../../Context/UserContext";
import Cookies from "universal-cookie";

const LoginPage = () => {
  // Set the Navigate to Login
  const navigate = useNavigate();
  const goToRegister = () => {
    navigate("/Register");
  };

  // Data to send for API
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);

  //Token
  const userNow = useContext(user);

  //Cookie
  const cookie = new Cookies();

  // Catch Error
  const [error, setError] = useState("");

  // Toggle Password Visibility
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(faEyeSlash);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(faEye);
      setType("text");
    } else {
      setIcon(faEyeSlash);
      setType("password");
    }
  };

  let nav = useNavigate();

  // Set API Configuration
  async function submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
      let res = await axios
        .post("http://127.0.0.1:3000/api/users/login", {
          email: email,
          password: password,
        })
        .then();

      const token = res.data.token;
      const userDetails = res.data.user;
      cookie.set("UserToken", token);

      userNow.setAuth({ token, userDetails });

      // navigate("/");
      nav("/");
    } catch (err) {
      // handle the response
      if (err.response?.data) {
        // If the error contains data (email already exists)
        setError(err.response.data);
      } else {
        // Handle other types of errors (network issues)
        setError("An error occurred, please try again later.");
      }
    }
  }

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Login</h2>

        <form className="form-style" onSubmit={submit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="pw-container">
            <label htmlFor="password">Password</label>
            <input
              type={type}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <FontAwesomeIcon
              icon={icon}
              className="show-password"
              onClick={() => handleToggle()}
            />
          </div>

          <button type="submit" className="register-button">
            Login
          </button>

          {/* Display Errors */}
          <div className={`error ${accept && error ? "show" : ""}`}>
            <h3 className="error-heading">Error!</h3>
            {accept && error && <p>{error}</p>}
          </div>
        </form>
      </div>

      <div className="to-login">
        <img
          src={require("../../assets/OIP.jpg")}
          alt="Logo"
          className="logo-image"
        />
        <div className="logo1">Padelo.</div>
        <button onClick={goToRegister} className="login1">
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
