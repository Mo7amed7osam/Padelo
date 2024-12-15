import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import "../../Styles/Register.css";
import { user } from "../../Context/UserContext";
import Cookies from "universal-cookie";

const RegisterPage = () => {
  // Set the Navigate to Login
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/Login");
  };

  //Get User
  const userNow = useContext(user);

  //Cookie
  const cookie = new Cookies();

  // Data to send for API
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordR, setPasswordR] = useState("");
  const [accept, setAccept] = useState(false);

  // Catch error
  const [error, setError] = useState("");

  // Toggle Password Visibility
  const [type, setType] = useState("password");
  const [typeR, setTypeR] = useState("password");
  const [icon, setIcon] = useState(faEyeSlash);
  const [iconR, setIconR] = useState(faEyeSlash);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(faEye);
      setType("text");
    } else {
      setIcon(faEyeSlash);
      setType("password");
    }
  };

  const handleToggleR = () => {
    if (typeR === "password") {
      setIconR(faEye);
      setTypeR("text");
    } else {
      setIconR(faEyeSlash);
      setTypeR("password");
    }
  };

  // Set API Configuration
  async function submit(e) {
    e.preventDefault();
    setAccept(true);
    try {
      if (!error) {
        let res = await axios
          .post("http://127.0.0.1:3000/api/users/register", {
            name: name,
            email: email,
            password: password,
          })
          .then();

        const token = res.data.token;
        const userDetails = res.data.user;
        cookie.set("UserToken", token);

        userNow.setAuth({ token, userDetails });

        navigate("/");
      }
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
      <div className="to-login">
        <img
          src={require("../../assets/OIP.jpg")}
          alt="Logo"
          className="logo-image"
        />
        <div className="logo1">Padelo.</div>
        <button onClick={goToLogin} className="login1">
          Login
        </button>
      </div>
      <div className="register-form">
        <h2>Create Account</h2>

        <form className="form-style" onSubmit={submit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <div className="pw-container">
            <label htmlFor="passwordR">Re-enter Password</label>
            <input
              type={typeR}
              id="passwordR"
              placeholder="Re-enter your password"
              value={passwordR}
              onChange={(e) => setPasswordR(e.target.value)}
            />
            <FontAwesomeIcon
              icon={iconR}
              className="show-password"
              onClick={() => handleToggleR()}
            />
          </div>

          <p className="terms">
            By signing up you agree to{" "}
            <a href="#HomePage">terms and conditions</a> at Padelo.
          </p>

          <button type="submit" className="register-button">
            Register
          </button>

          {/* Display Errors */}
          <div
            className={`error ${
              accept &&
              (error === `This email "${email}" already exists` ||
                name === "" ||
                !/[A-Z]/.test(password) ||
                password.length < 8 ||
                password !== passwordR)
                ? "show"
                : ""
            }`}
          >
            <h3 className="error-heading">Error!</h3>

            {/* will try a better handling for email */}
            {accept && error === `This email "${email}" already exists` && (
              <p>{error}</p>
            )}

            {name === "" && accept && <p>User name is required.</p>}

            {password.length < 8 && accept && (
              <p>Password must be more than 8 characters.</p>
            )}

            {!/(\d)/.test(password) && accept && (
              <p>Password must contain at least one number.</p>
            )}

            {!/[A-Z]/.test(password) && accept && (
              <p>Password must contain at least one uppercase letter.</p>
            )}

            {!/[a-z]/.test(password) && accept && (
              <p>Password must contain at least one lowercase letter.</p>
            )}

            {!/[^a-zA-Z0-9]/.test(password) && accept && (
              <p>Password must contain at least one special character.</p>
            )}

            {password !== passwordR && accept && <p>Password doesn't Match.</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
