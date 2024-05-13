import React from 'react';
import { FaCheckCircle } from 'react-icons/fa'; // Importing the check-circle icon from react-icons/fa
import { useHistory,useLocation } from 'react-router-dom';
import './DockerFileGenerator.css'; // Import CSS for styling

const DockerizationSuccessPage = () => {
  const history = useHistory();
  const location = useLocation();
  const selectedRepo = location.state ? location.state.selectedRepo : null;
  const tokenGitOauth = location.state ? location.state.tokenGitOauth : '';

console.log('il token taa zee',tokenGitOauth)
console.log('il repo taa zee',selectedRepo)

  const handleGoBack = () => {
    history.push('/plugins/strapi-gen/Overview', { tokenGitOauth: tokenGitOauth , selectedRepo: selectedRepo }); // Navigate to the specified route
  };
  const handleCompleteDocker = () => {
    history.push('/plugins/strapi-gen/DockerHubLoginForm', { tokenGitOauth: tokenGitOauth , selectedRepo: selectedRepo }); // Navigate to the specified route
  };
  return (
    <div className="docker-file-generator-container" style={{ marginTop: '30px' }}>
      <div className="docker-file-generator-content">
        <div className="icon-container" style={{ color: 'green', fontSize: '3rem' ,display: 'flex', justifyContent: 'center', marginBottom: '30px'}}> {/* Added styles to the icon container */}
          <FaCheckCircle className="success-icon" style={{ fontSize: '7rem' }}/>
        </div>
        <h2 className="docker-file-generator-title" style={{ fontSize: '2rem' , marginBottom: '30px'}}><strong>Dockerization Successful! 🐳</strong></h2> {/* Added custom style to increase font size */}
        <p className="docker-file-generator-description">Your project has been successfully Dockerized and has been pushed to your GitHub Repository</p>

        <div>
        <button className="docker-file-generator-button" onClick={handleGoBack} style={{ marginRight: '50px'}}>finish</button>
        <button className="btn btn-outline-info" onClick={handleCompleteDocker} style={{ marginLeft: '50px'}}>Push files to Dockerhub</button>

            
          </div>
      </div>
    </div>
  );
};

export default DockerizationSuccessPage;