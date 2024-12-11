import React from 'react';

const SellerInfo3 = ({ photoUrl }) => {
  const pageContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: '#e6f2ff', // Light blue background for a calm and subtle effect
    padding: '20px',
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '50px',
    background: 'linear-gradient(145deg, #b0b0b5, #d9d9e3)', // Subtle grayish gradient
    borderRadius: '20px',
    boxShadow: '0 36px 16px rgba(0, 0, 0, 0.1)',
    margin: '20px',
    maxWidth: '1200px',
    width: '100%',
    transition: 'all 0.3s ease',
  };

  const photoStyle = {
    flex: 1,
    maxWidth: '400px',
    marginBottom: '20px',
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    transform: 'scale(1)',
    transition: 'transform 0.3s ease-in-out',
  };

  const imageStyle = {
    width: '100%',
    borderRadius: '32px',
    objectFit: 'cover',
    transition: 'transform 0.3s ease',
  };

  const detailsStyle = {
    flex: 2,
    maxWidth: '800px',
    textAlign: 'center',
    padding: '20px',
  };

  const headingStyle = {
    fontSize: '32px',
    marginBottom: '20px',
    color: '#2c3e50',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '3px',
    fontFamily: "'Roboto', sans-serif",
    textShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'color 0.3s ease',
  };

  const artistNameStyle = {
    fontSize: '28px',
    color: '#003366',
    fontWeight: 'bold',
    marginBottom: '20px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontFamily: "'Futura', sans-serif",
  };

  const paragraphStyle = {
    fontSize: '18px',
    lineHeight: '1.8',
    marginBottom: '20px',
    color: '#555',
    textAlign: 'justify',
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: "'Times New Roman', sans-serif",
    transition: 'color 0.3s ease',
  };

  const handleImageHover = (e) => {
    e.target.style.transform = 'scale(1.1)';
  };

  const handleImageLeave = (e) => {
    e.target.style.transform = 'scale(1)';
  };

  return (
    <div style={pageContainerStyle}>
      <div style={containerStyle}>
        <div style={detailsStyle}>
          <h2 style={headingStyle}>About the Seller</h2>
        </div>
        <div style={photoStyle}>
          <img
            src={photoUrl || 'https://i.ibb.co/ZYCr742/Screenshot-2024-12-11-at-2-42-31-PM.png'}
            alt="Seller"
            style={imageStyle}
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageLeave}
          />
        </div>
        <div style={detailsStyle}>
          <p style={artistNameStyle}>Rajendra bhagel</p>
          <p style={paragraphStyle}>
            During demonetization, many of us were forced to quit our craft, and when COVID hit, we had no other means of income. Even then, most of us barely made anything. For me, this art is a passion—I pour emotion into every model, ensuring that no statue is the same. I use rice husk molten brass, a technique that has been perfected over 4,500 years.
          </p>
          <p style={paragraphStyle}>
            This ancient art once thrived, but demonetization caused a significant number of artisans to abandon their work. Today, most artists earn only about 7-8k a month, struggling with rising costs and the increasing cost of living. Over the last three decades, the number of artists has dropped to a third of what it once was. Despite these dire circumstances, I am doing my best to keep this timeless art alive, preserving our rich heritage for future generations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerInfo3;
