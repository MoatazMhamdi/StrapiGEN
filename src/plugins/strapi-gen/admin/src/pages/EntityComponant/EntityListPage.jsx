import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff, faSearchMinus, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import { FaDatabase } from 'react-icons/fa';
import axios from 'axios';
import * as go from 'gojs';
import './EntitiesListPage.css';

const ContentTypeList = () => {
  const [contentTypeList, setContentTypeList] = useState([]);
  const [showDiagram, setShowDiagram] = useState(false);
  const [diagramScale, setDiagramScale] = useState(1);
  const diagramRef = useRef(null);
  const location = useLocation();
  const selectedRepo = location.state ? location.state.selectedRepo : null;
  const tokenGitOauth = location.state ? location.state.tokenGitOauth : null; // Access tokenGitOauth from location state



  useEffect(() => {
    axios.get('/api/content-type-builder/content-types')
      .then(response => {
        setContentTypeList(response.data.data);
      })
      .catch(error => console.error('Erreur lors de la récupération:', error));
  }, []);

  useEffect(() => {
    if (showDiagram && contentTypeList.length > 0) {
      initDiagram();
    }
  }, [showDiagram, contentTypeList]);

  useEffect(() => {
    if (showDiagram && diagramRef.current) {
      diagramRef.current.scale = diagramScale;
    }
  }, [showDiagram, diagramScale]);

  const filteredContentTypes = contentTypeList.filter(
    contentType => !['upload', 'content-releases', 'i18n', 'users-permissions'].includes(contentType.plugin) &&
      !['role', 'api-token', 'permission', 'api-token-permission', 'transfer-token', 'transfer-token-permission'].includes(contentType.apiID)
  );

  const initDiagram = () => {
    const $ = go.GraphObject.make;
    const diagram = $(go.Diagram, diagramRef.current, {
      "undoManager.isEnabled": true,
      layout: $(go.TreeLayout, { angle: 90, layerSpacing: 35 }),
      "initialContentAlignment": go.Spot.Center,
      scale: diagramScale // Set initial scale
    });

    diagramRef.current = diagram; 
    // Définition du template pour les noeuds
    diagram.nodeTemplate =
      $(go.Node, "Auto",
        $(go.Shape, "RoundedRectangle", { strokeWidth: 0, fill: "DAE4E4" }),
        $(go.Panel, "Vertical",
          $(go.TextBlock, { margin: 10, stroke: "white" },
            new go.Binding("text", "name")),
          $(go.Panel, "Vertical",
            { margin: 10 },
            new go.Binding("itemArray", "attributes"),
            {
              itemTemplate:
                $(go.Panel,
                  $(go.TextBlock, { margin: 4, stroke: "white" },
                    new go.Binding("text", "", attr => `${attr.name}: ${attr.type}${attr.required ? ' (required)' : ''}`))
                )
            }
          )
        )
      );

    // Définition du template pour les liens
    diagram.linkTemplate =
      $(go.Link,
        { routing: go.Link.Orthogonal, corner: 5 },
        $(go.Shape, { strokeWidth: 2, stroke: "black" }),
        $(go.Shape, { toArrow: "Standard", stroke: null, fill: "black" })
      );

    // Extraire les relations
    const relationships = [];
    filteredContentTypes.forEach(type => {
      Object.entries(type.schema.attributes).forEach(([key, attribute]) => {
        if (attribute.type === 'relation') {
          relationships.push({
            from: type.uid,
            to: attribute.target,
            text: attribute.relationType
          });
        }
      });
    });

    // Construction du modèle de données pour le diagramme
    const model = new go.GraphLinksModel(
      filteredContentTypes.map(type => ({
        key: type.uid,
        name: type.schema.displayName,
        attributes: Object.entries(type.schema.attributes).map(([key, value]) => ({
          name: key,
          type: value.type,
          required: value.required || false
        }))
      })),
      relationships
    );


    diagram.model = model;
  };

  const zoomIn = () => {
    setDiagramScale(prevScale => Math.min(prevScale + 0.1, 3));
  };
  
  const zoomOut = () => {
    setDiagramScale(prevScale => Math.max(prevScale - 0.1, 0.1));
  };


  const toggleView = () => {
    setShowDiagram(!showDiagram);
  };

  return (
    <div>
      <header className="header">
        <div className="logo-container">
          <h3 className="header-title" style={{ color: '#029d89' }}><strong>StrapiGen Plugin </strong><span className="weak">Dashboard</span></h3>
        </div>
        <nav className="nav">
          <ul className="menu">
            <li className={`menu-item ${location.pathname === '/overview' ? 'selected' : ''}`}>
              <Link to="/plugins/strapi-gen/Overview">Overview</Link>
            </li>
            <li className={`menu-item ${location.pathname === '/entities' ? 'selected' : ''}`}>
              <Link to="/plugins/strapi-gen/Entities">Entities</Link>
            </li>
            <li className={`menu-item ${location.pathname === '/plugins/strapi-gen/ServiceGenerate' ? 'selected' : ''}`}>
              <Link to={{
                pathname: '/plugins/strapi-gen/ServiceGenerate',
                state: { selectedRepo: selectedRepo } // Pass the selectedRepo as state
              }}>Service</Link>
            </li>
            <li className={`menu-item ${location.pathname === '/plugins/strapi-gen/DockerConfigForm' ? 'selected' : ''}`}>
              <Link to={{
                pathname: '/plugins/strapi-gen/DockerConfigForm',
                state: {
                  selectedRepo: selectedRepo,
                  tokenGitOauth: tokenGitOauth
                } // Pass the selectedRepo as state
              }}>Settings</Link>
            </li>
            <li className={`menu-item ${location.pathname === '/plugins/strapi-gen/settings' ? 'selected' : ''}`}>
              <Link to={{
                pathname: '/plugins/strapi-gen/settings',
                state: {
                  selectedRepo: selectedRepo,
                  tokenGitOauth: tokenGitOauth
                } // Pass the selectedRepo as state
              }}>Settings</Link>
            </li>
            <li className={`menu-item ${location.pathname === '/plugins/strapi-gen/faq_section' ? 'selected' : ''}`}>
              <Link to="/plugins/strapi-gen/faq_section">FAQ</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="docker-file-generator-container">
        <div className="docker-file-generator-content">
          <p>Display of your entities list, display of class diagram and relation between your entities and visualize all your needs!</p>
          <main className="main-content">
            <div className="toolbar">
              <button className="filter-button" onClick={toggleView}>
                <FontAwesomeIcon icon={showDiagram ? faToggleOff : faToggleOn} />
                Change Display of entities
              </button>
            </div>
            <div className="content">
              {showDiagram && (
                <div className="zoom-buttons" style={{ position: 'relative', zIndex: 9999 }}> {/* Add styles to force buttons to be clickable */}
                  <button className="zoom-button" onClick={zoomIn}>
                    <FontAwesomeIcon icon={faSearchPlus} />
                  </button>
                  <button className="zoom-button" onClick={zoomOut}>
                    <FontAwesomeIcon icon={faSearchMinus} />
                  </button>
                </div>
              )}
              {showDiagram ? (
                <div ref={diagramRef} style={{ width: '1000px', height: '400px' }}></div>
              ) : (
                <ul className="entities">
                  {filteredContentTypes.map((contentType, index) => (
                    <li key={index} className="entity-item">
                      <FaDatabase className="entity-icon" />
                      <Link to={`/plugins/strapi-gen/entities/${contentType.uid}`}>
                        <span className="entity-name">{contentType.schema.displayName}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ContentTypeList;



