import React, { useState } from 'react';
import './Services.css';
import { Switch } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
//import strapigenImage from './logoStrapiGen.png'; // Import the image


const ServicesType = () => {
  const [toggleChecked, setToggleChecked] = useState(false);
  const [toggleChecked2, setToggleChecked2] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const selectedRepo = location.state ? location.state.selectedRepo : null;

  const handleToggleChange = (checked) => {
    setToggleChecked(checked);
  };

  const handleToggleChange2 = (checked) => {
    setToggleChecked2(checked);
  };

  const handleNextButtonClick = () => {
    // Navigate to the next page
    history.push({
      pathname: '/plugins/strapi-gen/Entitiees',
      state: { selectedRepo: selectedRepo }
    });
  };
 
  return (
    <div className="docker-file-generator-container" style={{marginTop:'40px'}}>
      <div className="docker-file-generator-content">
      <img 
            src={} 
            alt="StrapiGEN" 
            className="strapigen-image" 
            style={{ width: '400px', height: 'auto', marginBottom: '-70px', marginTop: '-100px'}} // Adjusted width and height
          /> {/* Image */}
        <h1>
          Let's connect to a Git Repository
        </h1>
        <p>StrapiGEN automatically pushes the generated code of your service to a git repository.</p>
        <div className="admin-ui-container">
          <div className="admin-ui-text" style={{color:'#029d89'}}>
            Rest API
          </div>
          <div className="toggle-container">
            <Switch checked={toggleChecked} onChange={handleToggleChange} />
            <span className="toggle-label">Push the generated code to preview repository on GitHub</span>
          </div>
        </div>
        <div className="admin-ui-container">
          <div className="admin-ui-text" style={{color:'#029d89'}}>
            Admin UI
          </div>
          <div className="toggle-container">
            <Switch checked={toggleChecked2} onChange={handleToggleChange2} />
            <span className="toggle-label">Push the generated code to preview repository on GitHub</span>
          </div>
        </div>
        <button className="docker-file-generator-button" onClick={handleNextButtonClick} style={{marginTop:'30px'}}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ServicesType;