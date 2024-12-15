import React, { useState } from "react";
import "../Styles/adminPage2.css";
import Header3 from "../Components/HeaderAdminPage";

function UpdateCourt() {
  const [courtName, setCourtName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [courtImage, setCourtImage] = useState(null);

  const handleImageUpload = (event) => {
    setCourtImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the update logic here
    console.log({ courtName, phoneNumber, courtImage });
  };

  return (
    <div className="update-court">
      <Header3 />

      <div
        className="court-info"
        style={{ backgroundImage: `url(${require("../assets/R.jpg")})` }}
      >
        <h2>Padel-beast</h2>
        <p>6-October</p>
        <p>+201120966038</p>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <h2>Update COURT</h2>
        <p>Leave fields that you do not want to change empty</p>

        <label>
          Name
          <input
            type="text"
            placeholder="Enter Court name"
            value={courtName}
            onChange={(e) => setCourtName(e.target.value)}
          />
        </label>

        <label>
          Phone number
          <input
            type="tel"
            placeholder="Enter Court Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </label>

        <label>
          Upload Court Images
          <input type="file" onChange={handleImageUpload} />
        </label>

        <label>
          Choose Court Images
          <button type="button" className="location-button">
            Location
          </button>
        </label>

        <button type="submit" className="update-button">
          Update
        </button>

        {/* Optional delete button */}
        {/* <button type="button" className="delete-button">
          Delete Court
        </button> */}
      </form>
    </div>
  );
}

export default UpdateCourt;
