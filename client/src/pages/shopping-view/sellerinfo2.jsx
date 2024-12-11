import React from 'react';

const SellerInfo2 = ({ photoUrl }) => {
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
            src={photoUrl || 'https://i.ibb.co/hHzH7B1/PHOTO-2024-12-11-14-26-33.jpg'}
            alt="Seller"
            style={imageStyle}
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageLeave}
          />
        </div>
        <div style={detailsStyle}>
          <p style={artistNameStyle}>Sajan Wahi</p>
          <p style={paragraphStyle}>
            I inherited this art from my grandfather, fulfilling his heartfelt wish for its revival. During the Mughal reign, particularly under Emperor Akbar, Kani artists thrived. Akbar was a great patron of their craft, as mentioned in the Ain-i-Akbari, which highlights the significance and esteem of Kashmiri textiles in his court. Their prosperity was so remarkable that they could afford to replace water with milk in their hookahs—a true testament to their success and the high regard in which their craftsmanship was held.
          </p>
          <p style={paragraphStyle}>
            Sadly, over the years, this magnificent art form began to fade away. Today, in the small town of Kanihama, more than 600 dedicated weavers work diligently on 250 handlooms, striving to keep the Kani tradition alive. Their unwavering commitment ensures that each intricate pattern and delicate design continues to tell the story of our rich heritage. I hold this art close to my heart, a symbol of resilience and the enduring beauty of our craft. May the art of Kani weaving never die.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerInfo2;
