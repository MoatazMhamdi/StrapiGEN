// OverViewPage.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './OverViewPage.css'; // Make sure to import your CSS file
import { FaDocker } from "react-icons/fa";
import { FaProjectDiagram } from "react-icons/fa";
import { FiBox } from "react-icons/fi";
import { FaDatabase } from "react-icons/fa";
import strapigenImage from './logoStrapiGen.png'; // Import the image


const OverViewPage = () => {
  const location = useLocation();

  return (
    <div>
      <header className="header">
        <div className="logo-container">
        {/* <img src={strapigenImage} alt="StrapiGEN" className="strapigen-image" /> Image */}

          <h1 className="header-title">StrapiGen Plugin</h1>
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
            <li className={`menu-item ${location.pathname === '/docker-files' ? 'selected' : ''}`}>
              <Link to="/docker-files">Docker Files</Link>
            </li>
            <li className={`menu-item ${location.pathname === '/sync-with-git' ? 'selected' : ''}`}>
              <Link to="/sync-with-git">Sync with Git</Link>
            </li>
            <li className={`menu-item ${location.pathname === '/settings' ? 'selected' : ''}`}>
              <Link to="/settings">Settings</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="box-container">
        <div className="github-box">
          <div className="box-header">
          <FaDatabase className="github-icon" /> {/* Icon */}
            <h2>Entities</h2>
            <p>Declare the data models for your application</p>
          </div>
          <button className="connect-button">Build</button>
        </div>
      </div>
      <div className="box-container">
        <div className="github-box">
          <div className="box-header">
          <FiBox className="github-icon" /> {/* Icon */}

            <h2>Services</h2>
            <p>Build your Services for your application</p>
          </div>
          <button className="connect-button">Build</button>
        </div>
      </div>
      <div className="box-container">
        <div className="github-box">
          <div className="box-header">
          <FaProjectDiagram className="github-icon" /> {/* Icon */}

            <h2>Data Models</h2>
            <p>Visulize your Data Models and manipulate it as you want</p>
          </div>
          <button className="connect-button">Visulize</button>
        </div>
      </div>
      <div className="box-container">
        <div className="github-box">
          <div className="box-header">
          <FaDocker className="github-icon" /> {/* Icon */}

            <h2>Docker File</h2>
            <p>Generate your Docker file and Docker-composer.</p>
          </div>
          <button className="connect-button">Generate</button>
        </div>
      </div>
    </div>
  );
};

export default OverViewPage;
