import React, { useState, useEffect } from 'react';
import './Git.css';
import { RiGithubFill } from 'react-icons/ri';
import { Switch } from 'antd';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

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
    console.log("Redirecting user to GitHub OAuth authorization page...");
    history.push('/plugins/strapi-gen/selectedrepository');
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
  };

  const handleRedirect = () => {
    console.log("Handling redirect...");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');

    if (code) {
      console.log("Authorization code obtained:", code);
      const clientId = 'e9d29cdcac4030c9ba3f';
      const clientSecret = '0e93d76f76a31cbf7c9dd154f1d88fd5d2211c04';

      axios.post('https://github.com/login/oauth/access_token', {
        client_id: clientId,
        client_secret: clientSecret,
        code: code
      }, {
        headers: {
          Accept: 'application/json'
        }
      }).then((response) => {
        const { access_token } = response.data;
        console.log("Access token obtained:", access_token);
        localStorage.setItem('token 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', access_token);
      }).catch((error) => {
        console.error('Error exchanging authorization code for access token:', error);
      });
    }
  };

  useEffect(() => {
    handleRedirect();
  }, []);

  return (
    <div className="container-fluid">
      <div>
        <h1>Let's connect to a Git Repository</h1>
        <p>StrapiGEN automatically pushes the generated code of your service to a git repository.</p>
        <div className="github-container">
          <div className="github-content">
            <div className="github-icon">
              <RiGithubFill size={50} color="#f9f9f9" />
            </div>
            <div className="github-text">
              GitHub
            </div>
            <button className="connect-button" onClick={handleConnectButtonClick}>
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