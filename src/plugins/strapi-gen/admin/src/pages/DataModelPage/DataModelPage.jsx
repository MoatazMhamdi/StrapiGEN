import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaDatabase } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import './DataModelPage.css';

const ContentTypeList = () => {
  const [contentTypeList, setContentTypeList] = useState([]);
  const { uid } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

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
            attributes: contentType.schema.attributes 
          }
        }));
        setContentTypeList(modifiedContentTypeData);
      } else {
        console.error('Error: Unexpected response format for content types:', contentTypeResponse.data);
      }
    } catch (error) {
      console.error('Error fetching content types:', error);
    }
  };

  const drawRelationshipLines = () => {
    const relationshipData = [];
    
    // Generate relationship data based on fetched content types
    for (let i = 0; i < contentTypeList.length; i++) {
      const contentType1 = contentTypeList[i];
      for (let j = i + 1; j < contentTypeList.length; j++) {
        const contentType2 = contentTypeList[j];
        relationshipData.push({ from: contentType1.schema.displayName, to: contentType2.schema.displayName });
      }
    }
  
    return (
      <div className="relationship-lines">
        {relationshipData.map((relationship, index) => (
          <div key={index} className="relationship-line">
            <div className={`entity-table-${relationship.from.toLowerCase()}`}>{relationship.from}</div>
            <div className="arrow"></div>
            <div className={`entity-table-${relationship.to.toLowerCase()}`}>{relationship.to}</div>
          </div>
        ))}
      </div>
    );
  };
  
  
  
  

  const filteredContentTypes = contentTypeList.filter(
    contentType => !['upload', 'content-releases', 'i18n', 'users-permissions'].includes(contentType.plugin) &&
                   !['role', 'Customer', 'api-token', 'permission', 'api-token-permission', 'transfer-token', 'transfer-token-permission'].includes(contentType.apiID)
  );

  return (
    <div className="model-page">
      <h1 className="model-title">Data Model</h1>
      <div className="model-container">
        {filteredContentTypes.map((contentType, index) => (
          <div key={index} className="entity-table">
            <table className={`entity entity-${contentType.schema.displayName.toLowerCase()}`}>
              <thead>
                <tr>
                  <th colSpan="1">{contentType.schema.displayName}</th>
                </tr>
              </thead>
              <tbody>
              {Object.entries(contentType.schema.attributes).map(([name, attribute]) => (
                    <tr key={name}>
                      <td>{name}        {attribute.type}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* Add a line break after each table */}
            {index < filteredContentTypes.length - 1 && <hr />}
          </div>
        ))}
      </div>
      {drawRelationshipLines()}
    </div>
  );
};

export default ContentTypeList;
