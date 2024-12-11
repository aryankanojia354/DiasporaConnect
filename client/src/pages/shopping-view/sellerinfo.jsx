import React from 'react';

const SellerInfo = ({ photoUrl }) => {
  const pageContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: '#e6f2ff',//'linear-gradient(145deg, #f0f0f5, #d9d9e3)', // Subtle grayish gradient
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
    fontSize: '20x',
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
            src={photoUrl || 'https://i.ibb.co/16w9s69/Whats-App-Image-2024-12-11-at-21-46-10.jpg'}
            alt="Seller"
            style={imageStyle}
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageLeave}
          />
        </div>
        <div style={detailsStyle}>
          {/* <h2 style={headingStyle}>About the Seller</h2> */}
          <p style={artistNameStyle}>Mohammad Afzal Ansari</p>
          <p style={paragraphStyle}>
            I have dedicated the past 40 years to preserving our 16th-century tradition of handwoven Benarasi saris. Using tussar silk—a non-violent silk where we only boil the cocoons after the moths have hatched—I create each piece with meticulous care. My designs blend Mughal, Persian, and Chinese motifs, incorporating both traditional patterns and original creations, enhanced by zari threads that give each sari its signature shine.
          </p>
          <p style={paragraphStyle}>
            Despite producing only 4-5 saris a month, each one holds a special place in my heart, as power loom fabrics simply cannot match the quality and artistry of handmade pieces.
          </p>
          <p style={paragraphStyle}>
            Industrialization has drastically impacted our craft, reducing the number of artisans to less than 15% of what it once was and flooding the market with fake Benarasi sarees and synthetic alternatives that lack the vibrant shine of genuine zari work. Rising costs and economic challenges have made it difficult to sustain our livelihoods, yet I remain passionate about keeping this art alive.
          </p>
          <p style={paragraphStyle}>
            Encouragingly, government initiatives for geographical indication are helping to ensure that only authentic handloom saris are recognized as genuine Benarasi brocades. Despite the obstacles, I continue to strive towards preserving our rich heritage for future generations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerInfo;
