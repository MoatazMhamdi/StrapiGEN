import React, { useState } from 'react';

const DockerFileGenerator = () => {
  const [port, setPort] = useState('');
  const [imageName, setImageName] = useState('');
  const [environmentVariables, setEnvironmentVariables] = useState('');
  const [volume, setVolume] = useState('');

  const generateDockerFile = () => {
    // Generate Dockerfile content based on state variables
    const dockerFileContent = `
      FROM ubuntu
      # Add your Dockerfile configurations here
      EXPOSE ${port}
      # Set environment variables
      ENV ${environmentVariables}
      # Set volume
      VOLUME ${volume}
      # Add more configurations like CMD, COPY, etc.
    `;
    console.log(dockerFileContent);
    // You can perform further actions with the generated Dockerfile content, like saving it or displaying it to the user
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '18rem' }}>
      <div style={{ backgroundColor: '#212134', padding: '2rem', borderRadius: '0.5rem', opacity: '0.8', color: 'white', textAlign: 'center' }}>
        <h2 style={{ fontWeight: 'bold', marginBottom: '1rem', color: '#029d89' }}>Dockerfile Generator</h2>
        <p style={{ marginBottom: '1rem' }}>Configure your Dockerfile by providing the necessary details in the input fields below. Once you've filled in the required information, click the "Generate Dockerfile" button to create your Dockerfile.</p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', marginBottom: '0.5rem', alignItems: 'center' }}>
            <label htmlFor="port" style={{ marginRight: '1rem' }}>Port:</label>
            <input
              type="text"
              id="port"
              value={port}
              onChange={(e) => setPort(e.target.value)}
              placeholder="Enter port number"
              style={{ backgroundColor: 'white', color: 'black', borderRadius: '0.5rem' }}
            />
          </div>
          <div style={{ display: 'flex', marginBottom: '0.5rem', alignItems: 'center' }}>
            <label htmlFor="imageName" style={{ marginRight: '1rem' }}>Image Name:</label>
            <input
              type="text"
              id="imageName"
              value={imageName}
              onChange={(e) => setImageName(e.target.value)}
              placeholder="Enter image name"
              style={{ backgroundColor: 'white', color: 'black', borderRadius: '0.5rem' }}
            />
          </div>

          <div style={{ display: 'flex', marginBottom: '0.5rem', alignItems: 'center' }}>
            <label htmlFor="environmentVariables" style={{ marginRight: '1rem' }}>Environment Variables:</label>
            <input
              type="text"
              id="environmentVariables"
              value={environmentVariables}
              onChange={(e) => setEnvironmentVariables(e.target.value)}
              placeholder="Enter environment variables"
              style={{ backgroundColor: 'white', color: 'black', borderRadius: '0.5rem' }}
            />
          </div>
          
          <div style={{ display: 'flex', marginBottom: '0.5rem', alignItems: 'center' }}>
            <label htmlFor="volume" style={{ marginRight: '1rem' }}>Volume:</label>
            <input
              type="text"
              id="volume"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
              placeholder="Enter volume path"
              style={{ backgroundColor: 'white', color: 'black', borderRadius: '0.5rem' }}
            />
          </div>
          {/* Add more input fields for other Dockerfile configurations */}
        </div>
        <button onClick={generateDockerFile} style={{ backgroundColor: '#029d89', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}>Generate Dockerfile</button>
      </div>
    </div>
  );
};

export default DockerFileGenerator;
