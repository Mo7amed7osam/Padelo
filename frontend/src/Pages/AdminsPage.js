import React, { useState, useEffect } from "react";
import "../Styles/AdminPage.css";
import Header3 from "../Components/HeaderAdminPage";
import defaultCourtImage from "../assets/OIP.jpg";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("add");
  const [search, setSearch] = useState("");

  const [courts, setCourts] = useState([]); // Keeps the state name consistent.

  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/courts")
      .then((response) => response.json())
      .then((data) => {
        setCourts(data.courts);
      })
      .catch((error) => console.error("Error fetching courts:", error));
  }, []);
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const filteredCourts = search
    ? courts.filter((court) => {
        const query = search.toLowerCase().trim();
        return (
          court.name.toLowerCase().includes(query) ||
          court.location.toLowerCase().includes(query)
        );
      })
    : courts;

  return (
    <body className="admin-page">
      <div className="admin-container">
        <Header3 />
        <h1 className="admin-header">.</h1>
        <div className="buttons-container">
          <button
            className={`toggle-button ${
              activeSection === "update" ? "active" : ""
            }`}
            onClick={() => handleSectionChange("update")}
          >
            Delete & Update
          </button>
          <button
            className={`toggle-button ${
              activeSection === "add" ? "active" : ""
            }`}
            onClick={() => handleSectionChange("add")}
          >
            Add
          </button>
        </div>
        {activeSection === "update" && (
          <div className="update-section">
            <h2>Search for delete or update court</h2>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by Court name, Location"
                className="search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="search-button" onClick={() => setSearch("")}>
                Clear
              </button>
            </div>
            <div className="courts-grid">
              {filteredCourts.map((court) => (
                <div key={court.__id} className="admin-court-card">
                  <Link to={`/Admin2`}>
                    <img
                      src={court.image || defaultCourtImage}
                      alt={court.name}
                      className="court-image"
                    />
                  </Link>

                  <div className="court-details">
                    <p className="court-name">{court.name}</p>
                    <p className="court-address">{court.location}</p>
                    <p className="court-phone">{court.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeSection === "add" && (
          <div className="add-section">
            <h2>ADD COURT</h2>
            <form className="add-form">
              <input type="text" placeholder="Enter Court Name" />
              <input type="text" placeholder="Phone Number" />
              <button type="button" className="upload-button">
                Upload Court Images
              </button>
              <button type="button" className="upload-button">
                Choose Court Location
              </button>
              <button type="submit" className="add-court-button">
                Add
              </button>
            </form>
          </div>
        )}
      </div>
    </body>
  );
};

export default AdminPage;
