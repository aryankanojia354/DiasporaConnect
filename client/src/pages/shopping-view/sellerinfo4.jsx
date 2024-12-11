import React from 'react';

const SellerInfo4 = ({ photoUrl }) => {
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
            src={photoUrl || 'https://i.ibb.co/HKczcK1/PHOTO-2024-12-11-14-53-42.jpg'}
            alt="Seller"
            style={imageStyle}
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageLeave}
          />
        </div>
        <div style={detailsStyle}>
          <p style={artistNameStyle}>gafar khatri</p>
          <p style={paragraphStyle}>
            This tradition has been woven into my family’s story for eight generations, spanning over four centuries. Our craft is centuries old, a testament to the resilience and dedication passed down through the ages. However, the rise of industrial textiles has forced many talented artists to abandon their passion in search of more lucrative opportunities. As factories and machines took over, the intricate handwork that once thrived began to dwindle.
          </p>
          <p style={paragraphStyle}>
            Today, we are the last family committed to keeping this 400-year-old tradition alive. Every day, we strive to honor our ancestors by meticulously preserving the techniques and artistry that define our heritage. Despite the challenges and the dwindling number of artisans, our passion remains unwavering. We hold onto the hope that our efforts will inspire future generations to cherish and continue this timeless art, ensuring that our family’s legacy endures for many more centuries to come.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerInfo4;
