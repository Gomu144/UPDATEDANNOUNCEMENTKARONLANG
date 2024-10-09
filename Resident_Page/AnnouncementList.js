import React, { useEffect, useState } from "react";
import httpClient from "../httpClient";
import "../Resident_style/AnnouncementList.css";

const AnnouncementList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await httpClient.get("http://localhost:5000/announcementad");
        setAnnouncements(response.data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  const openModal = (announcement) => {
    setSelectedAnnouncement(announcement);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedAnnouncement(null);
  };

  return (
    <div className="announcement-list">
      <h2 className="residents-title">Announcements</h2>
      <div className="residents-announcement-cards">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="residents-announcement-card"
            onClick={() => openModal(announcement)}
          >
            <div className="residents-announcement-icon">📢</div>
            <div className="residents-announcement-text">
              <h3>{announcement.title}</h3>
              <p>{announcement.description}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="residents-modal-overlay">
          <div className="residents-modal-content">
            <button className="residents-close-button" onClick={closeModal}>
              Close
            </button>
            {selectedAnnouncement && (
              <>
                <h2>{selectedAnnouncement.title}</h2>
                <p>{selectedAnnouncement.description}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementList;
