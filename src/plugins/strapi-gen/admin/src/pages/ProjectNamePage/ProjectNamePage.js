import SelectedRepo from '../GitHub Connect/SelectedRepo';
import DockerFileGenerator from '../docker/DockerFileGenerator';
import React, { useState } from 'react';
import './ProjectNamePage.css';
import { useHistory } from 'react-router-dom';

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
  
  return (
    <div className="container-fluid">
      <div>
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
            disabled={!projectName.trim()} // Disable the button if projectName is empty or only contains whitespace
          >
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectNamePage;