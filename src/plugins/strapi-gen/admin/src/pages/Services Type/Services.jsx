import React, { useState } from 'react';
import './Services.css';
import { Switch } from 'antd';
import { useHistory } from 'react-router-dom';

const ServicesType = () => {
  const [toggleChecked, setToggleChecked] = useState(false);
  const history = useHistory();

  const handleToggleChange = (checked) => {
    setToggleChecked(checked);
  };

  const handleNextButtonClick = () => {
    // Navigate to the next page
    history.push('/plugins/strapi-gen/Entities');
  };
 
  return (
    <div className="container-fluid">
      <div>
        <h1>
          Let's connect to a Git Repository
        </h1>
        <p>StrapiGEN automatically pushes the generated code of your service to a git repository.</p>
        <div className="github-container">
          <div className="service-text">
            Rest API & Swagger UI
          </div>
          <div className="toggle-container">
            <Switch checked={toggleChecked} onChange={handleToggleChange} />
          </div>
       
        
        </div>
        <div className="admin-ui-container">
          <div className="admin-ui-text">
            Admin UI
          </div>
          <div className="toggle-container">
            <Switch checked={toggleChecked} onChange={handleToggleChange} />
          </div>
        </div>
        <div>
        <button className="next-button" onClick={handleNextButtonClick}>
            Next
          </button>
          </div>
      </div>
    </div>
  );
};

export default ServicesType;
