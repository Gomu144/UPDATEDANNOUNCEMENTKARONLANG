import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import Sidebar from "./Sidebar";
import "../styles/announcementad.css";

const AnnouncementAd = () => {
  const [adAnnouncements, setAdAnnouncements] = useState([]);
  const [adTitle, setAdTitle] = useState("");
  const [adContent, setAdContent] = useState("");
  const [adError, setAdError] = useState("");
  const [adModalOpen, setAdModalOpen] = useState(false);
  const [adUpdateModalOpen, setAdUpdateModalOpen] = useState(false);
  const [adViewModalOpen, setAdViewModalOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);

  // Fetch announcements once when the component mounts
  useEffect(() => {
    fetchAdAnnouncements();
  }, []);

  const fetchAdAnnouncements = async () => {
    try {
      const resp = await httpClient.get("http://localhost:5000/announcementad");
      setAdAnnouncements(resp.data); // Replace existing data with new data
    } catch (error) {
      console.error("Failed to fetch ads:", error);
    }
  };

  const handleAdSubmit = async (e) => {
    e.preventDefault();
    if (!adTitle || !adContent) {
      setAdError("Both title and content are required");
      return;
    }

    try {
      await httpClient.post("http://localhost:5000/announcementad", {
        title: adTitle,
        content: adContent,
      });
      setAdTitle("");
      setAdContent("");
      setAdError("");
      setAdModalOpen(false);
      fetchAdAnnouncements(); // Refresh the list after adding a new announcement
    } catch (error) {
      console.error("Failed to submit ad:", error);
      setAdError("Failed to submit ad. Please try again.");
    }
  };

  const handleUpdateAd = async (e) => {
    e.preventDefault();
    if (!selectedAd) return;

    try {
      await httpClient.put(`http://localhost:5000/announcementad/${selectedAd.id}`, {
        title: adTitle,
        content: adContent,
      });
      setAdUpdateModalOpen(false);
      setSelectedAd(null);
      setAdTitle("");
      setAdContent("");
      fetchAdAnnouncements(); // Refresh the list after updating an announcement
    } catch (error) {
      console.error("Failed to update ad:", error);
      setAdError("Failed to update ad. Please try again.");
    }
  };

  const handleDeleteAd = async (adId) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      try {
        await httpClient.delete(`http://localhost:5000/announcementad/${adId}`);
        fetchAdAnnouncements(); // Refresh the list after deleting an announcement
      } catch (error) {
        console.error("Failed to delete ad:", error);
      }
    }
  };

  const handleViewAd = () => {
    setAdViewModalOpen(true);
  };

  const handleOpenCreateModal = () => {
    setAdTitle("");
    setAdContent("");
    setAdError("");
    setAdModalOpen(true);
  };

  const handleOpenUpdateModal = (ad) => {
    setSelectedAd(ad);
    setAdTitle(ad.title);
    setAdContent(ad.content);
    setAdError("");
    setAdUpdateModalOpen(true);
  };

  return (
    <div className="announcement-ad-page">
      <Sidebar />
      <div className="ad-content">
        <div className="ad-cards-container">
          <div className="ad-card add-ad-card" onClick={handleOpenCreateModal}>
            <h2>Create New Announcement</h2>
            <p>Click to create a new announcement.</p>
          </div>

          <div className="ad-card view-ad-card" onClick={handleViewAd}>
            <h2>View Announcements</h2>
            <p>Click to view the announcements.</p>
          </div>
        </div>

        {adModalOpen && (
          <div className="ad-modal show">
            <div className="ad-modal-content">
              <span className="ad-close" onClick={() => setAdModalOpen(false)}>&times;</span>
              <h2>Create an Announcement</h2>
              <form onSubmit={handleAdSubmit}>
                <input
                  type="text"
                  value={adTitle}
                  onChange={(e) => setAdTitle(e.target.value)}
                  placeholder="Ad Title"
                  required
                />
                <textarea
                  value={adContent}
                  onChange={(e) => setAdContent(e.target.value)}
                  placeholder="Ad Content"
                  required
                />
                <button type="submit" className="ad-btn">Submit Announcement</button>
              </form>
              {adError && <p className="ad-error">{adError}</p>}
            </div>
          </div>
        )}

        {adViewModalOpen && (
          <div className="ad-modal show">
            <div className="ad-modal-content wide-modal">
              <span className="ad-close" onClick={() => setAdViewModalOpen(false)}>&times;</span>
              <h2>Announcements</h2>
              <div className="ad-list">
                {adAnnouncements.length > 0 ? (
                  adAnnouncements.map((ad) => (
                    <div key={ad.id} className="ad-item">
                      <div className="ad-text">
                        <h3>{ad.title}</h3>
                        <p>{ad.content}</p>
                      </div>
                      <div className="ad-actions">
                        <button
                          className="ad-btn edit-btn"
                          onClick={() => handleOpenUpdateModal(ad)}
                        >
                          Update
                        </button>
                        <button
                          className="ad-btn delete-btn"
                          onClick={() => handleDeleteAd(ad.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No announcements available.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {adUpdateModalOpen && (
          <div className="ad-modal show">
            <div className="ad-modal-content wide-modal">
              <span className="ad-close" onClick={() => setAdUpdateModalOpen(false)}>&times;</span>
              <h2>Update Announcement</h2>
              <form onSubmit={handleUpdateAd}>
                <input
                  type="text"
                  value={adTitle}
                  onChange={(e) => setAdTitle(e.target.value)}
                  placeholder="Ad Title"
                  required
                />
                <textarea
                  value={adContent}
                  onChange={(e) => setAdContent(e.target.value)}
                  placeholder="Ad Content"
                  required
                />
                <button type="submit" className="ad-btn">Update Announcement</button>
              </form>
              {adError && <p className="ad-error">{adError}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementAd;
