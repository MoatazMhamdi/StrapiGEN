import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { faTrash, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaDatabase } from 'react-icons/fa';
import axios from 'axios';

const ContentTypeList = () => {
  const [contentTypeList, setContentTypeList] = useState([]);
  const location = useLocation();

  const fetchContentTypes = async () => {
    try {
     // const response = await axios.get('/api/content-type-builder/content-types/plugin::strapi-gen.blog');
      const response = await axios.get('/api/content-type-builder/content-types/api::task.task');
     // const response = await axios.get('/api/content-type-builder/content-types');


      setContentTypeList([response.data.data]); 
    } catch (error) {
      console.error('Error fetching content types:', error);
    }
  };

  useEffect(() => {
    fetchContentTypes();
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div className="logo-container">
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
              {/* Corrected link for consistency: */}
              <Link to="/plugins/strapi-gen/ManageEntities">Entities</Link>
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
      <main>
        <div className="search-bar">
          <button className="filter-button" style={{ marginLeft: 10 }}>
            <FontAwesomeIcon icon={faFilter} style={{ color: 'white' }} />
          </button>
        </div>
        <div className="content">
          <h2 style={{ color: 'white' }}>Entities</h2>
          <ul className="entities">
            {contentTypeList.map((contentType) => (
              <li key={contentType.uid} className="entity-item">
                <div className="entity-details">
                  <FaDatabase className="entity-icon" style={{ color: 'white' }} />
                  <div className="entity-info" style={{ color: 'white' }}>
                    <div className="entity-name">{contentType.schema.displayName}</div>
                    <div className="entity-property">Kind: {contentType.schema.kind}</div>
                    <div className="entity-property">Plural Name: {contentType.schema.pluralName}</div>
                    <div className="entity-property">Description: {contentType.schema.description}</div>
                    <div className="entity-property">Attributes:</div>
                    <ul className="entity-attributes">
                      {Object.entries(contentType.schema.attributes).map(([name, attribute]) => (
                        <li key={name} style={{ color: 'white' }}>
                          <strong>{name}</strong>: {attribute.type}
                        </li>
                      ))}
                    </ul>
                    {/* Autres propriétés à afficher */}
                  </div>
                </div>
                <button className="delete-button">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default ContentTypeList;