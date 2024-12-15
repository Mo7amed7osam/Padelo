import React from "react";
import Header from "../Components/Header";
import "../Styles/ContactUs.css";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
} from "react-icons/fa";

function ContactUs() {
  return (
    <div className="contact-us-page">
      <Header />
      <div className="background-image"></div>
      <div className="contact-us-content">
        <h1>Get in touch</h1>
        <p>
          <FaPhoneAlt
            size={35}
            style={{ color: "#008000", marginRight: "8px" }}
          />
          Give us a ring
        </p>
        <p className="contact-detail">+201555948232</p>
        <p className="contact-detail">Padelo@gmail.com</p>
      </div>
      <footer className="contact-us-footer">
        <p>Follow us on social media</p>
        <div className="social-links">
          <a
            href="https://www.facebook.com/tamer.elgayar.56"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook size={50} />
          </a>
          <a
            href="https://www.instagram.com/p/DAydzSROozb/?img_index=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={50} />
          </a>
          <a
            href="https://www.linkedin.com/company/scitechtalent/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={50} />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default ContactUs;
