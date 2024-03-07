import React, { useState } from 'react';
import './DockerFileGenerator.css';

const DockerFileGenerator = () => {
  const [port, setPort] = useState('');
  const [imageName, setImageName] = useState('');
  const [nodeVersion, setNodeVersion] = useState('');
  const [databaseClient, setDatabaseClient] = useState(''); // New state
  const [databaseHost, setDatabaseHost] = useState(''); // New state
  const [databasePort, setDatabasePort] = useState(''); // New state
  const [dockerfileContent, setDockerfileContent] = useState('');

  const generateDockerFile = async () => {
    try {
      const response = await fetch('/generate-docker-files', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          port,
          imageName,
          nodeVersion,
          databaseClient, // Include new fields in the request body
          databaseHost,
          databasePort
        })
      });

      if (response.ok) {
        const data = await response.json();
        setDockerfileContent(data.dockerfile);
      } else {
        throw new Error('Error while generating Dockerfile');
      }
    } catch (error) {
      console.error(error);
      alert('Error while generating Dockerfile');
    }
  };

  return (
    <div className="docker-file-generator-container">
      <div className="docker-file-generator-content">
        <h2 className="docker-file-generator-title">Dockerize Your Project</h2>
        <p className="docker-file-generator-description">Add modifications to your Dockerfile and Docker Compose.</p>
        <div className="docker-file-generator-inputs">
          <div className="docker-file-generator-input">
            <label htmlFor="port" className="docker-file-generator-label">Port:</label>
            <input
              type="text"
              id="port"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              placeholder="Enter port number"
              className="docker-file-generator-input-field"
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
          {/* Add more input fields for other Dockerfile configurations */}
        </div>
        <button onClick={generateDockerFile} className="docker-file-generator-button">Dockerize</button>
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