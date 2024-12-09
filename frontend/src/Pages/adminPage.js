import React, { useState } from 'react';
import "../Pages Styles/adminPage.css";

const AdminPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddDelete, setShowAddDelete] = useState(false);

  const courts = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    name: 'Padel-beast',
    location: '6-october',
    image: 'https://via.placeholder.com/150',
  }));

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddDeleteClick = () => {
    setShowAddDelete(!showAddDelete);
  };

  const filteredCourts = courts.filter((court) =>
    court.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    court.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-page" style={{  
      backgroundImage: `url(${require("../assets/aichat-image-2024-12-04T20_08_44.226Z.jpg")})` 
    }}>
      <div className="admin-content ">
      <h1>Hi Admin</h1>
      <div className="button-group">
        <button className="btn delete-update" onClick={handleAddDeleteClick}>Delete & Update</button>
        <a href="/adminPage2" className="add-button">
        <button className="btn add">Add</button>
        </a>
      </div>
      {showAddDelete && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Court, Location"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="btn search">Search</button>
        </div>
      )}
      {showAddDelete && (
        <div className="court-grid">
          
          {filteredCourts.map((court) => (
            <div key={court.id} className="court-card">
              <img src={court.image} alt={court.name} /> 
              <h3>{court.name}</h3>
              <p>{court.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default AdminPage;