import React, { useState } from 'react';
import axios from 'axios';
import './GenerateCodeComponent.css'; // Import CSS file


const CodeGenerator = () => {
  const [method, setMethod] = useState({
    POST: false,
    GET: false,
    PATCH: false,
    DELETE: false,
  });
  const [responseJson, setResponseJson] = useState(null);
  const [isLoading, setIsLoading] = useState(false);




  const toggleMethod = (methodName) => {
    setMethod(prevState => ({
      ...prevState,
      [methodName]: !prevState[methodName],
    }));
  };


  const generateCode = async () => {
    setIsLoading(true); // Set loading state to true
    try {
      const response = await axios.post('http://localhost:1337/strapi-gen/generate-backend', {
        method: Object.keys(method).filter(key => method[key]).join(','),
      });
      console.log(response.data.message); // Success message from backend
      setResponseJson(response.data); // Set response JSON
    } catch (error) {
      console.error('Error generating code:', error);
      // Handle error
    }finally {
      setIsLoading(false); // Set loading state to false
    }
  };


  return (
    <div className="code-generator-container">
      <h2>Choose methods to generate code:</h2>
      <div className="toggle-container">
      <label className="toggle-switch">
          <input type="checkbox" checked={method.POST} onChange={() => toggleMethod('POST')} />
          <span className="toggle-slider"></span>
        </label>
        <label>POST</label>
      </div>
      <div className="toggle-container">
        <label className="toggle-switch">
          <input type="checkbox" checked={method.GET} onChange={() => toggleMethod('GET')} />
          <span className="toggle-slider"></span>
        </label>
        <label>GET</label>
      </div>
      <div className="toggle-container">
        <label className="toggle-switch">
          <input type="checkbox" checked={method.PATCH} onChange={() => toggleMethod('PATCH')} />
          <span className="toggle-slider"></span>
        </label>
        <label>PATCH</label>
      </div>
      <div className="toggle-container">
        <label className="toggle-switch">
          <input type="checkbox" checked={method.DELETE} onChange={() => toggleMethod('DELETE')} />
          <span className="toggle-slider"></span>
        </label>
        <label>DELETE</label>
      </div>
      <button className="generate-button" onClick={generateCode}>Generate Code</button>
      {/* Loading popup */}
      {isLoading && (
        <div className="loading-modal">
          <div className="loading-content">
            <span>Loading...</span>
          </div>
        </div>
      )}
      {/* Popup modal */}
      {responseJson && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setResponseJson(null)}>&times;</span>
            <pre>{JSON.stringify(responseJson, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};


export default CodeGenerator;



