import React, { useState } from 'react';
import './ProjectNamePage.css';
import { useHistory } from 'react-router-dom';
import strapigenImage from './logoStrapiGen.png'; 
import './DockerFileGenerator.css'; // Import CSS for styling

const ProjectNamePage = () => {
  const [projectName, setProjectName] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [showError, setShowError] = useState(false); // State to track whether to show the error message
  const history = useHistory();

  const handleInputChange = (event) => {
    setProjectName(event.target.value);
    // Hide the error message when user starts typing again
    setShowError(false);
  };

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  const handleConfirm = () => {
    if (projectName.trim() === '') {
      // If project name is empty, show error message
      setShowError(true);
    } else {
      // Navigate to GitConnect page if project name is not empty
      history.push('/plugins/strapi-gen/GitConnect');
    }
  };
  
  return (
    <div className="docker-file-generator-container">
      <div className="docker-file-generator-content">
        <img src={strapigenImage} alt="StrapiGEN" className="strapigen-image"  style={{ marginBottom: '-80px'}}/> {/* Image */}

        <h1>
          First, we need to choose a name for our project
        </h1>
        <p style={{ marginBottom: '30px'}}>Give your project a meaningful name. 
            It will be used in the generated code and the folder structure of the project ⚡️ </p>
        <div className="input-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input
            type="text"
            value={projectName}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder={inputFocused ? '' : 'Write your project name here..'}
            className="project-name-input"
            style={{ marginBottom: '10px' }} // Add margin-bottom to the input field
          />
          {/* Error message */}
          {showError && (
            <p className="error-message" style={{ color: 'red' }}>You should write a project name</p>
          )}
          <button
            className="docker-file-generator-button" // Use the same button style as in DockerizationSuccessPage
            onClick={handleConfirm}
            style={{ marginTop: '30px', marginBottom: '50px' }} // Add margin-top to the button
          >
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectNamePage;
