import React, { useState } from 'react';
import { FaSpinner } from 'react-icons/fa'; // Importing the spinner icon from react-icons/fa
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory from react-router-dom
import './GenerateCodeComponent.css'; // Import CSS file
import './DockerFileGenerator.css'; // Import CSS for styling

const CodeGenerator = () => {
  const [method, setMethod] = useState({
    POST: false,
    GET: false,
    PATCH: false,
    DELETE: false,
  });
  const [responseJson, setResponseJson] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory(); // Get the history object

  const toggleMethod = (methodName) => {
    setMethod((prevState) => ({
      ...prevState,
      [methodName]: !prevState[methodName],
    }));
  };

  const generateCode = async () => {
    setIsLoading(true); // Set loading state to true
    try {
      const response = await axios.post(
        'http://localhost:1337/strapi-gen/generate-backend',
        {
          method: Object.keys(method).filter((key) => method[key]).join(','),
        }
      );
      console.log(response.data.message); // Success message from backend
      setResponseJson(response.data); // Set response JSON
    } catch (error) {
      console.error('Error generating code:', error);
      // Handle error
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  const navigateBack = () => {
    history.push('/plugins/strapi-gen/Overview'); // Navigate to the specified route
  };

  return (
    <div className="docker-file-generator-container">
      <div className="docker-file-generator-content">
        <div className="back-button-container">
          <button className="back-button" onClick={navigateBack}>
            Back
          </button>
        </div>
        <h2 className="docker-file-generator-title">
          <strong style={{ fontSize: '3rem', marginBottom: '20px' }}>
            Generate Rest API
          </strong>
        </h2>
        <p className="docker-file-generator-description">
          Your project will be automatically generated with all the selected
          rest API Toggle, and thanks
        </p>
        <div style={{ borderRadius: '20px', padding: '20px' }}>
          <div className="toggle-container">
            <p style={{ color: 'white', marginRight: '15px' }}>
              tap to ensure the method Post, Endpoint:{' '}
              <strong style={{ color: 'green' }}>'/'</strong>
            </p>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={method.POST}
                onChange={() => toggleMethod('POST')}
              />
              <span className="toggle-slider"></span>
            </label>
            <label style={{ color: 'blue', marginLeft: '10px' }}>/POST</label>
          </div>

          <div className="toggle-container">
            <p style={{ color: 'white', marginRight: '15px' }}>
              tap to ensure the method, Endpoint:{' '}
              <strong style={{ color: 'green' }}>'/All'</strong>
            </p>

            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={method.GET}
                onChange={() => toggleMethod('GET')}
              />
              <span className="toggle-slider"></span>
            </label>
            <label style={{ color: 'green', marginLeft: '10px' }}>/GET</label>
          </div>

          <div className="toggle-container">
            <p style={{ color: 'white', marginRight: '15px' }}>
              tap to ensure the method, Endpoint:{' '}
              <strong style={{ color: 'green' }}>'/updateBlog/:id'</strong>
            </p>

            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={method.PATCH}
                onChange={() => toggleMethod('PATCH')}
              />
              <span className="toggle-slider"></span>
            </label>
            <label style={{ color: 'purple', marginLeft: '10px' }}>
              /PATCH
            </label>
          </div>

          <div className="toggle-container">
            <p style={{ color: 'white', marginRight: '15px' }}>
              tap to ensure the method Delete, Endpoint:{' '}
              <strong style={{ color: 'green' }}>'/delete/:id'</strong>
            </p>

            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={method.DELETE}
                onChange={() => toggleMethod('DELETE')}
                           />
              <span className="toggle-slider"></span>
            </label>
            <label style={{ color: 'red', marginLeft: '10px' }}>
              /DELETE
            </label>
          </div>
        </div>
        <button
          className="docker-file-generator-button"
          onClick={generateCode}
          style={{ marginTop: '30px' }}
        >
          {isLoading ? (
            <FaSpinner className="spinner-icon" spin />
          ) : (
            'Generate Code'
          )}
        </button>
        {/* Popup modal */}
        {responseJson && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setResponseJson(null)}>
                &times;
              </span>
              <p>Rest Api Created Successfully!</p> {/* Add your message here */}
              <pre>{JSON.stringify(responseJson, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeGenerator;