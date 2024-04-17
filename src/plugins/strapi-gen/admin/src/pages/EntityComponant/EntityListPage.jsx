
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FaDatabase } from 'react-icons/fa';
import axios from 'axios';
import './EntitiesListPage.css';

const ContentTypeList = () => {
  const [contentTypeList, setContentTypeList] = useState([]);
  const location = useLocation();

  const fetchContentTypes = async () => {
    try {
      const response = await axios.get('/api/content-type-builder/content-types');
      if (response.data && Array.isArray(response.data.data)) {
        const modifiedData = response.data.data.map(contentType => ({
          uid: contentType.uid,
          plugin: contentType.plugin,
          apiID: contentType.apiID,
          schema: {
            displayName: contentType.schema.displayName,
            kind: contentType.schema.kind,
            pluralName: contentType.schema.pluralName,
            description: contentType.schema.description,
          }
        }));
        setContentTypeList(modifiedData);
      } else {
        console.error('Erreur: Le format de la réponse est inattendu:', response.data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des types de contenu:', error);
    }
  };

  useEffect(() => {
    fetchContentTypes();
  }, []);

  const filteredContentTypes = contentTypeList.filter(
    contentType => ![ 'upload', 'content-releases', 'i18n', 'users-permissions'].includes(contentType.plugin) && 
    !['role', 'api-token', 'permission', 'api-token-permission','transfer-token','transfer-token-permission'].includes(contentType.apiID)
  );

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
            <li className={`menu-item ${location.pathname === '/plugins/strapi-gen/ModelPage' ? 'selected' : ''}`}>
              <Link to="/plugins/strapi-gen/ModelPage">Modules</Link>
            </li>
            <li className={`menu-item ${location.pathname === '/plugins/strapi-gen/Entities' ? 'selected' : ''}`}>
              <Link to="/plugins/strapi-gen/Entities">Entities</Link>
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
      <main className="main-content">
        <div className="toolbar">
          <button className="filter-button">
            <FontAwesomeIcon icon={faFilter} />
          </button>
        </div>
        <div className="content">
          <ul className="entities">
            {filteredContentTypes.map((contentType, index) => (
              <li key={index} className="entity-item">
                <FaDatabase className="entity-icon" />
                <Link to={`/plugins/strapi-gen/entities/${contentType.uid}`}>
                  <span className="entity-name">{contentType.schema.displayName}</span>
                </Link>

                {/* <button className="delete-button">
                  <FontAwesomeIcon icon={faTrash} />
                </button> */}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
};

export default ContentTypeList;
