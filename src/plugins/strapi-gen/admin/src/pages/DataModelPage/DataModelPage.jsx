import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faFilter } from '@fortawesome/free-solid-svg-icons';
import { FaDatabase } from 'react-icons/fa';
import axios from 'axios';
import './DataModelPage.css';

const ContentTypeList = () => {
  const [contentTypeList, setContentTypeList] = useState([]);
  const [dataDiagramList, setDataDiagramList] = useState([]);
  const location = useLocation();

  const fetchData = async () => {
    try {
      const contentTypeResponse = await axios.get('/api/content-type-builder/content-types');
      if (contentTypeResponse.data && Array.isArray(contentTypeResponse.data.data)) {
        const modifiedContentTypeData = contentTypeResponse.data.data.map(contentType => ({
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
        setContentTypeList(modifiedContentTypeData);
      } else {
        console.error('Error: Unexpected response format for content types:', contentTypeResponse.data);
      }
  
      // Fetch data diagrams
      const dataDiagramResponse = await axios.get('/strapi-gen/class-diagram');
      if (dataDiagramResponse.data && Array.isArray(dataDiagramResponse.data)) {
        setDataDiagramList(dataDiagramResponse.data);
      } else {
        console.error('Error: Unexpected response format for data diagrams:', dataDiagramResponse.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredContentTypes = contentTypeList.filter(
    contentType => !['admin', 'upload', 'content-releases', 'i18n', 'users-permissions'].includes(contentType.plugin)
  );

  // Sample rendering function for class diagram
  const renderClassDiagram = (dataDiagramList) => {
    return (
      <ul className="class-diagram">
        {dataDiagramList.map((classData, index) => (
          <li key={index} className="class">
            <div className="class-name">{classData.name}</div>
            <div className="class-properties">
              <ul>
                {classData.properties.map((property, i) => (
                  <li key={i}>{property}</li>
                ))}
              </ul>
            </div>
            <div className="class-methods">
              <ul>
                {classData.methods.map((method, i) => (
                  <li key={i}>{method}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="app">
      <header className="header">
        {/* Header code */}
      </header>
      <main className="main-content">
        <div className="toolbar">
          <button className="filter-button">
            <FontAwesomeIcon icon={faFilter} />
          </button>
        </div>
        <div className="content">
          <div className="entity-list">
            <ul className="entities">
              {filteredContentTypes.map((contentType, index) => (
                <li key={index} className="entity-item">
                  <FaDatabase className="entity-icon" />
                  <span className="entity-name">{contentType.schema.displayName}</span>
                  <button className="delete-button">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="class-diagram-container">
            {renderClassDiagram(dataDiagramList)}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContentTypeList;
