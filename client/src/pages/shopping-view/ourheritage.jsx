import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body, html {
    margin:0;
    padding:0;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    background: #1f1f1f;
    color: #fff;
  }
`;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const NavImage = styled.img`
  width: 140px; /* Adjust the size of the image button */
  height: 80px;
  cursor: pointer;
  margin-right: 20px; /* Add spacing between the image and the title */
`;

const Navbar = styled.nav`
  width: 100%;
  background: #444;
  padding: 15px 20px;
  display: flex;
  justify-content: flex-start; /* Align items to the left */
  align-items: center;
  box-shadow: 0 20px 10px rgba(0, 0, 0, 0.5);
  position: sticky;
  top: 0;
  z-index: 1000;
`;


const NavTitle = styled.h1`
  margin: 0;
  font-size: 3.8rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 1px;
  text-align: center;
  flex: 1;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #888;
  padding: 10px;
  gap: 36px; /* Increased gap between different input fields and labels */
  border-radius: 140px;
  margin: 32px 0;
  box-shadow: 0 16px 12px rgba(0, 0, 0, 0.2);

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 6px; /* Small gap between label and its respective input */
  }

  label {
    font-size: 1.1rem;
    color: #fff;
    align-items: left;
  }

  input {
    padding: 10px 16px;
    border: none;
    border-radius: 80px;
    font-size: 1rem;
    background: #ddd;
    color: #000;
    outline: none;
    align-items: left;

    &:focus {
      background: #555;
    }
  }

  button {
    padding: 10px 90px;
    border: none;
    border-radius: 80px;
    background: #003bf3;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.1s ease;

    &:hover {
      background-color: #001bb1;
    }

    &:active {
      transform: scale(0.98);
    }
  }
`;


// Instead of a grid, use a column layout with one image per row.
const ImageList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px; 
  margin-bottom: 40px;
`;

const ImageCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 40px;
  box-shadow: 0 12px 90px rgba(0,0,0,0.9);
  transition: transform 0.3s ease;
  width: 1050px; /* Fixed width for a neat layout */

  &:hover {
    transform: scale(1.02);
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    transition: transform 0.4s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const OverlayText = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  background-color: rgba(0,0,0,0.5);
  color: #fff;
  opacity: 0.5;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 2.1rem;
  font-weight: 500;
  transition: background-color 0.3s ease, color 0.3s ease;

  ${ImageCard}:hover & {
    background-color: #000;
    color: #fff;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0,0,0,0.7);
  border: none;
  color: #fff;
  padding: 5px 8px;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const OurHeritage = () => {
  const [images, setImages] = useState([
    {
      id: 1,
      url: 'https://i.pinimg.com/736x/d0/e6/bd/d0e6bd3bdddec7184cc61344c9e30ebd.jpg',
      text: 'Kashida Embroid'
    
    },

    {
      id: 2,
      url: 'https://lh3.googleusercontent.com/ci/AL18g_QFvYy8IOZFIIZnTwhEnvse2LckwEdr46xF3NuIXeDNx3r6xgoaFoKW8mnS-Q_MHztbB___jw=s1200',
      text: 'Dokra Art'
    
    },

    {
      id: 3,
      url: 'https://media.istockphoto.com/id/1473244576/photo/kashmiri-shawl-in-making.jpg?s=612x612&w=0&k=20&c=i38rszw4wlWhXuxesx8846ZTiPmEZCUK-RNhdjGbWrM=',
      text: 'Kashmiri Shawl'
    
    },

    {
      id: 4,
      url: 'https://media.istockphoto.com/id/1356922330/photo/rogan-art.jpg?s=612x612&w=0&k=20&c=oNCt89r___DRYIaVwxJArMwuOOURk3C7EVNtzHV4E60=',
      text: 'Rogan Art'
    
    },

    
  ]);

  const [imageUrl, setImageUrl] = useState('');
  const [overlayText, setOverlayText] = useState('');

  const handleAddImage = (e) => {
    e.preventDefault();
    if (imageUrl.trim() === '') return;
    const newImage = {
      id: Date.now(),
      url: imageUrl,
      text: overlayText
    };
    setImages([...images, newImage]);
    setImageUrl('');
    setOverlayText('');
  };

  const handleDelete = (id) => {
    const updated = images.filter(img => img.id !== id);
    setImages(updated);
  };

  return (
    <>
      <GlobalStyle />
      <Navbar>
        <NavImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqYbYhha2dYQbMuTn_EEWXNWFGhofFDTjedg&s" alt="Logo" />
        <NavTitle>Our Heritage</NavTitle>
        <NavImage src="https://www.sih.gov.in/img1/logo/SIH_logo_2024_horizontal.png" alt="Logo" />
      </Navbar>
      <Wrapper>
        <Form onSubmit={handleAddImage}>
          <label htmlFor="imageUrl">Image URL</label>
          <input 
            type="text" 
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL..."
          />
          <label htmlFor="overlayText">Overlay Text</label>
          <input 
            type="text" 
            id="overlayText"
            value={overlayText}
            onChange={(e) => setOverlayText(e.target.value)}
            placeholder="Enter overlay text..."
          />
          <button type="submit">Add Image</button>
        </Form>

        <ImageList>
          {images.map((img) => (
            <ImageCard key={img.id}>
              <img src={img.url} alt="Heritage" />
              <OverlayText>{img.text}</OverlayText>
              <DeleteButton onClick={() => handleDelete(img.id)}>X</DeleteButton>
            </ImageCard>
          ))}
        </ImageList>
      </Wrapper>
    </>
  );
};

export default OurHeritage;
