import React, { useState, useEffect } from 'react';
import { Link,useParams } from 'react-router-dom';
import { faTrash, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { FaDatabase } from 'react-icons/fa';
import './EntityDetailsPage.css'; 

const EntityDetailsPage = () => {
  const { uid } = useParams(); // Récupère l'uid depuis l'URL
  const [contentType, setContentType] = useState(null);

  const fetchContentTypeDetails = async () => {
    try {
      const response = await axios.get(`/api/content-type-builder/content-types/${uid}`);

      if (response.data && response.data.data) {
        setContentType(response.data.data);
      } else {
        console.error('Erreur: Le format de la réponse est inattendu:', response.data);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du type de contenu:', error);
    }
  };

  useEffect(() => {
    fetchContentTypeDetails();
  }, [uid]);

  if (!contentType) {
    return <div>Loading...</div>;
  }

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
            <li className={`menu-item ${location.pathname === '/plugins/strapi-gen/Entities' ? 'selected' : ''}`}>
              {/* Corrected link for consistency: */}
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
      <main>
        <div className="search-bar">
          <button className="filter-button" style={{ marginLeft: 10 }}>
            <FontAwesomeIcon icon={faFilter} style={{ color: 'white' }} />
          </button>
        </div>
        <div className="content">
          <h2 style={{ color: 'white' }}>Entities</h2>
          <ul className="entities">
             (
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
                {/* <button className="delete-button">
                  <FontAwesomeIcon icon={faTrash} />
                </button> */}
              </li>
            )
          </ul>
        </div>
      </main>
    </div>
  );
};

export default EntityDetailsPage;
