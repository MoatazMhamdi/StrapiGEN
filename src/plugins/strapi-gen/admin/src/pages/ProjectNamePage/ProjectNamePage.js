import React, { useState } from 'react';
import './ProjectNamePage.css';
import { useHistory } from 'react-router-dom';
import strapigenImage from './logoStrapiGen.png'; // Import the image


const ProjectNamePage = () => {
  const [projectName, setProjectName] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const history = useHistory();

  const handleInputChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };

  const handleConfirm = () => {
    // Navigate to GitConnect page
    history.push('/plugins/strapi-gen/GitConnect');
  };
  
  // Conditionally enable confirm button
  const isConfirmButtonDisabled = projectName.trim() === '';

  return (
    <div className="container-fluid">
      <div>
      <img src={strapigenImage} alt="StrapiGEN" className="strapigen-image" /> {/* Image */}

        <h1>
          First, we need to choose a name for our project
        </h1>
        <p>Give your project a meaningful name. 
            It will be used in the generated code and the folder structure of the project </p>
        <div className="input-container">
          <input
            type="text"
            value={projectName}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder={inputFocused ? '' : 'Write your project name here'}
            className="project-name-input"
          />
          <button
            className="confirm-button"
            onClick={handleConfirm}
            disabled={isConfirmButtonDisabled}
          >
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectNamePage;
