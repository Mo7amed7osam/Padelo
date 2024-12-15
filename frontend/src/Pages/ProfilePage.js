import React, { useState, useEffect } from "react";
import "../Styles/ProfilePage.css";
import Header2 from "../Components/Header2";
import { FaStar } from "react-icons/fa";

const ProfilePage = () => {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "",
    phone: "",
  });
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [comment, setComment] = useState("");
  const [ratings, setRatings] = useState({});
  const [hoverRatings, setHoverRatings] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePersonalInfoSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(personalInfo),
        }
      );
      const data = await response.json();
      console.log("Personal information saved:", data);
      fetchBookingHistory();
    } catch (error) {
      console.error("Error saving personal information:", error);
    }
  };

  const fetchBookingHistory = async () => {
    try {
      const userId = "675d485699a7e3e4ad8b7f2a";
      const response = await fetch(
        `http://127.0.0.1:3000/api/reservations/user/${userId}`
      );
      const data = await response.json();
      setBookingHistory(data.reservations);
    } catch (error) {
      console.error("Error fetching booking history:", error);
    }
  };

  const handleRatingChange = (bookingId, value) => {
    setRatings((prev) => ({ ...prev, [bookingId]: value }));
  };

  const openCommentPopup = (bookingId) => {
    setSelectedBooking(bookingId);
  };

  const closeCommentPopup = () => {
    setSelectedBooking(null);
    setComment("");
  };

  const handleCommentSubmit = async () => {
    console.log(`Comment for booking ${selectedBooking}: ${comment}`);
    closeCommentPopup();
  };

  useEffect(() => {
    fetchBookingHistory();
  }, []);

  return (
    <div className="profile-page">
      <Header2 />
      <div className="background-image"></div>
      <div className="profile-container">
        <header className="profile-header">
          <h1>Welcome Dr algayar</h1>
        </header>

        <section className="booking-history">
          <h2>Booking History</h2>
          <table className="history-table">
            <thead>
              <tr>
                <th>Booking No.</th>
                <th>Date</th>
                <th>Duration</th>
                <th>Court</th>
                <th>Status</th>
                <th>Rating</th>
                <th>Add Comment</th>
              </tr>
            </thead>
            <tbody>
              {bookingHistory.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking._id}</td>
                  <td>{booking.court.schedule[0]?.day || "N/A"}</td>
                  <td>{booking.court.schedule[0]?.slots?.length || "N/A"}</td>
                  <td>{booking.court.name}</td>
                  <td>{booking.status || "Reserved"}</td>
                  <td>
                    <div className="rating">
                      {[...Array(5)].map((_, index) => {
                        const value = index + 1;
                        return (
                          <FaStar
                            key={index}
                            size={20}
                            className="star"
                            color={
                              value <=
                              (hoverRatings[booking._id] ||
                                ratings[booking._id] ||
                                0)
                                ? "#ffc107"
                                : "#e4e5e9"
                            }
                            onClick={() =>
                              handleRatingChange(booking._id, value)
                            }
                            onMouseEnter={() =>
                              setHoverRatings((prev) => ({
                                ...prev,
                                [booking._id]: value,
                              }))
                            }
                            onMouseLeave={() =>
                              setHoverRatings((prev) => ({
                                ...prev,
                                [booking._id]: 0,
                              }))
                            }
                          />
                        );
                      })}
                    </div>
                  </td>
                  <td>
                    <button
                      className="comment-button"
                      onClick={() => openCommentPopup(booking._id)}
                    >
                      Add Comment
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="account-settings">
          <h2>Account Settings</h2>
          <form onSubmit={handlePersonalInfoSubmit}>
            <div className="personal-info">
              <h3>Personal Information</h3>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={personalInfo.fullName}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone no."
                value={personalInfo.phone}
                onChange={handleInputChange}
                required
              />
              <button type="submit" className="save-button">
                Save
              </button>
            </div>
          </form>

          <div className="password-info">
            <h3>Password</h3>
            <input type="password" placeholder="Current Password" required />
            <input type="password" placeholder="New Password" required />
            <input
              type="password"
              placeholder="Confirm New Password"
              required
            />
            <button type="submit" className="save-button">
              Submit
            </button>
          </div>
        </section>

        <button className="logout-button">Logout</button>
      </div>

      {selectedBooking && (
        <div className="comment-popup">
          <div className="popup-content">
            <h3>Add Comment for Booking #{selectedBooking}</h3>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment here..."
            />
            <button onClick={handleCommentSubmit} className="save-button">
              Send
            </button>
            <button onClick={closeCommentPopup} className="logout-button">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
