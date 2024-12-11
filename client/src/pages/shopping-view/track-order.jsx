import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const TrackingPage = () => {
  const { orderId } = useParams();
  const [trackingId, setTrackingId] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [trackingStatus, setTrackingStatus] = useState(null);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  // Use useEffect to set the trackingId from orderId if available
  useEffect(() => {
    if (orderId) {
      setTrackingId(orderId);
    }
  }, [orderId]);

  const handleInputChange = (event) => {
    setTrackingId(event.target.value);
  };

  const handleTrackOrder = (event) => {
    event.preventDefault();
    if (!trackingId) {
      alert('Please enter a tracking ID');
      return;
    }

    setIsTracking(true);
    setTrackingStatus(null); // Clear previous status
    setTimeout(() => {
      setIsTracking(false);
      setTrackingStatus(
        <>
          Your package is en route!{' '}
          <a
            href="https://www.indiapost.gov.in/_layouts/15/dop.portal.tracking/trackconsignment.aspx"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.moreDetailsLink}
          >
            Click here for more details.
          </a>
        </>
      );
    }, 2000);
  };

  return (
    <div style={styles.trackingPage}>
      {/* Navbar */}
      <div style={styles.navbar}>
        <div style={styles.navbarLeft}>
          <img
            src="https://i.ytimg.com/vi/oz_qCqkZI40/sddefault.jpg?sqp=-oaymwEmCIAFEOAD8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGH8gHSgaMA8=&rs=AOn4CLDFQi9e2_eaivagttmKYA-4MqXScA"
            alt="Indian Post Logo"
            style={styles.postLogo}
          />
        </div>
        <div style={styles.navbarCenter}>
          <h2 style={styles.navbarText}>Track Your Order</h2>
        </div>
      </div>

      {/* Tracking Form */}
      <div style={styles.trackingContainer}>
        <form style={styles.trackingForm} onSubmit={handleTrackOrder}>
          <div style={styles.inputGroup}>
            <label htmlFor="trackingId" style={styles.label}>
              Enter Order ID
            </label>
            <input
              id="trackingId"
              type="text"
              placeholder="Enter Tracking ID"
              value={trackingId}
              onChange={handleInputChange}
              style={styles.trackingInput}
            />
          </div>

          <button
            type="submit"
            style={{
              ...styles.trackButton,
              ...(isButtonHovered && !isTracking ? styles.trackButtonHover : {}),
              ...(isTracking ? styles.trackButtonDisabled : {}),
            }}
            disabled={isTracking}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            {isTracking ? 'Tracking...' : 'Track Order'}
          </button>
        </form>

        {trackingStatus && (
          <div style={styles.trackingStatus}>
            <p>{trackingStatus}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  trackingPage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '0',
    backgroundColor: '#f0f2f5',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  },
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    background: '#000',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    flexWrap: 'nowrap',
    minHeight: '60px',
    transition: 'background 0.3s ease',
  },
  navbarLeft: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  postLogo: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    transition: 'transform 0.3s ease',
    objectFit: 'cover',
  },
  navbarCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1',
    textAlign: 'center',
  },
  navbarText: {
    color: '#fff',
    fontSize: '2rem',
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: '1px',
    margin: '0',
    transition: 'color 0.3s ease',
  },
  trackingContainer: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    padding: '80px 60px',
    borderRadius: '25px',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    width: '90%',
    maxWidth: '900px',
    marginTop: '180px',
    transition: 'all 0.3s ease',
  },
  trackingForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },
  inputGroup: {
    textAlign: 'left',
  },
  label: {
    fontWeight: '600',
    fontSize: '1.5rem',
    color: '#333',
    marginBottom: '15px',
  },
  trackingInput: {
    padding: '20px',
    fontSize: '1.5rem',
    width: '100%',
    borderRadius: '12px',
    border: '2px solid #ccc',
    outline: 'none',
    background: '#fff',
    color: '#333',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  },
  trackButton: {
    padding: '20px',
    fontSize: '1.5rem',
    border: 'none',
    borderRadius: '50px',
    background: '#2575fc',
    color: '#fff',
    cursor: 'pointer',
    boxShadow: '0 8px 25px rgba(37, 117, 252, 0.3)',
    transition: 'all 0.3s ease',
    marginTop: '20px',
    transform: 'scale(1)',
    fontWeight: '600',
  },
  trackButtonHover: {
    background: '#1e90ff',
    transform: 'scale(1.05)',
    boxShadow: '0 12px 30px rgba(30, 144, 255, 0.4)',
  },
  trackButtonDisabled: {
    background: '#a0a0a0',
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
  trackingStatus: {
    marginTop: '50px',
    padding: '30px',
    background: 'rgba(0, 0, 0, 0.6)',
    borderRadius: '15px',
    fontSize: '1.4rem',
    color: '#fff',
    fontWeight: '500',
    animation: 'fadeIn 1s ease-out',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
  },
  moreDetailsLink: {
    color: '#1e90ff',
    fontWeight: 'bold',
    textDecoration: 'underline',
    paddingLeft: '5px',
    transition: 'color 0.3s ease',
  },
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
      transform: 'translateY(30px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
};

export default TrackingPage;
