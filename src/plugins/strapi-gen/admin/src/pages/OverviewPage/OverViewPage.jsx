import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './OverViewPage.css';
import { FaDocker } from "react-icons/fa";
import { FaProjectDiagram } from "react-icons/fa";
import { FiBox } from "react-icons/fi";
import { FaDatabase } from "react-icons/fa";
import strapigenImage from './logoStrapiGen.png';

const OverViewPage = () => {
  const location = useLocation();
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // State for dark mode

  const toggleSettingsMenu = () => {
    setShowSettingsMenu(!showSettingsMenu);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode); // Toggle dark mode state
  };

  return (
    <div className={darkMode ? 'dark-mode' : ''}> {/* Apply dark mode class if dark mode is enabled */}
      <header className="header">
        <div className="logo-container">
          <h1 className="header-title" style={{ color:'#029d89'}}><strong>StrapiGen Plugin </strong><span>Dashboard</span></h1>
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
              <Link to="/entities">Entities</Link>
            </li>
            <li className={`menu-item ${location.pathname === '/data-model' ? 'selected' : ''}`}>
              <Link to="/data-model">Data Model</Link>
            </li>
            <li className={`menu-item ${location.pathname === '/plugins/strapi-gen/DockerConfigForm' ? 'selected' : ''}`}>
              <Link to="/plugins/strapi-gen/DockerConfigForm">Docker Files</Link>
            </li>
            <li className={`menu-item settings ${location.pathname === '/settings' || showSettingsMenu ? 'selected' : ''}`}>
              <div onClick={toggleSettingsMenu}>Settings</div>
              {showSettingsMenu && (
                <ul className="settings-menu">
                  <li>
                    <Link to="/settings">dark mode </Link>
                  </li>
                  <li>
                    <Link to="/settings">change git repo</Link>
                  </li>
                </ul>
              )}
            </li>


            <li className={`menu-item ${location.pathname === '/plugins/strapi-gen/faq_section' ? 'selected' : ''}`}>
              <Link to="/plugins/strapi-gen/faq_section">FAQ</Link>
            </li>
           
          </ul>
        </nav>
      </header>
      <div className="box-container">
        <div className="github-box">
          <div className="box-header">
            <FaDatabase className="github-icon" />
            <h2>Entities</h2>
            <p>Declare the data models for your application</p>
          </div>
          <button className="connect-button">Build</button>
        </div>
      </div>
      <div className="box-container">
        <div className="github-box">
          <div className="box-header">
            <FiBox className="github-icon" />
            <h2>Services</h2>
            <p>Build your Services for your application</p>
          </div>
          <button className="connect-button">Build</button>
        </div>
      </div>
      <div className="box-container">
        <div className="github-box">
          <div className="box-header">
            <FaProjectDiagram className="github-icon" />
            <h2>Data Models</h2>
            <p>Visualize your Data Models and manipulate them as you want</p>
          </div>
          <button className="connect-button">Visualize</button>
        </div>
      </div>
      <div className="box-container">
        <div className="github-box">
          <div className="box-header">
            <FaDocker className="github-icon" />
            <h2>Docker File</h2>
            <p>Generate your Docker file and Docker-composer.</p>
          </div>
          <button className="connect-button">Generate</button>
        </div>
      </div>
      <div className="toggle-dark-mode"> {/* Toggle dark mode button */}
        <button onClick={toggleDarkMode}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
      </div>
    </div>
  );
};

export default OverViewPage;
