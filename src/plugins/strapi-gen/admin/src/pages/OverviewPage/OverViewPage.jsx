import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import './OverViewPage.css';
import { FaDocker } from 'react-icons/fa';
import { FaProjectDiagram } from 'react-icons/fa';
import { FiBox } from 'react-icons/fi';
import { FaDatabase } from 'react-icons/fa';
import Telechargement from '../Telechargement/Telechargement';

const OverViewPage = () => {
  const location = useLocation();
  const history = useHistory();
  const [content, setContent] = useState('');

  useEffect(() => {
    setContent(document.documentElement.outerHTML);
  }, []);

  const selectedRepo = location.state ? location.state.selectedRepo : null;

  const handleGenerateService = () => {
    history.push('/plugins/strapi-gen/ServiceGenerate');
  };

  return (
    <div>
      <header className="header">
        <div className="logo-container">
          <h1 className="header-title" style={{ color: '#029d89' }}>
            <strong>StrapiGen Plugin </strong>
            <span className="weak">Dashboard</span>
          </h1>
        </div>
        <Telechargement content={content} />
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
            <li className={`menu-item ${location.pathname === '/plugins/strapi-gen/settings' ? 'selected' : ''}`}>
              <Link
                to={{
                  pathname: '/plugins/strapi-gen/settings',
                  state: { selectedRepo: selectedRepo },
                }}
              >
                Settings
              </Link>
            </li>
            <li className={`menu-item ${location.pathname === '/plugins/strapi-gen/settings' ? 'selected' : ''}`}>
              <Link
                to={{
                  pathname: '/plugins/strapi-gen/ServiceGenerate',
                  state: { selectedRepo: selectedRepo },
                }}
              >
                motaz
              </Link>
            </li>
            <li className={`menu-item ${location.pathname === '/plugins/strapi-gen/faq_section' ? 'selected' : ''}`}>
              <Link to="/plugins/strapi-gen/faq_section">FAQ</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="box-container">
        <div
          className="github-box"
          style={{ backgroundColor: '#212134', padding: '30px', borderRadius: '20px', border: '2px solid rgba(255, 255, 255, 0.7)' }}
        >
          <div className="box-header" style={{ paddingBottom: '30px', paddingTop: '30px' }}>
            <FaDatabase className="github-icon" style={{ color: '#029d89', marginBottom: '30px', marginTop: '30px' }} />
            <h2 style={{ color: '#fff' }}>Entities</h2>
            <p style={{ color: '#fff' }}>Declare the data models for your application</p>
          </div>
          <button className="connect-button" onClick={handleGenerateService} style={{ color: '#fff' }}>
            Build
          </button>
        </div>
        <div
          className="github-box"
          style={{ backgroundColor: '#212134', padding: '30px', borderRadius: '20px', border: '2px solid rgba(255, 255, 255, 0.7)' }}
        >
          <div className="box-header" style={{ paddingBottom: '30px', paddingTop: '30px' }}>
            <FiBox className="github-icon" style={{ color: '#029d89', marginBottom: '30px', marginTop: '30px' }} />
            <h2 style={{ color: '#fff' }}>Entities</h2>
            <p style={{ color: '#fff' }}>Declare the data models for your application</p>
          </div>
          <button className="connect-button" onClick = {handleGenerateService} style={{ color: '#fff' }}>Build</button>
        </div>
        <div className="github-box" style={{ backgroundColor: '#212134', padding: '30px', borderRadius: '20px', border: '2px solid rgba(255, 255, 255, 0.7)' }}>
          <div className="box-header" style={{ paddingBottom: '30px', paddingTop: '30px' }}>
            <FiBox className="github-icon" style={{ color: '#029d89', marginBottom: '30px', marginTop: '30px' }} />
            <h2 style={{ color: '#fff' }}>Services</h2>
            <p style={{ color: '#fff' }}>Build your Services for your application</p>
          </div>
          <button className="connect-button" style={{ color: '#fff' }}>Build</button>
        </div>
        <div className="github-box" style={{ backgroundColor: '#212134', padding: '30px', borderRadius: '20px', border: '2px solid rgba(255, 255, 255, 0.7)' }}>
          <div className="box-header" style={{ paddingBottom: '30px', paddingTop: '30px' }}>
            <FaProjectDiagram className="github-icon" style={{ color: '#029d89', marginBottom: '30px', marginTop: '30px' }} />
            <h2 style={{ color: '#fff' }}>Data Models</h2>
            <p style={{ color: '#fff' }}>Visualize your Data Models and manipulate them as you want</p>
          </div>
          <button className="connect-button" style={{ color: '#fff' }}>Visualize</button>
        </div>
        <div className="github-box" style={{ backgroundColor: '#212134', padding: '30px', borderRadius: '20px', border: '2px solid rgba(255, 255, 255, 0.7)' }}>
          <div className="box-header" style={{ paddingBottom: '30px', paddingTop: '30px' }}>
            <FaDocker className="github-icon" style={{ color: '#029d89', marginBottom: '30px', marginTop: '30px' }} />
            <h2 style={{ color: '#fff' }}>Docker File</h2>
            <p style={{ color: '#fff' }}>Generate your Docker file and Docker-composer.</p>
          </div>
          <button className="connect-button" style={{ color: '#fff' }}>Generate</button>
        </div>
      </div>
    </div>
  );
};

export default OverViewPage;