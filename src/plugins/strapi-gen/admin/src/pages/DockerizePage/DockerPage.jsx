import React, { useState, useEffect } from 'react';
import './DockerFileGenerator.css';
import axios from 'axios';
import { useLocation} from 'react-router-dom';

const DockerFileGenerator = () => {
  const location = useLocation(); // Use useLocation hook
  const selectedRepo = location.state ? location.state.selectedRepo : null; // Access selectedRepo from location.state

  const [port, setPort] = useState('');
  const [imageName, setImageName] = useState('');
  const [nodeVersion, setNodeVersion] = useState('');
  const [databaseClient, setDatabaseClient] = useState('');
  const [databaseHost, setDatabaseHost] = useState('');
  const [databasePort, setDatabasePort] = useState('');
  const [dockerfileContent, setDockerfileContent] = useState('');
  const [packageManager, setPackageManager] = useState('');

  useEffect(() => {
    // Check if selectedRepo is available
    if (!selectedRepo) {
      // Redirect to the previous page or handle this condition accordingly
      console.error('Selected repository not found');
    }else
    console.log('selectedRepo:',selectedRepo)
  }, [selectedRepo]);

  const generateDockerFile = async () => {
    try {
      // Validation checks and axios request
      if (port === '' || isNaN(port) || parseInt(port) < 0 || parseInt(port) > 9999) {
        throw new Error('Port number must be a valid number between 0 and 9999.');
      }

      if (packageManager !== 'npm' && packageManager !== 'yarn') {
        throw new Error('Package manager must be either "npm" or "yarn".');
      }

      const response = await axios.post('http://localhost:1337/strapi-gen/generate-docker-files', {
        port,
        imageName,
        nodeVersion,
        databaseClient,
        databaseHost,
        databasePort,
        packageManager,
        selectedRepo 
      });

      if (response.data) {
        const data = response.data;
        setDockerfileContent(data.message);
      } else {
        throw new Error('Error while generating Dockerfile');
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="docker-file-generator-container">
      <div className="docker-file-generator-content">
        <h2 className="docker-file-generator-title"><strong>Dockerize Your Project</strong></h2>
        <p className="docker-file-generator-description">Add modifications to your Dockerfile and Docker Compose.</p>
        <div className="docker-file-generator-inputs" style={{ marginTop: '30px', marginBottom: '30px' }}>
          <div className="docker-file-generator-input">
            <label htmlFor="port" className="docker-file-generator-label">Port:</label>
            <input
              type="number"
              id="port"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              placeholder="Enter port number"
              className="docker-file-generator-input-field"
              min="0"
              max="9999"
            />
          </div>
          <div className="docker-file-generator-input">
            <label htmlFor="imageName" className="docker-file-generator-label">Image Name:</label>
            <input
              type="text"
              id="imageName"
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
              placeholder="Enter image name"
              className="docker-file-generator-input-field"
            />
          </div>
          <div className="docker-file-generator-input">
            <label htmlFor="NodeVersion" className="docker-file-generator-label">Node Version:</label>
            <input
              type="text"
              id="NodeVersion"
              value={nodeVersion}
              onChange={(e) => setNodeVersion(e.target.value)}
              placeholder="Enter your Node Version"
              className="docker-file-generator-input-field"
            />
          </div>
          <div className="docker-file-generator-input">
            <label htmlFor="databaseClient" className="docker-file-generator-label">Database Client:</label>
            <input
              type="text"
              id="databaseClient"
              value={databaseClient}
              onChange={(e) => setDatabaseClient(e.target.value)}
              placeholder="Enter database client"
              className="docker-file-generator-input-field"
            />
          </div>
          <div className="docker-file-generator-input">
            <label htmlFor="databaseHost" className="docker-file-generator-label">Database Host:</label>
            <input
              type="text"
              id="databaseHost"
              value={databaseHost}
              onChange={(e) => setDatabaseHost(e.target.value)}
              placeholder="Enter database host"
              className="docker-file-generator-input-field"
            />
          </div>
          <div className="docker-file-generator-input">
            <label htmlFor="databasePort" className="docker-file-generator-label">Database Port:</label>
            <input
              type="text"
              id="databasePort"
              value={databasePort}
              onChange={(e) => setDatabasePort(e.target.value)}
              placeholder="Enter database port"
              className="docker-file-generator-input-field"
            />
          </div>
          <div className="docker-file-generator-input">
            <label htmlFor="packageManager" className="docker-file-generator-label">Package Manager:</label>
            <select
              id="packageManager"
              value={packageManager}
              onChange={(e) => setPackageManager(e.target.value)}
              className="docker-file-generator-input-field"
            >
              <option value="">Select Package Manager</option>
              <option value="npm">npm</option>
              <option value="yarn">yarn</option>
            </select>
          </div>
        </div>
        <button onClick={generateDockerFile} className="docker-file-generator-button">Dockerize !</button>
      </div>
      {dockerfileContent && (
        <div className="docker-file-generator-output">
          <h3>Generated Dockerfile:</h3>
          <pre>{dockerfileContent}</pre>
        </div>
      )}
    </div>
  );
};

export default DockerFileGenerator;
