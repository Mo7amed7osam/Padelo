import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import necessary components
import "./index.css";
import reportWebVitals from "./reportWebVitals";

// Website Pages
import Login from "./Pages/Auth/LoginPage";
import Register from "./Pages/Auth/RegisterPage";
import HomePage from "./Pages/HomePage";
import Courts from "./Pages/CourtsPage";
import ContactUs from "./Pages/ContactUsPage";
import Profile from "./Pages/ProfilePage";
import Admin from "./Pages/AdminsPage";
import Admin2 from "./Pages/adminPage2";

// Auth Controllers
import UserProvider from "./Context/UserContext";
import RequireAuth from "./Pages/Auth/RequireAuth";
import PersistLogin from "./Pages/Auth/PersistLogin";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/Courts" element={<Courts />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />

          {/* Protected Paths: Requires Auth */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Admin" element={<Admin />} />
              <Route path="/Admin2" element={<Admin2 />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
