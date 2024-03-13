import React from 'react';
import { useHistory } from 'react-router-dom';
import './HomePage.css';
import strapigenImage from './logoStrapiGen.png'; // Import the image
import apipic from './api.png'; // Import the image

import './DockerFileGenerator.css'; // Import CSS for styling


const HomePage = () => {
  const history = useHistory();

  const handleStartClick = () => {
    history.push('/plugins/strapi-gen/ProjectName');
  };

  return (
    <div className="docker-file-generator-container">
      <div className="docker-file-generator-content">
        <img 
          src={strapigenImage} 
          alt="StrapiGEN" 
          className="strapigen-image" 
          style={{ width: '350px', height: 'auto', marginBottom: '-80px'}} // Adjusted width and height
        /> {/* Image */}
        {/* <img 
          src={apipic} 
          alt="apipic" 
          className="apipic-image" 
          style={{ width: '350px', height: 'auto', marginBottom: '-80px'}} // Adjusted width and height
        /> Image */}
        <h1>
          Welcome to <span>Strapi-Gen 🚀</span>
        </h1>
        <p style={{ marginBottom: '30px'}}>Let's help you create new web Services  </p>
        <button
          className="docker-file-generator-button" // Use the same button style as in DockerizationSuccessPage
          onClick={handleStartClick}
          style={{ marginTop: '30px' , marginBottom: '100px'}}
        >
          Let's Start
        </button>
      </div>
    </div>
  );
};

export default HomePage;
