import React, { useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import './OverViewPage.css';
import { FaDocker } from "react-icons/fa";
import { FaReply } from "react-icons/fa";
import { FaProjectDiagram } from "react-icons/fa";
import { FiBox } from "react-icons/fi";
import { FaDatabase, } from "react-icons/fa";
import { AiOutlineEdit } from 'react-icons/ai';
import { FaCommentAlt } from "react-icons/fa"; 
//import strapigenImage from './logoStrapiGen.png';

const OverViewPage = () => {
  const location = useLocation();
  const history = useHistory();

  const selectedRepo = location.state ? location.state.selectedRepo : null;
  const tokenGitOauth = location.state ? location.state.tokenGitOauth : null; // Access tokenGitOauth from location state


  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // State for dark mode

  const toggleSettingsMenu = () => {
    setShowSettingsMenu(!showSettingsMenu);
  };

  
  

  
  const handleEntityList = () => {
    history.push('/plugins/strapi-gen/Entities');
  };

 const handleGenerateService = () => {
  history.push('/plugins/strapi-gen/ServiceGenerate');
};
const handleCreateButtonClick = () => {
  history.push({
    pathname: '/plugins/strapi-gen/Chatbot',
   
  });
};
  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // Toggle dark mode state
  };
  console.log('repo is overview :',selectedRepo)
  console.log('gittoken :',tokenGitOauth)


  return (
    <div> {/* Apply dark mode class if dark mode is enabled */}
      <header className="header">
        <div className="logo-container">
          <h3 className="header-title" style={{ color:'#029d89'}}><strong>StrapiGen Plugin </strong><span className="weak">Dashboard</span></h3>
        </div>
        <nav className="nav">
          <ul className="menu">
            <li className={`menu-item ${location.pathname === '/overview' ? 'selected' : ''}`}>
              <Link to="/overview">Overview</Link>
            </li>
            <li className={`menu-item ${location.pathname === '/modules' ? 'selected' : ''}`}>
              <Link to="/modules">Modules</Link>
            </li>
            <li className={`menu-item ${location.pathname === '/entities' ? 'selected' : ''}`}>
              <Link to="/plugins/strapi-gen/Entities">Entities</Link>
            </li>
            <li className={`menu-item ${location.pathname === '/data-model' ? 'selected' : ''}`}>
              <Link to="/data-model">Data Model</Link>
            </li>
            <li className={`menu-item ${location.pathname === '/plugins/strapi-gen/DockerConfigForm' ? 'selected' : ''}`}>
            <Link to={{
              pathname: '/plugins/strapi-gen/DockerConfigForm',
              state: { selectedRepo: selectedRepo ,
              tokenGitOauth: tokenGitOauth} // Pass the selectedRepo as state
            }}>Settings</Link>            </li>
            <li className={`menu-item ${location.pathname === '/plugins/strapi-gen/settings' ? 'selected' : ''}`}>
            <Link to={{
              pathname: '/plugins/strapi-gen/settings',
              state: { selectedRepo: selectedRepo ,
              tokenGitOauth: tokenGitOauth} // Pass the selectedRepo as state
            }}>Settings</Link>
          </li>
          <li className={`menu-item ${location.pathname === '/plugins/strapi-gen/ServiceGenerate' ? 'selected' : ''}`}>
            <Link to={{
              pathname: '/plugins/strapi-gen/ServiceGenerate',
              state: { selectedRepo: selectedRepo ,
                tokenGitOauth: tokenGitOauth} // Pass the selectedRepo as state
            }}>Service</Link>
          </li>

            <li className={`menu-item ${location.pathname === '/plugins/strapi-gen/faq_section' ? 'selected' : ''}`}>
              <Link to="/plugins/strapi-gen/faq_section">FAQ</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="box-container">
        <div className="github-box" style={{ backgroundColor: '#212134', padding: '30px', borderRadius: '20px', border: '2px solid rgba(255, 255, 255, 0.7)' }}>
          <div className="box-header" style={{ paddingBottom: '30px', paddingTop: '30px' }}>
            <FaDatabase className="github-icon" style={{ color: '#029d89', marginBottom: '30px', marginTop: '30px', marginLeft: '120px' }} />
            <h2 style={{ color: '#fff' }}>Entities</h2>
            <p style={{ color: '#fff' }}>Declare the data models for your application</p>
          </div>
          <button className="connect-button" onClick = {handleEntityList} style={{ color: '#fff' }}>Build</button>
        </div>
        <div className="github-box" style={{ backgroundColor: '#212134', padding: '30px', borderRadius: '20px', border: '2px solid rgba(255, 255, 255, 0.7)' }}>
          <div className="box-header" style={{ paddingBottom: '30px', paddingTop: '30px' }}>
            <FiBox className="github-icon" style={{ color: '#029d89', marginBottom: '30px', marginTop: '30px', marginLeft: '120px' }} />
            <h2 style={{ color: '#fff' }}>Services</h2>
            <p style={{ color: '#fff' }}>Build your Web Services for your application</p>
          </div>
          <button className="connect-button" onClick = {handleGenerateService} style={{ color: '#fff' }}>Build</button>
        </div>
        <div className="github-box" style={{ backgroundColor: '#212134', padding: '30px', borderRadius: '20px', border: '2px solid rgba(255, 255, 255, 0.7)' }}>
          <div className="box-header" style={{ paddingBottom: '30px', paddingTop: '30px' }}>
            <FaProjectDiagram className="github-icon" style={{ color: '#029d89', marginBottom: '30px', marginTop: '30px', marginLeft: '120px' }} />
            <h2 style={{ color: '#fff' }}>Data Models</h2>
            <p style={{ color: '#fff' }}>Visualize your Data Models and manipulate them as you want</p>
          </div>
          <button className="connect-button" style={{ color: '#fff' }}>Visualize</button>
        </div>
        <div className="github-box" style={{ backgroundColor: '#212134', padding: '30px', borderRadius: '20px', border: '2px solid rgba(255, 255, 255, 0.7)' }}>
          <div className="box-header" style={{ paddingBottom: '30px', paddingTop: '30px' }}>
            <FaDocker className="github-icon" style={{ color: '#029d89', marginBottom: '30px', marginTop: '30px', marginLeft: '120px' }} />
            <h2 style={{ color: '#fff' }}>Dockerize</h2>
            <p style={{ color: '#fff' }}>Generate your Docker file and Docker-composer.</p>
          </div>
          <button className="connect-button" style={{ color: '#fff' }}>Generate</button>
        </div>
        <div className="github-box" style={{ backgroundColor: '#212134', padding: '30px', borderRadius: '20px', border: '2px solid rgba(255, 255, 255, 0.7)' }}>
          <div className="box-header" style={{ paddingBottom: '30px', paddingTop: '30px' }}>
            <FaReply className="github-icon" style={{ color: '#029d89', marginBottom: '30px', marginTop: '30px', marginLeft: '120px' }} />
            <h2 style={{ color: '#fff' }}>Deployement</h2>
            <p style={{ color: '#fff' }}>Deploy your web Server using render.com </p>
          </div>
          <button className="connect-button" style={{ color: '#fff' }}>Deploy</button>
          
        </div>
        <div
          className="github-box"
          style={{
            backgroundColor: '#212134',
            padding: '30px',
            borderRadius: '20px',
            border: '2px solid rgba(255, 255, 255, 0.7)',
          }}
        >
          <div className="box-header" style={{ paddingBottom: '30px', paddingTop: '30px' }}>
  <FaCommentAlt className="github-icon" style={{ color: '#029d89', marginBottom: '30px', marginTop: '30px', marginLeft: '120px' }} />
  <h2 style={{ color: '#fff' }}>chatbot</h2>
  <p style={{ color: '#fff' }}>Your customized helper</p>
</div>
<button className="connect-button" style={{ color: '#fff' }} onClick={handleCreateButtonClick}>Create</button>
      </div>
    </div>
    </div>
  );
};

export default OverViewPage;