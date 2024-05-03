import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { FaDatabase } from 'react-icons/fa';
import axios from 'axios';
import * as go from 'gojs';
import './EntitiesListPage.css';

const ContentTypeList = () => {
  const [contentTypeList, setContentTypeList] = useState([]);
  const [showDiagram, setShowDiagram] = useState(false);
  const diagramRef = useRef(null);

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

  const filteredContentTypes = contentTypeList.filter(
    contentType => ![ 'upload', 'content-releases', 'i18n', 'users-permissions'].includes(contentType.plugin) && 
    !['role', 'api-token', 'permission', 'api-token-permission', 'transfer-token', 'transfer-token-permission'].includes(contentType.apiID)
  );

  const initDiagram = () => {
    const $ = go.GraphObject.make;
    const diagram = $(go.Diagram, diagramRef.current, {
      "undoManager.isEnabled": true,
      layout: $(go.TreeLayout, { angle: 90, layerSpacing: 35 }),
      "initialContentAlignment": go.Spot.Center
    });

    diagram.nodeTemplate =
      $(go.Node, "Auto",
        $(go.Shape, "RoundedRectangle", { strokeWidth: 0, fill: "#212134" }),
        $(go.Panel, "Vertical",
          $(go.TextBlock, { margin: 10 , stroke: "white"},
            new go.Binding("text", "name")),
          $(go.Panel, "Vertical",
            { margin: 10 },
            new go.Binding("itemArray", "attributes"),
            {
              itemTemplate:
                $(go.Panel,
                  $(go.TextBlock, { margin: 4, stroke: "white" },
                    new go.Binding("text", "", attr => `${attr.name}: ${attr.type}${attr.required ? ' (required)' : ''}`))              )
            }
          )
        )
      );

    diagram.linkTemplate =
    $(go.Link,
      { routing: go.Link.Orthogonal, corner: 5 },
      $(go.Shape, { strokeWidth: 2, stroke: "white" }),
      $(go.Shape, { toArrow: "Standard", stroke: null, fill: "white" })
    );

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
      []
    );

    diagram.model = model;
  };

  const toggleView = () => {
    setShowDiagram(!showDiagram);
  };

  return (
    <div>
    {/* <header className="header">
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
              state: { selectedRepo: selectedRepo } // Pass the selectedRepo as state
            }}>Service</Link>
          </li>

            <li className={`menu-item ${location.pathname === '/plugins/strapi-gen/faq_section' ? 'selected' : ''}`}>
              <Link to="/plugins/strapi-gen/faq_section">FAQ</Link>
            </li>
          </ul>
        </nav>
      </header> */}
    <div className="docker-file-generator-container">
      
      <div className="docker-file-generator-content">
      <img  alt="StrapiGEN" className="strapigen-image" style={{ marginBottom: '-60px' }} />
      <p>Display of your entities list, display of class diagram and relation between your entities and visualise all you needs !</p>
        <main className="main-content">
          <div className="toolbar">
            <button className="filter-button" onClick={toggleView}>

              <FontAwesomeIcon icon={showDiagram ? faToggleOff : faToggleOn} />
              Change Display of entities
            </button>
          </div>
          <div className="content">
            {showDiagram ? (
              <div ref={diagramRef} style={{ width: '1000px', height: '400px', backgroundColor: '#DAE4E4' }}></div>
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