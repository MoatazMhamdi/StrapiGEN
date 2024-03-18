import React, { useState } from 'react';
import './ProjectNamePage.css';
import { useHistory } from 'react-router-dom';
import strapigenImage from './logoStrapiGen.png';

const ProjectNamePage = () => {
  const [projectName, setProjectName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleInputChange = (event) => {
    setProjectName(event.target.value);
    setErrorMessage('');
  };

  const handleConfirm = async () => {
    if (projectName.trim() === '') {
      setErrorMessage('Please enter a project name');
      return;
    }

    // Create the repository on GitHub
    try {
      const response = await fetch('https://api.github.com/user/repos', {
        method: 'POST',
        headers: {
          Authorization: 'token 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',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: projectName }),
      });
      const data = await response.json();
      if (response.status === 201) {
        // Redirect to SelectedRepo page with selected repository information
        history.push({
          pathname: '/plugins/strapi-gen/selectedrepository',
          state: { selectedRepo: data.full_name },
        });
      } else if (response.status === 422) {
        alert('this repository name is already in use in your github account! try other one :)');
      } else {
        console.error('Failed to create repository:', data.message);
      }
    } catch (error) {
      console.error('Error creating repository:', error);
    }
  };

  return (
    <div className="docker-file-generator-container">
      <div className="docker-file-generator-content">
        <img src={strapigenImage} alt="StrapiGEN" className="strapigen-image" style={{marginBottom: '-60px'}}/>
  
        <h1>First, we need to choose a name for your project</h1>
        <p>Give your project a meaningful name.</p>
        <p style={{marginBottom: '40px'}}>the name of the project you type is a generated empty github repository  </p>
  
        <div className="input-container">
          <div>
            <input
              type="text"
              value={projectName}
              onChange={handleInputChange}
              placeholder="Write your project name here.."
              className="project-name-input"
            />
            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
          </div>
          <div>
            <button className="docker-file-generator-button" onClick={handleConfirm} style={{marginTop: '40px'}}>
              CONFIRM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectNamePage;
