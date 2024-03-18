import React, { useState } from 'react';
import './Git.css';
import { RiGithubFill } from 'react-icons/ri';
import { Switch } from 'antd';
import { useHistory } from 'react-router-dom';

const GitConnect = () => {
  const [git, setGit] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [toggleChecked, setToggleChecked] = useState(false);
  const history = useHistory();
  const CLIENT_ID ='e9d29cdcac4030c9ba3f';

  const handleToggleChange = (checked) => {
    setToggleChecked(checked);
  };

  const handleConnectButtonClick = () => {
    // Navigate to the services page
    history.push('/plugins/strapi-gen/ProjectName');
  };
  function loginwithgithub(){
   window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
  };
 
  return (
    <div className="container-fluid">
      <div>
        <h1>
          Let's connect to a Git Repository 🌌
        </h1>
        <p>StrapiGEN automatically pushes the generated code of your service to a git repository.</p>
        <div className="github-container">
          <div className="github-content">
            <div className="github-icon">
              <RiGithubFill size={50} color="#f9f9f9" />
            </div>
            <div className="github-text">
              GitHub
            </div>
            <button className="connect-button" onClick={loginwithgithub}>
              Connect
            </button>
          </div>
        </div>
         <div className="toggle-container">
            <Switch checked={toggleChecked} onChange={handleToggleChange} />
            <span className="toggle-label">Push the generated code to preview repository on GitHub</span>
          </div>
      </div>
    </div>
  );
};

export default GitConnect;