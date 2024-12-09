import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import necessary components
import './index.css';
import HomePage1 from './Pages/HomePage1';
import HomePage2 from './Pages/HomePage2';
import Courts from './Pages/CourtPage';
import CountactUs from './Pages/ContactUsPage';
import Profile from './Pages/ProfilePage';
import Login from './Pages/LoginPage';
import Register from './Pages/RegisterPage';
import reportWebVitals from './reportWebVitals';
import AdminPage from './Pages/adminPage';
import AdminPage2 from './Pages/adminPage2';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage1 />} /> 
        <Route path="/Home" element={<HomePage2 />} />
        <Route path="/Courts" element={<Courts />} />
        <Route path="/ContactUs" element={<CountactUs />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/AdminPage" element={<AdminPage />} />
        <Route path="/AdminPage2" element={<AdminPage2 />} />


      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
