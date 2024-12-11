import React from 'react';

const SellerInfo1 = ({ photoUrl }) => {
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
            src={photoUrl || 'https://i.ibb.co/qBMrQ0G/Screenshot-2024-12-11-at-2-25-34-PM.png'}
            alt="Seller"
            style={imageStyle}
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageLeave}
          />
        </div>
        <div style={detailsStyle}>
          <p style={artistNameStyle}>Gulam muhammad</p>
          <p style={paragraphStyle}>
            I watch as machine embroidery takes over the art of Kashida embroidery, feeling a deep sense of loss with each automated stitch. Every day, we barely make 100 to 150 rupees, just enough to survive. Crafting a single shawl takes nearly a month of dedicated work, yet the same intricate designs can be produced effortlessly by machines. Customers prefer the machine-made pieces because they’re cheaper and faster, leaving little room for us to showcase the beauty and skill of our traditional craft.
          </p>
          <p style={paragraphStyle}>
            No one is willing to pay for the time, effort, and heart we pour into each shawl. It’s disheartening to see our heritage being overshadowed by technology, but I refuse to give up. I am doing my best to keep this art alive, even in such dire circumstances. Every thread I weave is a testament to our rich culture and the generations of artisans before me. I hold onto hope that one day, people will recognize the value of handcrafted beauty and support the preservation of our beloved Kashida embroidery.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerInfo1;
